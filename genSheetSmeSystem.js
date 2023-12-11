const { accessSpreadSheet } = require('.');
const viLang = require('./sme-system/language/vi.json');
const enLang = require('./sme-system/language/en.json');

(async function () {
    await accessSpreadSheet({ 
        service: 'sme_system', 
        viLang,
        enLang
    });
}());