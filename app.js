const express = require('express');
const app = express();
var mysql = require('mysql2');
app.use(express.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projetosinduscon'
});
connection.connect(function (err) {
    if (err) {
        console.error('Erro ao conectar: ' + err.stack);
        return;
    }
    console.log('Conectado como id ' + connection.threadId);
});

app.post('/livros', (req, res) => {
    const livro = req.body;
    const sql = 'INSERT INTO gestao_tarefas SET ?';
    connection.query(sql, livro, (error, result) => {
        if (error) throw error;
        res.status(201).json({ id: result.insertId, ...livro });
    });
});

app.get('/livros', (req, res) => {
    const sql = 'SELECT * FROM gestao_tarefas';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
app.get('/livros/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM gestao_tarefas WHERE id = ?';
    connection.query(sql, id, (error, results) => {
        if (error) throw error;
        res.json(results[0]);
    });
});

app.put('/livros/:id', (req, res) => {
    const id = req.params.id;
    const newBook = req.body;
    const sql = 'UPDATE gestao_tarefas SET ? WHERE id = ?';
    connection.query(sql, [newBook, id], (error) => {
        if (error) throw error;
        res.status(204).end();
    });
});

app.delete('/livros/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM gestao_tarefas WHERE id = ?';
    connection.query(sql, id, (error) => {
        if (error) throw error;
        res.status(204).end();
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na port ${port}`);
});
