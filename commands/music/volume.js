const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { Dev } = require("../../structures/config.json");

module.exports = {
    name: "volume",
    description: "Régler le volume",
    permission: "SEND_MESSAGES",
    options: [
        {
            name: "percent",
            description: "Fournir une valeur (1-100)",
            type: "NUMBER",
            required: true,
        },
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options, member, guild } = interaction;
        const voiceChannel = member.voice.channel;
        const guildChannelId = guild.me.voice.channelId;
        const voiceChannelId = voiceChannel.id;
        const botName = client.user.username;
        if (!voiceChannel)
            return interaction.reply({
                content:
                    "Vous devez être dans un salon vocal pour utiliser cette commande.",
                ephemeral: true,
            });
        if (guildChannelId && voiceChannelId !== guildChannelId)
            return interaction.reply({
                content: `${botName} joue déja de la musique dans <#${guildChannelId}>.`,
                ephemeral: true,
            });
        try {
            const percent = options.getNumber("percent");
            if (percent > 100 || percent < 1)
                return interaction.reply({
                    content: "Vous devez donner une valeur entre 1 et 100.",
                });
            client.distube.setVolume(voiceChannel, percent);
            return interaction.reply({
                content: `🔊 Volume réglé à \`${percent}\`%.`,
            });
        } catch (err) {
            const errorEmbed = new MessageEmbed()
                .setColor("PURPLE")
                .setDescription(`Erreur: ${err} - Discord: ${Dev}`);
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};
