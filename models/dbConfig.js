const {Pool} = require("pg");

const db = new Pool({
    user : 'postgres',
    password : 'kennyantonio',
    host : '127.0.0.1',
    port : 5432,
    database : 'ticket_place' 
});

module.exports = db;