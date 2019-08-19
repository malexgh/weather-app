var request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/624dd808337e8e42225e32302da91c0a/${latitude},${longitude}?lang=en`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find weather data', undefined);
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                summary: body.daily.data[0].summary,
                dayhigh: body.daily.data[0].temperatureHigh,
                daylow: body.daily.data[0].temperatureLow,
            });
        }
    });
};

module.exports = forecast;
