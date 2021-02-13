import moment from "moment";
const { GoogleSpreadsheet } = require('google-spreadsheet');

const PRIVATE_KEY = 'YOUR-PRIVATE-KEY'
const CLIENT_EMAIL = 'YOUR-SERVICE-EMAIL-ACCOUNT'
const SHEET_ID = 'YOUR-SPEADSHEED-ID';

let getHomepage = async (req, res) => {
    return res.render("homepage.ejs");
};

let getGoogleSheet = async (req, res) => {
    try {

        let currentDate = new Date();

        const format = "HH:mm DD/MM/YYYY"

        let formatedDate = moment(currentDate).format(format);

        // Initialize the sheet - doc ID is the long id in the sheets URL
        const doc = new GoogleSpreadsheet(SHEET_ID);

        // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
        await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY,
        });

        await doc.loadInfo(); // loads document properties and worksheets

        const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

        // append rows
        await sheet.addRow(
            {
                "Tên Facebook": 'Hỏi Dân IT',
                "Email": 'haryphamdev@gmail.com',
                "Số điện thoại": `'0321456789`,
                "Thời gian": formatedDate,
                "Tên khách hàng": "Eric"
            });


        return res.send('Writing data to Google Sheet succeeds!')
    }
    catch (e) {
        return res.send('Oops! Something wrongs, check logs console for detail ... ')
    }
}

module.exports = {
    getHomepage: getHomepage,
    getGoogleSheet: getGoogleSheet
};
