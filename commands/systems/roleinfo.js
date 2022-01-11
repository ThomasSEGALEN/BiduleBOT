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
    name: "roleinfo",
    description: "Afficher les informations d'un rôle",
    permisson: "SEND_MESSAGES",
    options: [
        {
            name: "role",
            description: "Choisir un rôle",
            type: "ROLE",
            required: true,
        },
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, options, user } = interaction;
        const Role = options.getRole("role");
        const roleName = Role.name;
        const roleId = Role.id;
        const guildIcon = guild.iconURL({ dynamic: true, size: 512 });
        const roleColor = Role.hexColor;
        const roleCreatedTimestamp = parseInt(Role.createdTimestamp / 1000);
        const roleMention = Role.mentionable;
        const roleHasCount = Role.members.size;
        const memberCount = guild.memberCount;
        const roleHasName = Role.members
            .map((m) => m)
            .slice(0, 20)
            .join(", ");
        const rolePermissions = Role.permissions
            .toArray()
            .map((p) => `\`${discordPermissions[p]}\``)
            .join(" ");
        const rolePosition = Role.position;
        const roleList = guild.roles.cache
            .sort((a, b) => a.position - b.position)
            .map((r) => r.name);
        const roleSelected = roleList[rolePosition];
        const roleSelectedAbove = roleList[rolePosition + 1];
        const roleSelectedBelow = roleList[rolePosition - 1];
        const requestName = user.username;
        const requestAvatar = user.avatarURL({ dynamic: true, size: 512 });
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setTitle(`Rôle: ${roleName}`)
            .setDescription(
                `${
                    roleId == guild.roles.everyone
                        ? `@everyone`
                        : `<@&${roleId}>`
                }`
            )
            .setThumbnail(guildIcon)
            .addFields([
                {
                    name: "Identifiant",
                    value: `${roleId}`,
                    inline: true,
                },
                {
                    name: "Couleur",
                    value: `\`${roleColor}\``,
                    inline: true,
                },
                {
                    name: "Date de création",
                    value: `
                    <t:${roleCreatedTimestamp}> (<t:${roleCreatedTimestamp}:R>)`,
                },
                {
                    name: "Mentionnable",
                    value: `${roleMention === true ? "Oui" : "Non"}`,
                },
                {
                    name: `Membres [${roleHasCount}/${memberCount}]`,
                    value: `${
                        memberCount > 20 ? roleHasName + "..." : roleHasName
                    }`,
                },
                {
                    name: "Permissions",
                    value: `${rolePermissions}`,
                },
                {
                    name: "Position",
                    value: `${
                        roleSelectedAbove === undefined
                            ? ""
                            : roleSelectedAbove + " > "
                    } **${roleSelected}**${
                        roleSelectedBelow === undefined
                            ? ""
                            : " > " + roleSelectedBelow
                    }`,
                },
            ])
            .setTimestamp()
            .setFooter(`Demandé par ${requestName}`, `${requestAvatar}`);
        await interaction.reply({ embeds: [Embed], ephemeral: false });
    },
};
