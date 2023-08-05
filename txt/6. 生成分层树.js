/* 
    格局布局树生成分层树
    渲染引擎需要为某些节点生成单独的图层，并组合成图层树
    z-index
    绝对定位和固定定位
    滤镜
    透明
    剪裁
    这些图层合成最终的页面
*/

const layersTree = [
    {
      type: 'element',
      tagName: 'body',
      children: [ [Object], [Object] ],
      attributes: {},
      parent: {
        type: 'element',
        tagName: 'html',
        children: [Array],
        attributes: [Object],
        parent: [Object],
        computedStyle: [Object]
      },
      computedStyle: { color: undefined },
      layout: {
        top: 0,
        left: 0,
        width: undefined,
        height: undefined,
        background: undefined,
        color: undefined
      }
    },
    {
      type: 'element',
      tagName: 'div',
      children: [ [Object] ],
      attributes: { id: 'absolute', style: 'position:absolute' },
      parent: {
        type: 'element',
        tagName: 'body',
        children: [Array],
        attributes: {},
        parent: [Object],
        computedStyle: [Object],
        layout: [Object]
      },
      computedStyle: {
        color: undefined,
        background: 'pink',
        width: '50px',
        height: '50px',
        left: '0px',
        top: '0px',
        position: 'absolute'
      },
      layout: {
        top: 0,
        left: 0,
        width: '50px',
        height: '50px',
        background: 'pink',
        color: undefined
      }
    }
  ]