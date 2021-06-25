const mongoose = require('mongoose');
const { storage: config } = require('../config');
const { usersSchema, chatsSchema } = require('./schemas');

// mongoose.set('bufferCommands', false);

class Storage {
    constructor() {
        this.connectStatus = false;
        this.models = {};
        
        mongoose.connect(config.url, {useNewUrlParser: true});
        this.db = mongoose.connection;
        
        this.db.on('error', error => {
            console.log(error);
            this.connectStatus = false;
        });

        this.db.on('open', () => {
            console.log('open');
            this.connectStatus = true;
        });

        this.users = mongoose.model('users', usersSchema);
        this.chats = mongoose.model('chats', chatsSchema);
    }

    addUser(userData) {
        const user = new this.users(userData);
        user.save((error, user) => {
            if (error) {
                console.log(error);
                return;
            }

            console.log(`user ${user.name} added`);
        })
    }

    getUser() {
        return {};
    }

    addChat(chatData) {
        const chat = new this.chats(chatData);
        chat.save((error, chat) => {
            if (error) {
                console.log(error);
                return;
            }

            console.log(`chat ${chat.name} added`);
        })
    }
}

module.exports = new Storage();
