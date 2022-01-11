const {
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
} = require("discord.js");
const DB = require("../../structures/schemas/suggestDB");

module.exports = {
    name: "suggest",
    description: "Soumettre une suggestion",
    permisson: "SEND_MESSAGES",
    options: [
        {
            name: "name",
            description: "Fournir un nom",
            type: "STRING",
            required: true,
        },
        {
            name: "feature",
            description: "Décrire son utilité/sa fonctionnalité",
            type: "STRING",
            required: true,
        },
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guildId, member, options, user } = interaction;
        const Name = options.getString("name");
        const Feature = options.getString("feature");
        const requestName = user.username;
        const requestAvatar = user.avatarURL({ dynamic: true, size: 512 });
        const Button = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("suggest-accept")
                .setLabel("Accepter")
                .setStyle("SUCCESS"),
            new MessageButton()
                .setCustomId("suggest-decline")
                .setLabel("Refuser")
                .setStyle("DANGER")
        );
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setTitle(`Suggestion:`)
            .addFields([
                {
                    name: "Titre",
                    value: `${Name}`,
                    inline: true,
                },
                {
                    name: "Statut",
                    value: `En attente`,
                    inline: true,
                },
                {
                    name: "Fonctionnalités",
                    value: `${Feature}`,
                    inline: false,
                },
            ])
            .setTimestamp()
            .setFooter(`Proposé par ${requestName}`, `${requestAvatar}`);
        try {
            const message = await interaction.reply({
                embeds: [Embed],
                components: [Button],
                fetchReply: true,
            });
            message.react("✅");
            message.react("❌");
            await DB.create({
                GuildID: guildId,
                MessageID: message.id,
                Details: [
                    {
                        MemberID: member.id,
                        Name: Name,
                        Feature: Feature,
                    },
                ],
            });
        } catch {
            return;
        }
    },
};
