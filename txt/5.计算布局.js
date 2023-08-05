/* 
    计算各个元素的布局
*/
const layout =  {
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
            computedStyle: { color: 'red' },
            layout: {
              top: 0,
              left: 0,
              width: undefined,
              height: undefined,
              background: undefined,
              color: 'red'
            }
          }
        ],
        attributes: { id: 'hello' },
        computedStyle: { color: 'red', width: '200px', height: '200px' },
        layout: {
          top: 0,
          left: 0,
          width: '200px',
          height: '200px',
          background: undefined,
          color: 'red'
        }
      }
    ],
    attributes: {},
    computedStyle: { color: undefined },
    layout: {
      top: 0,
      left: 0,
      width: undefined,
      height: undefined,
      background: undefined,
      color: undefined
    }
  }