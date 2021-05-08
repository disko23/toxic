const { Telegraf } = require('telegraf');

const config = require('./config');
const msgs = require('./messages');
const { addToxic, searchToxic } = require('./toxic');

console.log(config);

const bot = new Telegraf(config.botId);

bot.start(ctx => {
    console.log('start');
    ctx.reply(msgs.start);
});

bot.help(ctx => {
    ctx.reply(msgs.help);
});

bot.on('message', async ctx => {
    if (!ctx || !ctx.message) {
        console.log('no message');
        return;
    }

    const { text } = ctx.message;
    console.log(text);

    if (text === '/help') {
        return ctx.reply(msgs.help);
    }
    
    if (text === '/join') {
        await addToxic(ctx.chat, ctx.from);
        return ctx.reply(msgs.addToxic(ctx.from.username));
    }

    if (text === '/toxic') {
        const username = await searchToxic(ctx.chat);
        return ctx.reply(msgs.searchToxic(username));
    }
});

bot.launch();
