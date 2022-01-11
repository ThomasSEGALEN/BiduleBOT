const { ButtonInteraction, MessageEmbed } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const DB = require("../../structures/schemas/ticketDB");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        const { channel, customId, guild, guildId ,member } = interaction;
        if (!interaction.isButton()) return;
        if (customId !== "ticket-close") return;
        if (!member.permissions.has("KICK_MEMBERS"))
            return interaction.reply({
                content: "⛔ Vous ne pouvez pas intéragir avec ces boutons.",
            });
        const channelId = channel.id;
        const Embed = new MessageEmbed().setColor("PURPLE");
        DB.findOne({ GuildID: guildId, ChannelID: channelId }, async (err, data) => {
            if (err) throw err;
            if (!data)
                return interaction.reply({
                    content: "⛔ Aucune donnée dans la base de données.",
                    ephemeral: true,
                });
            if (data.Closed === true)
                return interaction.reply({
                    content: "Ce ticket est déjà fermé.",
                    ephemeral: true,
                });
            await DB.updateOne(
                { ChannelID: channelId },
                { Closed: true }
            );
            const User = guild.members.cache.get(data.UserID[0]);
            const userName = User.user.username;
            const userTag = User.user.tag;
            const userAvatar = User.displayAvatarURL({
                dynamic: true,
                size: 512,
            });
            const Attachment = await createTranscript(channel, {
                limit: -1,
                returnBuffer: false,
                fileName: `${userName}-${data.TicketID}.html`,
            });
            Embed.setAuthor(userTag, userAvatar).setTitle(
                `ID: ${data.TicketID}`
            );
            const transcriptChannel = guild.channels.cache.find(
                (c) => c.name === "ticket-logs"
            );
            const Message = await guild.channels.cache
                .get(transcriptChannel.id)
                .send({ embeds: [Embed], files: [Attachment] });
            setTimeout(() => {
                channel.delete();
            }, 10 * 1000);
            return interaction.reply({
                content: `💾 Ce ticket a été [sauvegardé](${Message.url}) et va être fermé dans quelques instants.`,
            });
        });
    },
};
