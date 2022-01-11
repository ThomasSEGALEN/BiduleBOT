const {
    CommandInteraction,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
} = require("discord.js");

module.exports = {
    name: "planning",
    description: "Afficher l'emploi du temps",
    permission: "SEND_MESSAGES",
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild } = interaction;
        const guildIcon = guild.iconURL({ dynamic: true, size: 512 });
        const Button = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("planning-current")
                .setLabel("Actuelle")
                .setStyle("SUCCESS"),
            new MessageButton()
                .setCustomId("planning-next")
                .setLabel("Suivante")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setLabel("Hyperplanning")
                .setStyle("LINK")
                .setURL(
                    "https://campusacademy-2022.hyperplanning.fr/hp/etudiants"
                )
        );
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
        try {
            await interaction.reply({ embeds: [Embed], components: [Button] });
        } catch {
            return;
        }
    },
};
