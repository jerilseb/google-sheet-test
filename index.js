import regeneratorRuntime from 'regenerator-runtime';
import puppeteer from 'puppeteer';
import fs from 'fs';
import gapi from '../lib/gapi';


// Load client secrets from a local file.
fs.readFile('client_secret.json', (err, content) => {
  if (err) {
    console.log(`Error loading client secret file: ${err}`);
    return;
  }

  const sheetId = '1xSs2wdYCVAMbUTO2OjM5l24a0hs9uejpguWo-tYVFpU';
  const ranges = 'Github!A1:B2';
  const jsonData = JSON.parse(content);

  gapi(jsonData, sheetId, ranges, (error, response) => {
    if (error) {
      console.log(`The API returned an error: ${error}`);
      return;
    }
    const rows = response.values;
    if (rows.length === 0) {
      console.log('No data found.');
    } else {
      for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];
        // Print columns A and E, which correspond to indices 0 and 4.
        console.log('%s, %s', row[0], row[1]);
      }
    }
  });
});

