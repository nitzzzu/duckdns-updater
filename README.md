# duckdns-updater

Simple DuckDns.org updater windows service.

To install it:

- Run `git clone https://github.com/nitzzzu/duckdns-updater.git`
- Run 'npm install`
- Create configuration file `config.js`:

`
module.exports = {
    DUCKDNSDOMAIN: '',
    DUCKDNSTOKEN: ''
};
`

- Run `node app install` or `install-service.bat`
- Enjoy!