// реализация API для управления пользователями


// Результат - массив пользователей

// user = {
//     firstName: "Ivan",
//     secondName: "Petrov",
//     age: 30,
//     city: "Moscow"
// }

const fs = require('fs');

const readUsers = function() {
    
    const allUsersRead = fs.readFileSync('./data_users.json', 'utf-8');
    allUsersJSON = JSON.parse(allUsersRead);
    //allUsersSTR = JSON.stringify(allUsersJSON);

    return allUsersJSON.users;
}

const getAllUniqId = function() {
    let allUniqId = []
    userList = readUsers();
    
        Object.values(userList).forEach(user => {
            console.log(user);
            user.forEach(element => {
                allUniqId.push(element.id);
                console.log(allUniqId);
            });
        });
            
    return allUniqId;
}

const express = require('express');

const app = express();

let newUsers = [];

let newDataUsers = {"users": null};
let newDataString = null;
let users = [];
let uniqueID = 0;  // уникальный номер пользователя
let allUniqId = [];

// 1. Роут получения всех пользователей Название роута GET/users
app.get('/users', function(req, res) {
    users = readUsers();
    console.log('получен запрос на получение всех пользователей');
    res.send({users});
});

// 2. Роут создания позьзователя

app.use(express.json());

app.post('/users', (req, res) => {

    users = readUsers();

    uniqueID += 1;
    users.push( {
        id: uniqueID,
        ...req.body
    });
    console.log('новый пользователь добавлен...', req.body);

    //console.log(users);
    newDataUsers.users = users;
    newDataString = JSON.stringify(newDataUsers);
    fs.writeFileSync('./data_users.json', newDataString);
    
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
        console.log(`Пользователь с идентификатором ${req.params.id} не найден!!!`);
        res.status(404);
        res.send({ user: null });
    }
});

//4. Роут обновления данных о пользователе

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
        console.log(`Пользователь с идентификатором ${req.params.id} не найден!!!`);
        res.status(404);
        res.send({user:null});
    }
});

app.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});

// 5. Роут удаления пользователя

app.delete('/users/:id', (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);

        res.send( {user});
    } else {
        res.status(404);
        res.send({ user: null});
    }
});
