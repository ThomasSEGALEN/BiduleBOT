const {
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
} = require("discord.js");
const DB = require("../../structures/schemas/ticketDB");
const { StaffID } = require("../../structures/config.json");

module.exports = {
    name: "ticket-setup",
    description: "Système de ticket",
    permission: "ADMINISTRATOR",
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild } = interaction;
        const guildName = guild.name;
        const guildAvatar = guild.iconURL({ dynamic: true, size: 512 });
        const everyoneId = guild.roles.everyone;
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor(guildName, guildAvatar)
            .setDescription(
                "Un membre du **Staff** rejoindra la discussion quelques instants après sa création."
            );
        const Button = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("ticket-create")
                .setLabel("Ouvrir un ticket")
                .setStyle("PRIMARY")
                .setEmoji("📩")
        );
        await guild.channels
            .create("Support", {
                type: "GUILD_CATEGORY",
            })
            .then(async (parent) => {
                await guild.channels.create("ticket-logs", {
                    type: "GUILD_TEXT",
                    parent: parent.id,
                    permissionOverwrites: [
                        {
                            id: StaffID,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                        },
                        {
                            id: everyoneId,
                            deny: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                        },
                    ],
                });
                await guild.channels
                    .create("ticket", {
                        type: "GUILD_TEXT",
                        parent: parent.id,
                    })
                    .then(async (channel) => {
                        await guild.channels.cache
                            .get(channel.id)
                            .send({ embeds: [Embed], components: [Button] });
                    });
            });
        interaction.reply({ content: "Système de ticket.", ephemeral: true });
    },
};
