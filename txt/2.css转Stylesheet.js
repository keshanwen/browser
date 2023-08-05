/* 
    渲染进程把 css 文本转为浏览器中的 stylesheet
    css 来源可能有link标签， style 标签和 style 行内样式
    渲染引擎会把css 转换为 document.styleSheets
*/

const cssRules = [
    {
      type: 'rule',
      selectors: [ 'div' ],
      declarations: [
        {
          type: 'declaration',
          property: 'color',
          value: 'red',
          position: {
            start: { line: 3, column: 13 },
            end: { line: 3, column: 23 },
            source: undefined
          }
        }
      ],
      position: {
        start: { line: 2, column: 9 },
        end: { line: 4, column: 10 },
        source: undefined
      }
    }
  ]