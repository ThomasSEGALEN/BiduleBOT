const {
    Client,
    CommandInteraction,
    MessageEmbed,
    WebhookClient,
} = require("discord.js");

module.exports = {
    name: "kick",
    description: "Expulser un utilisateur",
    permission: "KICK_MEMBERS",
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
        const User = options.getMember("user");
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
                `L'utilisateur  **${User}** a été **expulsé**.\nRaison: ${Reason}.`
            )
            .setTimestamp()
            .setFooter(`${botName}`, `${botAvatar}`);

        Target.kick()
            .then(() => {
                Webhook.send({ embeds: [Embed] });
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
