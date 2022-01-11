const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../structures/schemas/afkDB");

module.exports = {
    name: "afk",
    description: "Sytème d'AFK",
    permisson: "SEND_MESSAGES",
    options: [
        {
            name: "message",
            description: "Définir un message",
            type: "STRING",
            required: false,
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { createdTimestamp, guild, options, user } = interaction;
        const userTag = user.tag;
        const userAvatar = user.displayAvatarURL({ dynamic: true, size: 512 });
        const guildId = guild.id;
        const userId = user.id;
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor(userTag, userAvatar);
        const afkMessage =
            options.getString("message") || "Je ne suis pas disponible.";
        const afkTime = parseInt(createdTimestamp / 1000);
        DB.findOne({ GuildID: guildId, UserID: userId }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                await DB.create({
                    GuildID: guildId,
                    UserID: userId,
                    Message: afkMessage,
                    Time: afkTime,
                });
                Embed.setDescription("Votre statut d'AFK est désormais actif.");
                return interaction.reply({
                    embeds: [Embed],
                    ephemeral: true,
                });
            } else {
                await DB.deleteOne({ GuildID: guildId, UserID: userId });
                Embed.setDescription(
                    "Votre statut d'AFK est désormais inactif."
                );
                return interaction.reply({
                    embeds: [Embed],
                    ephemeral: true,
                });
            }
        });
    },
};
