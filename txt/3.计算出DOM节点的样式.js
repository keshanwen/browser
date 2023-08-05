/* 
    根据 css 的继承和层叠规则计算DOM节点的样式
    DOM 节点的样式保存在了 computedStyle 中

*/

const style =  {
    type: 'document',
    attributes: { },
    children: [
        {
            type: 'element',
            tagName: 'html',
            children: [
                {
                    type: 'element',
                    tagName: 'head',
                    children: [
                        {
                            type: 'element', tagName: 'style',
                            children: [
                                {
                                    type: 'text',
                                    children: [],
                                    attributes:
                                        {},
                                    parent: [Circular * 1],
                                    text: '\r\n' +
                                        '        #hello {\r\n' +
                                        '
     color: red; \r\n' +
                      '        }\r\n' +
                                        '        .world {\r\n' +
                                        '
     color: green; \r\n' +       
                      '        }    ',
                                    computedStyle: { color: undefined }
                                }
                            ],
                            attributes: {},
                            parent: [Circular * 2],
                            computedStyle: { color: undefined }
                        }
                    ],
                    attributes: {},
                    parent: [Circular * 3],
                    computedStyle: { color: undefined }
                },
                {
                    type: 'element',
                    tagName: 'body',
                    children: [
                        {
                            type: 'element', tagName: 'div',
                            children: [
                                {
                                    type: 'text',
                                    children: [],
                                    attributes:
                                        {},
                                    parent: [Circular * 4],
                                    text: 'hello',
                                    computedStyle: { color: 'red' }
                                }
                            ],
                            attributes: { id: 'hello' },
                            computedStyle: { color: 'red' }
                        },
                        {
                            type: 'element', tagName: 'div',
                            children: [
                                {
                                    type: 'text',
                                    children: [],
                                    attributes:
                                        {},
                                    parent: [Circular * 6],
                                    text: 'world',
                                    computedStyle: { color: 'green' }
                                }
                            ],
                            attributes: { class: 'world' },

                            computedStyle: { color: 'green' }
                        }
                    ],
                    attributes: {},

                    computedStyle: { color: undefined }
                }
            ],
            attributes: {},
            computedStyle: { color: undefined }
        }
    ],
    computedStyle: { color: undefined }
}