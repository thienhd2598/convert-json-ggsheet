const { accessSpreadSheet } = require('.');
const viLang = require('./sme/language/vi.json');
const enLang = require('./sme/language/en.json');

(async function () {
    await accessSpreadSheet({ 
        service: 'sme', 
        viLang,
        enLang
    });
}());