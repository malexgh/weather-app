const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../template/views'));
hbs.registerPartials(path.join(__dirname, '../template/partials'));
app.use(express.static(path.join(__dirname, '../public')));
app.get('', (req, res) => { res.render('index', { title: 'Weather', name: 'Marcio' }) });
app.get('/help', (req, res) => { res.render('help', { title: 'Help', name: 'Marcio', message: 'Helping...' }) });
app.get('/about', (req, res) => { res.render('about', { title: 'About', name: 'Marcio' }) });
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must provide an address' });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, { summary, temperature, precipProbability, dayhigh, daylow } = {}) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: `${summary} It is currently ${temperature} degrees out. The high temperature for today is ${dayhigh} with a low of ${daylow}. There is a ${precipProbability}% chance of rain.`,
                location
            });
        });
    });
});
app.get('/help/*', (req, res) => { res.render('404', { title: 'Help', name: 'Marcio', message: 'Help topic not found' }) });
app.get('*', (req, res) => { res.render('404', { title: '404', name: 'Marcio', message: 'Page not found' }) });
app.listen(port, () => { console.log('Server running on port ' + port); });
