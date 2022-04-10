const five = require("johnny-five");
const warAlert = require('./controllers/warAlert');

const board = new five.Board();

board.on('ready', () => {
  console.info('Arduino is started!');
  warAlert.warAlertArduinoLed();
});
