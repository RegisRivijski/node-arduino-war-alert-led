const five = require('johnny-five');
const warAlertHelper = require('../helpers/warAlert')

const {
  ALERT_STATE,
  ALERT_LED_PIN,
  SAFE_LED_PIN,
} = require('../constants/index');

module.exports = {
  warAlertArduinoLed() {
    const alertLed = new five.Led(ALERT_LED_PIN);
    const safeLed = new five.Led(SAFE_LED_PIN);

    setInterval(async () => {
      const statesNew = await warAlertHelper.getActiveAlertsVC()
        .catch((e) => {
          console.error('warAlertHelper getActiveAlertVC error:', e.message);
          return [];
        });

      let newAlert = false;
      for (const state of statesNew) {
        if (state.state === ALERT_STATE) {
          newAlert = true;
          break;
        }
      }
      if (newAlert) {
        alertLed.on();
        safeLed.off();
      } else {
        alertLed.off();
        safeLed.on();
      }

    }, 30000);
  },
};
