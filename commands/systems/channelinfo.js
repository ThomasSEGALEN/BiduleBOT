const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "channelinfo",
    description: "Afficher les informations d'un salon",
    permisson: "SEND_MESSAGES",
    options: [
        {
            name: "channel",
            description: "Choisir un salon",
            type: "CHANNEL",
            required: true,
        },
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, options, user } = interaction;
        const Channel = options.getChannel("channel");
        const channelName = Channel.name;
        const channelId = Channel.id;
        const guildIcon = guild.iconURL({ dynamic: true, size: 512 });
        const channelCreatedTimestamp = parseInt(
            Channel.createdTimestamp / 1000
        );
        const channelType = Channel.type;
        const channelPosition = Channel.position + 1;
        const requestName = user.username;
        const requestAvatar = user.avatarURL({ dynamic: true, size: 512 });
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setTitle(`Salon: ${channelName}`)
            .setDescription(
                `${
                    channelType === "GUILD_CATEGORY"
                        ? `**${channelName}**`
                        : `<#${channelId}>`
                }`
            )
            .setThumbnail(guildIcon)
            .addFields([
                {
                    name: "Identifiant",
                    value: `${channelId}`,
                    inline: true,
                },
                {
                    name: "Date de création",
                    value: `
                    <t:${channelCreatedTimestamp}> (<t:${channelCreatedTimestamp}:R>)`,
                },
                {
                    name: "Catégorie",
                    value: `${
                        channelType === "GUILD_TEXT"
                            ? "Salon textuel"
                            : channelType === "GUILD_VOICE"
                            ? "Salon vocal"
                            : channelType === "GUILD_CATEGORY"
                            ? "Catégorie"
                            : channelType === "GUILD_NEWS"
                            ? "Salon des annonces"
                            : channelType === "GUILD_STORE"
                            ? "Boutique"
                            : channelType === "GUILD_NEWS_THREAD"
                            ? "Fil d'annonce"
                            : channelType === "GUILD_PUBLIC_THREAD"
                            ? "Fil public"
                            : channelType === "GUILD_PRIVATE_THREAD"
                            ? "Fil privé"
                            : "Salon de conférence"
                    }`,
                    inline: true,
                },
                {
                    name: "Position",
                    value: `${channelPosition}`,
                    inline: true,
                },
            ])
            .setTimestamp()
            .setFooter(`Demandé par ${requestName}`, `${requestAvatar}`);
        await interaction.reply({ embeds: [Embed], ephemeral: false });
    },
};
