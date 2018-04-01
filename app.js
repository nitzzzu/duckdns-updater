const Service = require('node-windows').Service;
const schedule = require('node-schedule');
const rp = require('request-promise-native');
const logger = require('./logger.js');
const config = require('./config');

let svc = new Service({
    name: 'DuckDnsUpdater',
    description: 'Duck Dns Updater',
    script: require('path').join(__dirname, 'app.js'),
    maxRetries: 3
});

svc.on('install', function() {
    console.log('Install complete. Starting...');
    svc.start();
    console.log('Service started');
});

svc.on('uninstall', function() {
    console.log('Uninstall complete.');
    console.log('The service exists: ', svc.exists);
});

const args = process.argv.slice(2);
if (args[0] == 'install') {
    svc.install();
    return;
}

if (args[0] == 'uninstall') {
    svc.uninstall();
    return;
}

(async () => {
    logger.info('duckdns updater started');

    let url = `https://www.duckdns.org/update?domains=${config.DUCKDNSDOMAIN}&token=${config.DUCKDNSTOKEN}&ip=`;

    let job = schedule.scheduleJob('*/30 * * * *', async function() {
        let response = await rp(url);
        logger.info('duckdns refresh');
    });
})();
