const fs = require('fs');

let chats = {};
let toxics = {};

try {
    const bdStr = fs.readFileSync('./db/chats.txt');
    chats = JSON.parse(bdStr);
} catch (error) {
    console.log(error);
}

const getRandom = array => {
    const length = array.length;
    return array[Math.floor(Math.random() * length)];
};

const getDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const addToxic = (chat, user) => {
    if (chats[chat.id] && chats[chat.id][user.id]) {
        return;
    }

    if (!chats[chat.id]) {
        chats[chat.id] = {};
    }

    chats[chat.id][user.id] = user;

    const chatsStr = JSON.stringify(chats);
    console.log(chatsStr);
    fs.writeFileSync('./db/chats.txt', chatsStr);
};

const searchToxic = chat => {
    if (toxics && toxics[chat.id] && toxics[chat.id][getDate()]) {
        return toxics[chat.id][getDate()];
    }


    const users = chats[chat.id];
    const userId = getRandom(Object.keys(users));
    const { username } =  users[userId];

    if (toxics) {
        toxics[chat.id] = {};
        toxics[chat.id][getDate()] = 'alexander_sora';
    }
    
    return username;
};

module.exports = {
    addToxic,
    searchToxic,
};
