const { ButtonInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        const { customId, guild } = interaction;
        if (!interaction.isButton()) return;
        if (!["planning-current", "planning-next"].includes(customId)) return;
        const guildIcon = guild.iconURL({ dynamic: true, size: 512 });
        switch (customId) {
            case "planning-current": {
                const Embed = new MessageEmbed()
                    .setColor("PURPLE")
                    .setThumbnail(guildIcon)
                    .setTitle("Emploi du temps")
                    .setDescription("Semaine du 13 décembre - 17 décembre")
                    .addFields(
                        {
                            name: "Lundi - Factory",
                            value: "9h30 - 13h00\n14h00 - 17h30",
                            inline: true,
                        },
                        {
                            name: "Mardi - Factory",
                            value: "9h30 - 13h00\n14h00 - 17h30",
                            inline: true,
                        },
                        {
                            name: "Mercredi - Factory",
                            value: "9h30 - 13h00\n14h00 - 17h30",
                            inline: false,
                        },
                        {
                            name: "Jeudi - WebJS",
                            value: "8h00 - 12h30\n13h30 - 17h00",
                            inline: true,
                        },
                        {
                            name: "Vendredi - Expertise",
                            value: "8h00 - 12h30\n13h30 - 17h00",
                            inline: true,
                        }
                    );
                return await interaction.update({
                    embeds: [Embed],
                });
            }
            case "planning-next": {
                const Embed = new MessageEmbed()
                    .setColor("PURPLE")
                    .setThumbnail(guildIcon)
                    .setTitle("Emploi du temps")
                    .setDescription("Semaine du 3 janvier - 7 janvier")
                    .addFields(
                        {
                            name: "Lundi - N/A",
                            value: "N/A\nN/A",
                            inline: true,
                        },
                        {
                            name: "Mardi - N/A",
                            value: "N/A\nN/A",
                            inline: true,
                        },
                        {
                            name: "Mercredi - N/A",
                            value: "N/A\nN/A",
                            inline: false,
                        },
                        {
                            name: "Jeudi - N/A",
                            value: "N/A\nN/A",
                            inline: true,
                        },
                        {
                            name: "Vendredi - N/A",
                            value: "N/A\nN/A",
                            inline: true,
                        }
                    );
                return await interaction.update({
                    embeds: [Embed],
                });
            }
        }
    },
};
