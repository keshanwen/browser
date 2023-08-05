const http = require('http');
const htmlparser2 = require('htmlparser2');
const css = require('css')
const main = require('./main.js');
const network = require('./network.js');
const render = require('./render.js');
const host = 'localhost';
const port = 80;

Array.prototype.top = function () {
   return this[this.length - 1];
}

/** 浏览器主进程 **/
main.on('request', function (options) {
    //2.主进程把该URL转发给网络进程
    network.emit('request', options);
})
//开始准备渲染页面
main.on('prepareRender', function (response) {
    //5.主进程发送提交导航消息到渲染进程
    render.emit('commitNavigation', response);
})
main.on('confirmNavigation', function () {
    console.log('confirmNavigation');
})
main.on('DOMContentLoaded', function () {
    console.log('DOMContentLoaded');
})
main.on('Load', function () {
    console.log('Load');
})

/** 网络进程 **/
network.on('request', function (options) {
    //3.在网络进程中发起URL请求
    let request = http.request(options, (response) => {
        //4.网络进程接收到响应头数据并转发给主进程
        main.emit('prepareRender', response);
    });
    //结束请求体
    request.end();
})

/** 渲染进程 **/
//6.渲染进程开始从网络进程接收HTML数据
render.on('commitNavigation', function (response) {
    const headers = response.headers
    const contentType = headers['content-type']
    if (contentType.indexOf('text/html') !== -1) {
        // 渲染进程把HTML转变为DOM树形结构
        const document = {
            type: 'document',
            attributes: {},
            children: []
        }
        const cssRules = []
        const tokenStack = [document]
        const parser = new htmlparser2.Parser({
            onopentag(name, attributes = {}) {
                const parent = tokenStack.top();
                const element = {
                    type: 'element',
                    tagName: name,
                    children: [],
                    attributes,
                    parent
                }
                parent.children.push(element)
                tokenStack.push(element)
            },
            ontext(text) {
                if (!/^[\r\n\s]*$/.test(text)) {
                    const parent = tokenStack.top()
                    const textNode = {
                        type: 'text',
                        children: [],
                        attributes: {},
                        parent,
                        text
                    }
                    parent.children.push(textNode)
                }
            },
            /* 
                在预解析阶段，HTML 发现css和js文件会并行下载，等全部
                下载后先把css 生产cssom,然后在执行 JS 脚本.
                然后在构建DOM树，重新计算样式，构建布局树，绘制页面
            
            */
            onclosetag(tagName) {
                switch(tagName) {
                    case 'style':
                        const styleToken = tokenStack.top()
                        const cssAST = css.parse(styleToken.children[0].text)
                        cssRules.push(...cssAST.stylesheet.rules)
                        break;
                    default:
                        break;    
                }
                tokenStack.pop()
            }
        })
        
        //开始接收响应体
        const buffers = [];
        response.on('data', (buffer) => {
            // 8, 渲染进程开始HMLT解析和加载子资源
            // 网络进程加载了多少数据，HTML 解析器便解析多少数据
            parser.write(buffer.toString())
        })
        response.on('end', () => {
            //7.HTML接收接受完毕后通知主进程确认导航
            main.emit('confirmNavigation');
            // 通过 stylesheet 计算出DOM 节点的样式
            recalculateStyle(cssRules, document)
            // 根据DOM 树创建布局树，就是复制DOM结构并过滤掉不显示的元素
            const html = document.children[0]
            const body = html.children[1]
            const layoutTree = createLayout(body)
            // 计算各个元素的布局信息
            updateLayoutTree(layoutTree)
            // 根据布局树生成分层树
            const layers = [layoutTree];
            createLayerTree(layoutTree, layers);
            // console.dir(layers,{
            //     depth: null
            // });
            // 根据分层树进行生成绘制步骤并复合图层
            const paintSteps = compositeLayers(layers)
            console.log(paintSteps.flat().join('\r\n'));
            //触发DOMContentLoaded事件
            main.emit('DOMContentLoaded');
            //9.HTML解析完毕和加载子资源页面加载完成后会通知主进程页面加载完成
            main.emit('Load');
        })
    }

})
function recalculateStyle(cssRules, element, parentComputedStyle = {}) {
       const attributes = element.attributes;
        element.computedStyle = {color:parentComputedStyle.color}; // 计算样式
        Object.entries(attributes).forEach(([key, value]) => {
            //stylesheets
            cssRules.forEach(rule => {
                let selector = rule.selectors[0].replace(/\s+/g, '');
                if ((selector == '#' + value && key == 'id') || (selector == '.' + value && key == 'class')) {
                    rule.declarations.forEach(({ property, value }) => {
                        element.computedStyle[property] = value;
                    })
                }
            })
            //行内样式
            if (key === 'style') {
                const attributes = value.split(';');
                attributes.forEach((attribute) => {
                    const [property, value] = attribute.split(/:\s*/);
                    element.computedStyle[property] = value;
                });
            }
        });
    element.children.forEach(child => recalculateStyle(cssRules, child,element.computedStyle));
}   

function createLayout(element) {
    element.children = element.children.filter(isShow)
    element.children.forEach( child => createLayout(child) )
    return element
}

function isShow(element) {
    let isShow = true
    if (element.tagName === 'head' || element.tagName === 'script') {
        isShow = false
    }
    const attributes = element.attributes
    Object.entries(attributes).forEach( ([key, value]) => {
        if (key === 'style') {
            const attributes = value.split(';')
            attributes.forEach( (attribute) => {
                const [property, value] = attribute.split(/:\s*/)
                if (property === 'display' && value === 'none') {
                    isShow = false           
                }
            })
        }
    })
    return isShow
}

function updateLayoutTree(element, top = 0, parentTop = 0) {
    const computedStyle = element.computedStyle
    element.layout = {
        top: top + parentTop,
        left: 0,
        width: computedStyle.width,
        height: computedStyle.height,
        background: computedStyle.background,
        color: computedStyle.color
    }
    let childTop = 0;
    element.children.forEach( child => {
        updateLayoutTree(child, childTop, element.layout.top)
        childTop += parseInt(child.computedStyle.height || 0)
    })
}

function createLayerTree(element, layers) {
    element.children = element.children.filter( (child) => {
        return createNewLayer(child, layers)
    })
    element.children.forEach( child => createLayerTree(child,layers))
    return layers
}

function createNewLayer(element, layers) {
    let created = true
    const attributes = element.attributes
    Object.entries(attributes).forEach( ([key, value]) => {
        if (key === 'style') {
            const attributes = value.split(';')
            attributes.forEach( (attribute) => {
                const [property, value] = attribute.split(/:\s*/)
                if (property === 'position' && value === 'absolute') {
                    updateLayoutTree(element) // 对单独的层重新计算位置
                    layers.push(element)
                    created = false
                }
            })
        }
    })
    return created
}

function compositeLayers(layers) {
    // 合成线程会把分好的图块发给栅格化线程池，栅格化线程会把图片（title）转化为位图
    return layers.map( layout => paint(layout) )
}

function paint(element, paintSteps = []) {
    const { background = 'black', color = 'black', top = 0, left = 0, width = 100, height = 0 } = element.layout;
    if (element.type === 'text') {
        paintSteps.push(`ctx.font = '20px Impact;'`);
        paintSteps.push(`ctx.strokeStyle = '${color}';`);
        paintSteps.push(`ctx.strokeText("${element.text.replace(/(^\s+|\s+$)/g, '')}", ${left},${top + 20});`);
    } else {
        paintSteps.push(`ctx.fillStyle="${background}";`);
    paintSteps.push(`ctx.fillRect(${left},${top}, ${parseInt(width)}, ${parseInt(height)});`);
    }
    element.children.forEach(child => paint(child, paintSteps));
    return paintSteps;
    }
    
//1.主进程接收用户输入的URL
main.emit('request', { host, port, path: '/index.html' });
