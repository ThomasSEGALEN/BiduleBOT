const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Afficher les informations du serveur",
    permisson: "SEND_MESSAGES",
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, user } = interaction;
        const serverName = guild.name;
        const guildIcon = guild.iconURL({ dynamic: true, size: 512 });
        const serverOwnerId = guild.ownerId;
        const serverId = guild.id;
        const guildCreatedTimestamp = parseInt(guild.createdTimestamp / 1000);
        const channelCount = guild.channels.cache.size;
        const memberCount = guild.memberCount;
        const botCount = guild.members.cache.filter((m) => m.user.bot).size;
        const boostCount = guild.premiumSubscriptionCount;
        const boostTier = guild.premiumTier;
        const roleCount = guild.roles.cache.size - 1;
        const serverRoles = guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map((r) => r)
            .slice(0, -1)
            .join(" ");
        const emojiCount = guild.emojis.cache.size;
        const serverStandardEmojis = guild.emojis.cache
            .filter((e) => !e.animated)
            .map((e) => `<:${e.name}:${e.id}>`)
            .sort()
            .slice(0, 15)
            .join(" ");
        const serverAnimatedEmojis = guild.emojis.cache
            .filter((e) => e.animated)
            .map((e) => `<a:${e.name}:${e.id}>`)
            .sort()
            .slice(0, 15)
            .join(" ");
        const serverEmojis = serverAnimatedEmojis + "\n" + serverStandardEmojis;
        const requestName = user.username;
        const requestAvatar = user.avatarURL({ dynamic: true, size: 512 });
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor(serverName, guild.iconURL({ dynamic: true, size: 512 }))
            .setThumbnail(guildIcon)
            .addFields([
                {
                    name: "Propriétaire",
                    value: `<@${serverOwnerId}>`,
                    inline: true,
                },
                {
                    name: "Identifiant",
                    value: `${serverId}`,
                    inline: true,
                },
                {
                    name: "Date de création",
                    value: `
                    <t:${guildCreatedTimestamp}> (<t:${guildCreatedTimestamp}:R>)`,
                },
                {
                    name: "Salons",
                    value: `${channelCount}`,
                },
                {
                    name: "Membres",
                    value: `${memberCount - botCount}`,
                    inline: true,
                },
                {
                    name: "Bots",
                    value: `${botCount > 0 ? botCount : "Aucun"}`,
                    inline: true,
                },
                {
                    name: "Boosts",
                    value: `${boostCount} boosts (\`${
                        boostTier === "NONE"
                            ? "Tier 0"
                            : boostTier === "TIER_1"
                            ? "Tier 1"
                            : boostTier === "TIER_2"
                            ? "Tier 2"
                            : "Tier 3"
                    }\`)`,
                },
                {
                    name: `Rôles [${roleCount}]`,
                    value: `${roleCount > 0 ? serverRoles : "Aucun"}`,
                },
                {
                    name: `Emojis [${emojiCount}]`,
                    value: `${emojiCount > 0 ? serverEmojis : "Aucun"}`,
                },
            ])
            .setTimestamp()
            .setFooter(`Demandé par ${requestName}`, `${requestAvatar}`);
        await interaction.reply({ embeds: [Embed], ephemeral: false });
    },
};
