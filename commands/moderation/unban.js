const {
    Client,
    CommandInteraction,
    MessageEmbed,
    WebhookClient,
} = require("discord.js");

module.exports = {
    name: "unban",
    description: "Révoquer le bannissement d'un utilisateur",
    permission: "BAN_MEMBERS",
    options: [
        {
            name: "userid",
            description: "Choisir un identifiant",
            type: "STRING",
            required: true,
        },
        {
            name: "reason",
            description: "Fournir une raison",
            type: "STRING",
            required: false,
        },
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options } = interaction;
        const UserID = options.getString("userid");
        const Reason = options.getString("reason") || "Aucune raison fournie";
        const Webhook = new WebhookClient({
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
                `Le **bannissement** de l'identifiant **${UserID}** a été **révoqué**.\nRaison: ${Reason}.`
            )
            .setTimestamp()
            .setFooter(`${botName}`, `${botAvatar}`);
        interaction.guild.members
            .unban(UserID)
            .then(() => {
                Webhook.send({ embeds: [Embed] });
                interaction.reply({ embeds: [Embed], ephemeral: true });
            })
            .catch(() => {
                Embed.setDescription("Invalid User ID provided.");
                interaction.reply({ embeds: [Embed], ephemeral: true });
            });
    },
};
