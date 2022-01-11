const {
    CommandInteraction,
    MessageActionRow,
    MessageEmbed,
    MessageSelectMenu,
} = require("discord.js");

module.exports = {
    name: "help",
    description: "Afficher toutes les commandes",
    permission: "SEND_MESSAGES",
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction) {
        const SelectMenu = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId("help")
                .setMaxValues(1)
                .setPlaceholder("📚 Choisissez une catégorie")
                .addOptions([
                    {
                        label: "Accueil",
                        value: "help-home",
                        description: "Informations générales",
                        emoji: "🏠",
                    },
                    {
                        label: "Modération",
                        value: "help-moderation",
                        description: "Commandes de modération",
                        emoji: "🔨",
                    },
                    {
                        label: "Informations",
                        value: "help-informations",
                        description: "Commandes d'informations",
                        emoji: "🔍",
                    },
                    {
                        label: "Musique",
                        value: "help-music",
                        description: "Commandes de musique",
                        emoji: "🎵",
                    },
                    {
                        label: "Divers",
                        value: "help-misc",
                        description: "Commandes diverses",
                        emoji: "🎈",
                    },
                ])
        );
        const { user } = interaction;
        const requestName = user.username;
        const requestAvatar = user.avatarURL({ dynamic: true, size: 512 });
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setTitle("🏠 Accueil - Informations générales")
            .setDescription(
                "- Préfixe: `/<commande>`\n- Développeur: `Bidule.#1234`"
            )
            .addField(
                "**Liens utiles:**",
                "> [Twitch](https://www.twitch.tv/shirotoriko)\n> [GitHub](https://github.com/ThomasSEGALEN)\n> [Wizard101 Community](https://discord.com/invite/3rjNPkXgxT)"
            )
            .setTimestamp()
            .setFooter({
                text: `Demandé par ${requestName}`,
                iconURL: `${requestAvatar}`,
            });
        try {
            await interaction.reply({
                embeds: [Embed],
                components: [SelectMenu],
            });
        } catch {
            return;
        }
    },
};
