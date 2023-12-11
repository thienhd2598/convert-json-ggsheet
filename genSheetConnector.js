const { accessSpreadSheet } = require('.');
const viLang = require('./connector/language/vi.json');
const enLang = require('./connector/language/en.json');

(async function () {
    await accessSpreadSheet({ 
        service: 'connector', 
        viLang,
        enLang
    });
}());