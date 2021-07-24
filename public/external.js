function sendAnalyticsData(elapsedTime, analyticsData, url = "/log") {
  const data = {
    elapsedTime,
    ...analyticsData,
  };
  console.log(`sending data to ${url}:`, data);
  var blob = new Blob([JSON.stringify(data)], {
    type: "application/json; charset=UTF-8",
  });
  navigator.sendBeacon(url, blob);
}
