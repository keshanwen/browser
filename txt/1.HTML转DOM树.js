/* 
    HTML 转DOM 树
    浏览器中的HTML 解析器可以把HTML字符串转换成DOM 结构
    HTML解析器边接收网络数据边解析HTML
    解析DOM
        HTML 字符串转Token
        Token 栈用来维护节点之间的父子关系，Token 栈会依次压入栈中
        如果是开始标签，把Token 压入栈中并且创建新的DOM节点并添加到父节点的children 中
        如果是文本Token ，则把文本节点添加到栈顶元素的children 中，文本Token 不需要入栈
        如果是结束标签，此开始标签出栈
*/

const dom = {
    type: 'document',
    attributes: {},
    children: [
      {
        type: 'element',
        tagName: 'body',
        children: [
         {
            type: 'element',
            tagName: 'div',
            children: [
              {
                type: 'text',
                children: [],
                attributes: {},
                text: 'hello'
              }
            ],
            attributes: {},
          },
          {
            type: 'element',
            tagName: 'div',
            children: [
              {
                type: 'text',
                children: [],
                attributes: {},
                text: 'world'
              }
            ],
            attributes: {},
          }
        ],
        attributes: {},
      }
    ]
  }