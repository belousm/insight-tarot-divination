// @link https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql

const Sequilize = require('sequelize')

const APP_DB_DSN = process.env.APP_DB_DSN || false;
if (!APP_DB_DSN) {
    console.error('APP_DB_DSN is empty');
    process.exit(1);
}

module.exports = new Sequilize(APP_DB_DSN);