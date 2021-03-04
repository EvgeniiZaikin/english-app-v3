import mysql, { Connection } from 'mysql2';
import { printLog } from '../utils/functions';

const connection: Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'UndeadKarsak26071993',
  database: 'english-app',
});

connection
  ? printLog(`Create connection with database successfully init`)
  : printLog(`Error with create connection to database:`);

export default connection;
