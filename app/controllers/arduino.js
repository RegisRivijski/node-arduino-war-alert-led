const five = require('johnny-five');
const warAlertHelper = require('../helpers/warAlert')

const {
  ALERT_STATE,
  ALERT_PIN,
} = require('../constants/index');


module.exports = {
  warAlertArduinoLed() {
    const board = new five.Board();

    board.on('ready', () => {
      const alertLed = new five.Led(ALERT_PIN);

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
          }
        }
        if (newAlert) {
          alertLed.on();
          console.log('alertLed on');
        } else {
          alertLed.off();
          console.log('alertLed off');
        }
      }, 30000);
    });
  },
};
