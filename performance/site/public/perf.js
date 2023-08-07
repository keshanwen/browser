(function (ready) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        ready();
    } else {
        document.addEventListener("readystatechange", function () {
            if (document.readyState === "complete") {
                ready();
            }
        });
    }
})(function perf() {
    var data = {
        url: window.location.href,
        FP: 0,
        FCP: 0,
        LCP: 0,
        FID: 0,
        CLS: 0
    };
    new PerformanceObserver(function (entryList) {
        var entries = entryList.getEntries() || [];
        entries.forEach(function (entry) {
            if (entry.name === "first-paint") {
                data.FP = entry.startTime;
                console.log("记录FP: " + data.FP);
            } else if (entry.name === "first-contentful-paint") {
                data.FCP = entry.startTime;
                console.log("记录FCP: " + data.FCP);
            }
        });
    }).observe({ type: "paint", buffered: true });

    new PerformanceObserver(function (entryList) {
         var entries = entryList.getEntries() || [];
         entries.forEach(function (entry) {
             if (entry.startTime > data.LCP) {
                 console.log("记录LCP: " + (data.LCP = entry.startTime));
             }
         });
    }).observe({ type: "largest-contentful-paint", buffered: true });

    new PerformanceObserver((entryList) => {
       for (const entry of entryList.getEntries()) {
          const FID = entry.processingStart - entry.startTime;
           console.log('FID:', FID, entry);
       }
    }).observe({ type: 'first-input', buffered: true });

    new PerformanceObserver((entryList) => {
       var entries = entryList.getEntries() || [];
       entries.forEach(function (entry) {
           console.log('entry', entry);
           if (!entry.hadRecentInput) {
               data.CLS += entry.value;
               console.log("CLS: " + data.CLS);
           }
       });
   }).observe({ type: 'layout-shift', buffered: true });
});

