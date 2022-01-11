const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { Dev } = require("../../structures/config.json");

module.exports = {
    name: "play",
    description: "Jouer de la musique",
    permission: "SEND_MESSAGES",
    options: [
        {
            name: "query",
            description: "Fournir le nom ou l'URL de la musique",
            type: "STRING",
            required: true,
        },
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
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
            if (options.getString("query")) {
                client.distube.playVoiceChannel(
                    voiceChannel,
                    options.getString("query"),
                    { textChannel: channel, member: member }
                );
                return interaction.reply({
                    content:
                        "🎶 Requête reçue, musique ajoutée à la liste de lecture.",
                });
            }
        } catch (err) {
            const errorEmbed = new MessageEmbed()
                .setColor("PURPLE")
                .setDescription(`Erreur: ${err} - Discord: ${Dev}`);
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};
