const {
    Client,
    CommandInteraction,
    MessageEmbed,
    WebhookClient,
} = require("discord.js");

module.exports = {
    name: "ban",
    description: "Bannir un utilisateur",
    permission: "BAN_MEMBERS",
    options: [
        {
            name: "user",
            description: "Choisir un utilisateur",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "Fournir une raison",
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
        const { options } = interaction;
        const User = options.getMember("user");
        const Reason = options.getString("reason");
        const Logger = new WebhookClient({
            id: "903078189629308950",
            token: "gYygFTO7Wmlm9wMi3rGHmaHM8an4J3gMml1ccABK-BTNC-6FScSk2rlxWRbmzcTuZxQR",
        });
        const userTag = User.user.tag;
        const userAvatar = User.user.avatarURL({ dynamic: true, size: 512 });
        const botName = client.user.username;
        const botAvatar = client.user.avatarURL();
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor(`${userTag}`, userAvatar)
            .setDescription(
                `L'utilisateur **${User}** a été **banni**.\nRaison: ${Reason}.`
            )
            .setTimestamp()
            .setFooter(`${botName}`, `${botAvatar}`);
        User.ban()
            .then(() => {
                Logger.send({ embeds: [Embed] });
                interaction.reply({ embeds: [Embed], ephemeral: true });
            })
            .catch(() => {
                Embed.setDescription(
                    "Vous n'avez pas la permission d'effectuer cette action."
                );
                interaction.reply({ embeds: [Embed], ephemeral: true });
            });
    },
};
