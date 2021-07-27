function sendAnalyticsData(elapsedTime, analyticsData, url = "/log") {
  const data = {
    elapsedTime,
    ...analyticsData,
  };
  if (!data.visitorId) {
    const fpPromise = FingerprintJS.load();

    // Get the visitor identifier when you need it.
    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        // This is the visitor identifier:
        data.visitorId = result.visitorId;
      });
  }
  console.log(`sending data to ${url}:`, data);
  var blob = new Blob([JSON.stringify(data)], {
    type: "application/json; charset=UTF-8",
  });
  navigator.sendBeacon(url, blob);
}
