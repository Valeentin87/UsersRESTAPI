// реализация API для управления пользователями


// Результат - массив пользователей

// user = {
//     firstName: "Ivan",
//     secondName: "Petrov",
//     age: 30,
//     city: "Moscow"
// }

const express = require('express');

const app = express();


const users = [];
let uniqueID = 0;  // уникальный номер пользователя

// 1. Роут получения всех пользователей Название роута GET/users
app.get('/users', function(req, res) {
    console.log('получен запрос на получение всех пользователей');
    res.send({users});
});

// 2. Роут создания позьзователя

app.use(express.json());

app.post('/users', (req, res) => {
    uniqueID += 1;
    users.push( {
        id: uniqueID,
        ...req.body
    });
    console.log('получен запрос на создание нового пользователя', req.body);
    
    res.send({
        id: uniqueID,
        ...req.body
    });
});

//3. Роут получения данных о пользователе

app.get('/users/:id', (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        console.log("Пользователь найден!!!");
        res.send({ user });
    }
    else {
        console.log("Пользователь не найден!!!");
        res.status(404);
        res.send({ user: null });
    }
});

//4. Роут обновления данных о пользователе

//app.use(express.json);

app.put('/users/:id', (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        console.log(user);
        console.log(user.firstName);
        user.firstName = req.body.firstName;
        console.log(user.secondName);
        user.secondName = req.body.secondName;
        user.age = req.body.age;
        user.city = req.body.city;
        
        console.log("Данные пользователя изменены ");
        res.send({ user });
    }
    else {
        console.log('Произошла ошибка! ');
        res.status(404);
        res.send({user:null});
    }
});

app.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});


