
const fs = require('fs');

const user1 = {
    id: 1,
    firstName: "Ivan",
    secondName: "Petrov",
    age: 41,
    city: "Moscow"
}

//const data = JSON.stringify(user1);

//fs.appendFileSync('./data_users.json', data)

//console.log(data);

///////////////////////////////////////////////////


user_list = []

const readUsers = function() {
    
    const allUsersRead = fs.readFileSync('./data_users.json');
    allUsers = JSON.parse(allUsersRead);
    return allUsers;
}

user_list = readUsers();

Object.values(user_list).forEach(user => {
    console.log(`объект: `, user);
});
