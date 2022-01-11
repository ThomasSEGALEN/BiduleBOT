const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { Dev } = require("../../structures/config.json");

module.exports = {
    name: "skip",
    description: "Passer à la lecture suivante",
    permission: "SEND_MESSAGES",
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { member, guild } = interaction;
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
            const queue = await client.distube.getQueue(voiceChannel);
            await queue.skip(voiceChannel);
            return interaction.reply({
                content: "⏭ Lecture suivante.",
            });
        } catch (err) {
            const errorEmbed = new MessageEmbed()
                .setColor("PURPLE")
                .setDescription(`Erreur: ${err} - Discord: ${Dev}`);
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};
