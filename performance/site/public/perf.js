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
        FCP: 0
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
});


