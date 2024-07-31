// реализация API для управления пользователями
// 1. Роут получения всех пользователей Название роута GET/users

// Результат - массив пользователей

const express = require('express');

const app = express();

const users = [];

app.get('/users', function(req, res) {
    console.log('получен запрос на получение всех пользователей');
    res.send({users});
});

app.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});