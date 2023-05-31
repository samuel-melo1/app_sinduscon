var mysql = require('mysql2');
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : 'root',
database : 'projetosinduscon'
});
connection.connect(function(err) {
if (err) {
console.error('Erro ao conectar: ' + err.stack);
return;
}
console.log('Conectado como id ' + connection.threadId);
});