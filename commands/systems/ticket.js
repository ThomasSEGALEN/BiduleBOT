const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../structures/schemas/ticketDB");

module.exports = {
    name: "ticket",
    description: "Système de ticket",
    type: "STRING",
    required: true,
    options: [
        {
            name: "action",
            description: "Ajout/retrait d'un utilisateur à un ticket",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "add",
                    value: "add"
                },
                {
                    name: "remove",
                    value: "remove"
                }
            ]
        },
        {
            name: "user",
            description: "Choisir un utilisateur",
            type: "USER",
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { channel, guild, options } = interaction;
        const guildId = guild.id;
        const channelId = channel.id;
        const Action = options.getString("action");
        const User = options.getMember("user");
        const userId = User.id;
        switch (Action) {
            case "add": {
                DB.findOne({ GuildID: guildId, ChannelID: channelId }, async (err, data) => {
                    if (err) throw err;
                    if (!data) return interaction.reply({ content: "⛔ Ce salon n'est pas lié à un ticket.", ephemeral: true });
                    if (data.UserID.includes(userId)) return interaction.reply({ content: "Cet utilisateur ne peut pas être ajouté au ticket.", ephemeral: true })
                    data.UserID.push(userId);
                    channel.permissionOverwrites.edit(userId, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true
                    })
                    data.save();
                    return interaction.reply({ content: `L'utilisateur ${User} a été ajouté au ticket.` });
                });
            }
            case "remove": {
                DB.findOne({ GuildID: guildId, ChannelID: channelId }, async (err, data) => {
                    if (err) throw err;
                    if (!data) return interaction.reply({ content: "⛔ Ce salon n'est pas lié à un ticket.", ephemeral: true });
                    if (!data.UserID.includes(userId)) return interaction.reply({ content: "Cet utilisateur ne peut pas être retiré du ticket.", ephemeral: true })
                    data.UserID.remove(userId);
                    channel.permissionOverwrites.edit(userId, {
                        VIEW_CHANNEL: false
                    })
                    data.save();
                    return interaction.reply({ content: `L'utilisateur ${User} a été retiré du ticket.` });
                });
            }
        }
    }
}