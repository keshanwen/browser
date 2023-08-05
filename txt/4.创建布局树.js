/* 
    创建一颗只包含可见元素的布局树
*/

const layoutTree = {
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
            text: 'hello',
            computedStyle: { color: 'red' }
          }
        ],
        attributes: { id: 'hello' },
        computedStyle: { color: 'red' }
      }
    ],
    attributes: {},
    computedStyle: { color: undefined }
  }