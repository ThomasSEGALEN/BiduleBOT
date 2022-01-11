const { model, Schema } = require("mongoose");

module.exports = model(
    "afkDB",
    new Schema({
        GuildID: String,
        UserID: String,
        Message: String,
        Time: String,
    })
);
