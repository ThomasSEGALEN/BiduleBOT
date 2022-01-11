const { model, Schema } = require("mongoose");

module.exports = model(
    "ticketDB",
    new Schema({
        GuildID: String,
        UserID: [String],
        TicketID: String,
        ChannelID: String,
        Closed: Boolean,
    })
);
