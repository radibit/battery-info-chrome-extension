function updateBatteryLevel(level, isCharging) {
  const batteryLevelText = level !== 1 ? (level * 100).toFixed() : '';
  const chargingStatus = isCharging ? 'charging' : 'not-charging';

  chrome.browserAction.setIcon({
    path: `./images/icon-${ chargingStatus }.png`
  });

  chrome.browserAction.setBadgeText({
    text: batteryLevelText
  });

  chrome.browserAction.setBadgeBackgroundColor({
    color: [94, 97, 106, 255]
  });
}

function getBatteryStatus() {
  navigator.getBattery().then(battery => {
    updateBatteryLevel(battery.level, battery.charging);
  });
}

chrome.alarms.create('batteryLevel', {
  when: Date.now() + 1000,
  periodInMinutes: 2
});
chrome.runtime.onInstalled.addListener(getBatteryStatus);
chrome.alarms.onAlarm.addListener(getBatteryStatus);
