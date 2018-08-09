const cron = require('node-cron');
const { courseUpdater, getApiData } = require("./courseUpdater");

// Update database once everytime the server starts.
getApiData().then((courses) => {
    courseUpdater(courses);
});

const updateInterval = () => {
    return cron.schedule('0 0 0 * * *', () => {
        getApiData().then((courses) => {
            courseUpdater(courses);
        });
    });
};

module.exports = {
    updateInterval
}