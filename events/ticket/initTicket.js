const {
    ButtonInteraction,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
} = require("discord.js");
const DB = require("../../structures/schemas/ticketDB");
const { StaffID } = require("../../structures/config.json");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        const { channel, customId, guild, user } = interaction;
        if (!interaction.isButton()) return;
        if (customId !== "ticket-create") return;
        const guildName = guild.name;
        const guildAvatar = guild.iconURL({ dynamic: true, size: 512 });
        const userName = user.username;
        const userId = user.id;
        const everyoneId = guild.roles.everyone;
        const parentId = channel.parentId;
        const guildId = guild.id;
        const ID = Math.floor(Math.random() * 90000) + 10000;
        const Embed = new MessageEmbed()
            .setAuthor(guildName, guildAvatar)
            .setTitle("Ticket")
            .setDescription("Blabla, \nBlabla\nBlabla")
            .setColor("PURPLE")
            .setTimestamp();
        const Button = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("ticket-close")
                .setLabel("💾 Sauvegarder & Fermer")
                .setStyle("SUCCESS")
        );
        if (
            guild.channels.cache.find((channel) =>
                channel.name.endsWith(
                    userName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
                )
            )
        )
            return interaction.reply({
                content: `⛔ Vous avez déjà un ticket ouvert.`,
                ephemeral: true,
            });
        guild.channels
            .create(`ticket-${userName}`, {
                type: "GUILD_TEXT",
                parent: parentId,
                permissionOverwrites: [
                    {
                        id: StaffID,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                    },
                    {
                        id: userId,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                    },
                    {
                        id: everyoneId,
                        deny: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                    },
                ],
            })
            .then(async (channel) => {
                channel.send({
                    content: `Bienvenue <@${userId}> <@&${StaffID}>.`,
                    embeds: [Embed],
                    components: [Button],
                });
                await DB.create({
                    GuildID: guildId,
                    UserID: userId,
                    TicketID: ID,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                });
                return interaction.reply({
                    content: `Ticket ouvert dans <#${channel.id}>.`,
                    ephemeral: true,
                });
            });
    },
};
