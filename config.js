const getKey = (name, defaultValue) => {
    const value = process.env[name];

    if (value) {
        return value;
    }

    return defaultValue;
}

module.exports = {
    botId: getKey('BOT_ID', null),
};
