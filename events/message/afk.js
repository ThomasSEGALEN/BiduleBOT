const { Message, MessageEmbed } = require("discord.js");
const DB = require("../../structures/schemas/afkDB");

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message
     */
    async execute(message) {
        const { author, guild } = message;
        const authorBot = author.bot;
        const guildId = guild.id;
        const userId = author.id;
        if (authorBot) return;
        DB.findOne({ GuildID: guildId, UserID: userId }, async (err, data) => {
            if (err) throw err;
            if (!data) return;
            if (data.UserID === userId)
                return await DB.deleteOne({ GuildID: guildId, UserID: userId });
        });
        if (message.mentions.members.size) {
            const Embed = new MessageEmbed().setColor("PURPLE");
            message.mentions.members.forEach((m) => {
                DB.findOne(
                    { GuildID: guildId, UserID: m.id },
                    async (err, data) => {
                        if (err) throw err;
                        if (data)
                            return message.reply({
                                embeds: [
                                    Embed.setDescription(
                                        `${m} est AFK depuis <t:${data.Time}:R>\n**Message :**  ${data.Message}`
                                    ),
                                ],
                            });
                    }
                );
            });
        }
    },
};
