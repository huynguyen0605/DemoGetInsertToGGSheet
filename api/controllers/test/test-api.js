var ExecFunction = require('../../services/exec-function-with-authorize');
const fs = require('fs');
const { google } = require('googleapis');

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function testApi(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: '1axTboxK9wMireaIG2o1kqDkRd53TrialJxCf8emPrkI',
        range: 'TestRead!A1:E',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        console.log('huynvq::result==>', rows);
        if (rows.length) {
        } else {
            console.log('No data found.');
        }
    });

    let values = [['test value updated'], ['test value for A6']]
    const resource = values;
    sheets.spreadsheets.values.update({
        spreadsheetId: '1axTboxK9wMireaIG2o1kqDkRd53TrialJxCf8emPrkI',
        range: 'TestRead!A5:A6',
        resource: { values },
        valueInputOption: "USER_ENTERED",
    }, (err, res) => {
        if (err) return console.log('huynvq::==============>UpdateError::' + err)
        console.log('huynvq:===========>InsertRes::', res.data);
    })
}

module.exports = {
    inputs: {

    },
    exits: require('../../utils/ExitSignalsUtils').exitsignals,

    fn: function (inputs, exits) {
        // Load client secrets from a local file.
        fs.readFile('credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Sheets API.
            ExecFunction.authorize(JSON.parse(content), testApi)
        });
    }
}