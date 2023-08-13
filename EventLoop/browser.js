// 浏览器主进程
process.on('message', function ({ data }) {
  setTimeout(() => {
      process.send({ data });
  }, 100);
});


