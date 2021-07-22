function sendAnalyticsData(elapsedTime, analyticsData) {
  navigator.sendBeacon("/log", {
    elapsedTime,
    ...analyticsData,
  });
}
