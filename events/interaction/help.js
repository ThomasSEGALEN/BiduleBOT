const { MessageEmbed, SelectMenuInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {SelectMenuInteraction} interaction
     */
    async execute(interaction) {
        const { customId, message, user } = interaction;
        if (!interaction.isSelectMenu()) return;
        if (customId !== "help") return;
        const userId = user.id;
        const authorId = message.interaction.user.id;
        if (userId === authorId) {
            const requestName = user.username;
            const requestAvatar = user.avatarURL({
                dynamic: true,
                size: 512,
            });
            switch (interaction.values[0]) {
                case "help-home": {
                    const home = new MessageEmbed()
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
                        .setFooter(
                            `Demandé par ${requestName}`,
                            `${requestAvatar}`
                        );
                    return await interaction.update({
                        embeds: [home],
                    });
                }
                case "help-moderation": {
                    const moderation = new MessageEmbed()
                        .setColor("PURPLE")
                        .setTitle("🔨 Modération - Commandes de modération")
                        .setDescription(
                            "> **ban** - Bannir un utilisateur\n> **clear** - Supprimer des messages en masse\n> **kick** - Expulser un utilisateur\n> **mute** - Réduire au silence un utilisateur\n> **unban** - Révoquer le bannissement d'un utilisateur\n> **unmute** - Révoquer la réduction au silence d'un utilisateur"
                        )
                        .setTimestamp()
                        .setFooter(
                            `Demandé par ${requestName}`,
                            `${requestAvatar}`
                        );
                    return await interaction.update({
                        embeds: [moderation],
                    });
                }
                case "help-informations": {
                    const informations = new MessageEmbed()
                        .setColor("PURPLE")
                        .setTitle("🔍 Informations - Commandes d'informations")
                        .setDescription(
                            "> **channelinfo** - Afficher les information d'un salon\n> **roleinfo** - Afficher les informations d'un rôle\n> **serverinfo** - Afficher les informations du serveur\n> **userinfo** - Afficher les informations d'un utilisateur"
                        )
                        .setTimestamp()
                        .setFooter(
                            `Demandé par ${requestName}`,
                            `${requestAvatar}`
                        );
                    return await interaction.update({
                        embeds: [informations],
                    });
                }
                case "help-music": {
                    const music = new MessageEmbed()
                        .setColor("PURPLE")
                        .setTitle("🎵 Musique - Commandes de musique")
                        .setDescription(
                            "> **pause** - Mettre le lecteur en pause\n> **play** - Jouer de la musique\n> **queue** - Afficher la liste de lecture\n> **repeat** - Changer le mode de lecture\n> **resume** - Reprendre la lecture\n> **skip** - Passer à la lecture suivante\n> **stop** - Arrêter le lecteur et effacer la liste de lecture\n> **volume** - Régler le volume"
                        )
                        .setTimestamp()
                        .setFooter(
                            `Demandé par ${requestName}`,
                            `${requestAvatar}`
                        );
                    return await interaction.update({
                        embeds: [music],
                    });
                }
                case "help-misc": {
                    const misc = new MessageEmbed()
                        .setColor("PURPLE")
                        .setTitle("🎈 Divers - Commandes diverses")
                        .setDescription(
                            "> **avatar** - Afficher l'avatar d'un utilisateur\n> **giveaway** - Créer un giveaway\n> **suggest** - Soumettre une suggestion\n> **ticket** - Créer un ticket"
                        )
                        .setTimestamp()
                        .setFooter(
                            `Demandé par ${requestName}`,
                            `${requestAvatar}`
                        );
                    return await interaction.update({
                        embeds: [misc],
                    });
                }
            }
        } else {
            const selectMenuErrorEmbed = new MessageEmbed()
                .setColor("PURPLE")
                .setDescription(
                    "⛔ Vous ne pouvez pas intéragir avec ce message."
                );
            return await interaction.reply({
                embeds: [selectMenuErrorEmbed],
                ephemeral: true,
            });
        }
    },
};
