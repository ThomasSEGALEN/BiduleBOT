const { ButtonInteraction } = require("discord.js");
const DB = require("../../structures/schemas/suggestDB");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        const { customId, guildId, message } = interaction;
        if (!interaction.isButton()) return;
        if (!["suggest-accept", "suggest-decline"].includes(customId)) return;
        if (!interaction.member.permissions.has("ADMINISTRATOR"))
            return interaction.reply({
                content: "⛔ Vous ne pouvez pas intéragir avec ce bouton.",
                ephemeral: true,
            });
        DB.findOne(
            { GuildID: guildId, MessageID: message.id },
            async (err, data) => {
                if (err) throw err;
                if (!data)
                    return interaction.reply({
                        content: "⛔ Aucune donnée dans la base de données.",
                        ephemeral: true,
                    });
                const Embed = message.embeds[0];
                if (!Embed) return;
                switch (customId) {
                    case "suggest-accept":
                        {
                            Embed.fields[1] = {
                                name: "Statut",
                                value: "Acceptée",
                                inline: true,
                            };
                            message.edit({ embeds: [Embed], components: [] });
                            interaction.reply({
                                content: "Vous avez accepté la suggestion.",
                                ephemeral: true,
                            });
                        }
                        break;
                    case "suggest-decline":
                        {
                            Embed.fields[1] = {
                                name: "Statut",
                                value: "Refusée",
                                inline: true,
                            };
                            message.edit({ embeds: [Embed], components: [] });
                            interaction.reply({
                                content: "Vous avez refusé la suggestion.",
                                ephemeral: true,
                            });
                        }
                        break;
                }
            }
        );
    },
};
