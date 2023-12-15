const cron = require('node-cron');
const axios = require('axios');
const moment = require('moment-timezone');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTdjOGZiYWYyOTE4MTU3ZGM5NWNjYjAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI2Njk2NjYsImV4cCI6MzE3Mjc4NjY5NjY2fQ.EXPvjDuNXZAk4oZ123MEtmm9J6HMPQ9bVZoWLudRL8s"
async function start() {

    const url = "http://localhost:3000/"
    cron.schedule('*/29 * * * * * ', async () => {
        console.log('running a task every 29 seconds');
        const nDate = new Date().toLocaleString('en-US', {timeZone: 'Europe/Athens'});
        // Split the formatted date string into separate variables
        const [date, time] = nDate.split(' ');

        const [month, day, year] = date.split('/');
        const [hours, minutes, seconds] = time.split(':');

        const response = await axios.get(url + "matchesHistory", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        for (const match of (response.data)) {
            const matchTime = moment(match['date']).tz('Etc/GMT+0');

            const matchYear = matchTime.year();
            const matchMonth = matchTime.month() + 1; // Months are zero-based
            const matchDay = matchTime.date();
            const matchHours = matchTime.hour();
            const matchMinutes = matchTime.minute();

            if (
                String(matchYear) === year.substring(0, (year.length) - 1)
                &&
                String(matchMonth) === String(month)
                &&
                String(matchDay) === String(day)
                &&
                String(matchHours) === String(hours)
                &&
                String(matchMinutes) == String(minutes)
            ) {
                await axios.get(url + "matchStart/" + String(match['_id']), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("start match" + String(match['_id']));
            }

        }
        //endmatch ===========================================================================
        const liveResponse = await axios.get(url + "matchesLive", {
            headers: {
                Authorization: `Bearer ${token}`,
            },

        });

        for (const match of (liveResponse.data)) {
            const matchTime = moment(match['date']).tz('Etc/GMT+0');

            const matchYear = matchTime.year();
            const matchMonth = matchTime.month() + 1; // Months are zero-based
            const matchDay = matchTime.date();
            const matchHours = matchTime.hour();
            const matchMinutes = matchTime.minute();

            if (
                String(matchYear) === year.substring(0, (year.length) - 1)
                &&
                String(matchMonth) === String(month)
                &&
                String(matchDay) === String(day)
                &&
                String(matchHours) === String(hours)
                &&
                String(matchMinutes) <= String(minutes - 2)
            ) {
                await axios.get(url + "endMatch/" + String(match['_id']), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("end match" + String(match['_id']));
            }

        }

});
}

module.exports = { start };
