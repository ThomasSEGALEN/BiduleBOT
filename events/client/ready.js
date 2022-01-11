const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { Database } = require("../../structures/config.json");

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client
     */
    execute(client) {
        const botTag = client.user.tag;
        console.log(`${botTag} est en ligne ! 🟢`);
        client.user.setPresence({
            activities: [
                {
                    name: "|| Bidule.'s bot",
                    url: "https://www.twitch.tv/shirotoriko",
                    type: "STREAMING",
                },
            ],
        });
        if (!Database) return;
        mongoose
            .connect(Database, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log(`${botTag} est connecté à la base de données.`);
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
