const { Message, MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} message
     */
    execute(message) {
        if (message.author.bot) return;
        const messageUrl = message.url;
        const messageAuthor = message.author;
        const messageChannel = message.channel;
        const messageContent = message.content;
        const authorTag = message.author.tag;
        const authorId = message.author.id;
        const Webhook = new WebhookClient({
            id: "903078189629308950",
            token: "gYygFTO7Wmlm9wMi3rGHmaHM8an4J3gMml1ccABK-BTNC-6FScSk2rlxWRbmzcTuZxQR",
        });
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setDescription(
                `Un [message](${messageUrl}) de ${messageAuthor} a été **supprimé** dans ${messageChannel}.\n
                **Message supprimé**:\n\`${
                    messageContent ? messageContent : "Aucun"
                }\``.slice(0, 4096)
            )
            .setFooter(`Auteur: ${authorTag} | ID: ${authorId}`);
        if (message.attachments.size >= 1) {
            Embed.addField(
                `Pièces jointes:`,
                `${message.attachments.map((a) => a.url)}`,
                true
            );
        }
        Webhook.send({ embeds: [Embed] });
    },
};
