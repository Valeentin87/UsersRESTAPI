
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


userList = []



const readUsers = function() {
    
    const allUsersRead = fs.readFileSync('./data_users.json');
    allUsers = JSON.parse(allUsersRead);
    return allUsers;
}




// получение уникального идентификатора пользователя


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

allId = getAllUniqId();
console.log(allId);


