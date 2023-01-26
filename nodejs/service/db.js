const Pool = require('pg').Pool

const datapool = new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'maindb',
    password: '1234',
    port: 5432,
});

exports.db = datapool;


