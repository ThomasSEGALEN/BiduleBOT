const { CommandInteraction, MessageEmbed } = require("discord.js");

const discordPermissions = {
    CREATE_INSTANT_INVITE: "Créer une invitation",
    KICK_MEMBERS: "Expulser des membres",
    BAN_MEMBERS: "Bannir des membres",
    ADMINISTRATOR: "Administrateur",
    MANAGE_CHANNELS: "Gérer les salons",
    MANAGE_GUILD: "Gérer le serveur",
    ADD_REACTIONS: "Ajouter des réactions",
    VIEW_AUDIT_LOG: "Voir les logs du serveur",
    PRIORITY_SPEAKER: "Voix prioritaire",
    STREAM: "Vidéo",
    VIEW_CHANNEL: "Voir les salons",
    SEND_MESSAGES: "Envoyer des messages",
    SEND_TTS_MESSAGES: "Envoyer des messages de synthèse vocale",
    MANAGE_MESSAGES: "Gérer les messages",
    EMBED_LINKS: "Intégrer des liens",
    ATTACH_FILES: "Joindre des fichiers",
    READ_MESSAGE_HISTORY: "Voir les anciens messages",
    MENTION_EVERYONE: "Mentionner @everyone, @here et tous les rôles",
    USE_EXTERNAL_EMOJIS: "Utiliser des émojis externes",
    VIEW_GUILD_INSIGHTS: "Voir les informations du serveur",
    CONNECT: "Se connecter",
    SPEAK: "Parler",
    MUTE_MEMBERS: "Rendre les membres muets",
    DEAFEN_MEMBERS: "Mettre en sourdine des membres",
    MOVE_MEMBERS: "Déplacer des membres",
    USE_VAD: "Utiliser la Détection de la voix",
    CHANGE_NICKNAME: "Changer le pseudo",
    MANAGE_NICKNAMES: "Gérer les pseudos",
    MANAGE_ROLES: "Gérer les rôles",
    MANAGE_WEBHOOKS: "Gérer les webhooks",
    MANAGE_EMOJIS_AND_STICKERS: "Gérer les émojis et les autocollants",
    USE_APPLICATION_COMMANDS: "Utiliser les commandes de l'application",
    REQUEST_TO_SPEAK: "Demande de parole",
    MANAGE_THREADS: "Gérer les fils",
    CREATE_PUBLIC_THREADS: "Créer des fils publics",
    CREATE_PRIVATE_THREADS: "Créer des fils privés",
    USE_EXTERNAL_STICKERS: "Utiliser des autocollants externes",
    SEND_MESSAGES_IN_THREADS: "Envoyer des messages dans les fils",
    START_EMBEDDED_ACTIVITIES: "Commencer les activités",
};

module.exports = {
    name: "userinfo",
    description: "Afficher les informations d'un utilisateur",
    permisson: "SEND_MESSAGES",
    options: [
        {
            name: "user",
            description: "Choisir un utilisateur",
            type: "USER",
            required: false,
        },
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { options, user } = interaction;
        const User = options.getMember("user") || interaction.member;
        const userTag = User.user.tag;
        const userAvatar = User.user.avatarURL({ dynamic: true, size: 512 });
        const userId = User.id;
        const userNickname = User.nickname || "Aucun";
        const userCreatedTimestamp = parseInt(
            User.user.createdTimestamp / 1000
        );
        const userJoinedTimestamp = parseInt(User.joinedTimestamp / 1000);
        const roleCount = User.roles.cache.size - 1;
        const userRoles = User.roles.cache
            .sort((a, b) => b.position - a.position)
            .map((r) => r.toString())
            .slice(0, -1)
            .join(" ");
        const userPermissions = User.permissions
            .toArray()
            .map((p) => `\`${discordPermissions[p]}\``)
            .join(" ");
        const requestName = user.username;
        const requestAvatar = user.avatarURL({ dynamic: true, size: 512 });
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor(`${userTag}`, userAvatar)
            .setDescription(`<@${userId}>`)
            .setThumbnail(userAvatar)
            .addFields([
                {
                    name: "Identifiant",
                    value: `${userId}`,
                    inline: true,
                },
                {
                    name: "Surnom",
                    value: ` ${userNickname}`,
                    inline: true,
                },
                {
                    name: "Date de création",
                    value: `
                        <t:${userCreatedTimestamp}> (<t:${userCreatedTimestamp}:R>)`,
                },
                {
                    name: "Date d'arrivée",
                    value: `<t:${userJoinedTimestamp}> (<t:${userJoinedTimestamp}:R>)`,
                },
                {
                    name: `Rôles [${roleCount}]`,
                    value: `${userRoles}`,
                },
                {
                    name: "Permissions",
                    value: `${userPermissions}`,
                },
            ])
            .setTimestamp()
            .setFooter(`Demandé par ${requestName}`, `${requestAvatar}`);
        await interaction.reply({ embeds: [Embed], ephemeral: false });
    },
};
