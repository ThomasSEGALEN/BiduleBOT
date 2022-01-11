const { model, Schema } = require("mongoose");

module.exports = model(
    "configDB",
    new Schema({
        GuildID: String,
        OwnerID: String,
        StaffID: String,
        MemberID: String,
        MuteID: String,
        TranscriptID: String,
    })
);
