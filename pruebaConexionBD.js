/*

Archivo para probar conexion!


const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'afrodita_shop',
  port: 3306,
});

connection.connect((err) => {
  connection.query('select * from products', (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log(result);
  });
  connection.end();
});

*/
