import cron from 'node-cron';
import axios from "axios";
import moment from "moment-timezone";

const token = "YOUR_TOKEN_HERE"; // Replace with actual token

export default async function start() {
    const url = "http://localhost:3000/";

    cron.schedule('*/19 * * * * *', async () => {
        console.log('Running a task every 19 seconds');

        // Get the current time in UTC
        const now = moment().utc();
        // console.log("Current Time:", now.format());

        // Fetch upcoming matches
        const upcomingMatchesResponse = await axios.get(url + "upcomingMatches");
        const upcomingMatches = upcomingMatchesResponse.data;

        for (const match of upcomingMatches) {
            const matchTime = moment(match['date']).utc(); // Convert match time to UTC
            // console.log("Match Time:", matchTime.format());

            if (
                matchTime.year() === now.year() &&
                matchTime.month() === now.month() && // Months are zero-based
                matchTime.date() === now.date() &&
                matchTime.hour() === now.hour() &&
                matchTime.minute() === now.minute()
            ) {
                await axios.get(url + "matchStart/" + String(match['_id']));
                console.log("Match started:", match['_id']);
            }
        }

        // Fetch live matches
        const liveMatchesResponse = await axios.get(url + "matchesLive");
        const liveMatches = liveMatchesResponse.data;

        for (const match of liveMatches) {
            const matchTime = moment(match['date']).utc(); // Convert match time to UTC

            if (
                matchTime.year() === now.year() &&
                matchTime.month() === now.month() &&
                matchTime.date() === now.date() &&
                matchTime.hour() === now.hour() &&
                matchTime.minute() <= now.minute() - 10 // End match after 5 minutes
            ) {
                await axios.get(url + "endMatch/" + String(match['_id']));
                console.log("Match ended:", match['_id']);
            }
        }
    });
}
