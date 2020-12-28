import mysql from 'mysql2';
import { Connection } from 'mysql2';

let connection: Connection;

connection = mysql.createConnection({
    'host': 'localhost',
    'user': 'root',
    'password' : 'UndeadKarsak26071993',
    'database': 'english-app',
});

connection ? 
    console.log(`Create connection with database successfully init`) :
    console.log(`Error with create connection to database:`);

export default connection;