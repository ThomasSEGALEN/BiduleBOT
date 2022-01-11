const { model, Schema } = require("mongoose");

module.exports = model(
    "muteDB",
    new Schema({
        GuildID: String,
        UserID: String,
        Time: String,
        MuteReason: String,
        UnmuteReason: String,
        Muted: Boolean,
    })
);
