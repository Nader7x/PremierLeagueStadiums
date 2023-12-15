const cron = require('node-cron');
const axios = require('axios');
const {toString} = require("express");
const moment = require('moment-timezone');


async function start() {

    const url = "http://localhost:3000/"
    cron.schedule('*/30 * * * * * ', async () => {
        const nDate = new Date().toLocaleString('en-US', { timeZone: 'Europe/Athens' });
        // Split the formatted date string into separate variables
        const [date, time] = nDate.split(' ');

        const [month, day, year] = date.split('/');
        const [hours, minutes, seconds] = time.split(':');

       const response = await axios.get(url +"matchesHistory");

         for (const match of (response.data)) {
             const matchDate = moment(match['date']).tz('Europe/Athens');

             const matchYear = matchDate.year();
             const matchMonth = matchDate.month() + 1; // Months are zero-based
             const matchDay = matchDate.date();
             const matchHours = matchDate.hour()-2;
             const matchMinutes = matchDate.minute();

             if (
                 String(matchYear) === year.substring(0,(year.length)-1)
                 &&
                  String(matchMonth) === String(month)
                 &&
                 String(matchDay) === String(day)
                 &&
                 String(matchHours) === String(hours)
                 &&
                 String(matchMinutes) == String(minutes)
             ) {
                 await axios.get(url + "matchStart/" + String(match['_id']));
             }
         }

}
    )
}
module.exports = { start };
