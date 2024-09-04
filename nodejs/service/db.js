const Pool = require('pg').Pool

// const datapool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'scoredb',
//     password: 'Eec-MIS2564db',
//     port: 5432,
// });

const datapool = new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'scoredb',
    password: '1234',
    port: 5432,
});

exports.db = datapool;


