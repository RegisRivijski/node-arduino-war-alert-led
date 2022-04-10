const packege = require('../package.json');
module.exports = {
  application: {
    name: packege.name,
    version: packege.version,
  },
  rest: {
    ukrzen: {
      protocol: 'https:',
      host: 'war.ukrzen.in.ua',
    },
    vadimklimenko: {
      protocol: 'https:',
      host: 'vadimklimenko.com',
    },
  },
};
