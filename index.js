const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const creds = require('./client-secret.json');

const SERVICE_INDEX_SHEET = {
    "sme": 0,
    "sme_system": 1,
    "connector": 2,
}

async function accessSpreadSheet({ service, viLang, enLang }) {    
    const serviceAccountAuth = new JWT({
        email: creds.client_email,
        key: creds.private_key,
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive.file',
        ],
    });
    const doc = new GoogleSpreadsheet('16uP0jIHMK3U8bUTxjRvV3M0_8KcQAu8yMBECj3AcovU', serviceAccountAuth);

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[SERVICE_INDEX_SHEET[service]];    

    console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`);    

    const [viJson, enJson] = [viLang, enLang];

    const rowsAddSheet = Object.keys(viJson).reduce(
        (result, value) => {
            const newRow = {
                Key: value,
                Vi: viJson[value],
                En: enJson[value] || ""
            };

            result = result.concat([newRow]);
            return result;
        }, []
    );

    const rowsSheet = await sheet.getRows();
    const rowsParseSheet = rowsSheet.map(_sheet => {
        const [Key, Vi, En] = [_sheet.get(`Key`), _sheet.get('Vi'), _sheet.get('En')];

        return { Key, Vi, En }
    });

    const rowsPassAdd = rowsAddSheet.filter(_sheet => !rowsParseSheet.some(_ps => _ps?.Key == _sheet?.Key));

    await sheet.addRows(rowsPassAdd);
}

module.exports = { accessSpreadSheet };