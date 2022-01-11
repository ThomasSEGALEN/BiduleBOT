const { Message, MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageUpdate",
    /**
     * @param {Message} oldMessage
     * @param {Message} newMessage
     */
    execute(oldMessage, newMessage) {
        if (oldMessage.author.bot) return;
        if (oldMessage.content === newMessage.content) return;
        const Count = 1950;
        const messageUrl = newMessage.url;
        const messageAuthor = newMessage.author;
        const messageChannel = newMessage.channel;
        const originalMessage =
            oldMessage.content.slice(0, Count) +
            (oldMessage.content.length > 1950 ? " ..." : "");
        const editedMessage =
            newMessage.content.slice(0, Count) +
            (newMessage.content.length > 1950 ? " ..." : "");
        const authorTag = message.author.tag;
        const authorId = message.author.id;
        const Webhook = new WebhookClient({
            id: "903078189629308950",
            token: "gYygFTO7Wmlm9wMi3rGHmaHM8an4J3gMml1ccABK-BTNC-6FScSk2rlxWRbmzcTuZxQR",
        });
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setDescription(
                `Un [message](${messageUrl}) de ${messageAuthor} a été **modifié** dans ${messageChannel}.\n
                **Message original**:\n\`${originalMessage}\`\n**Message édité**:\n\`${editedMessage}\``
            )
            .setFooter(`Auteur: ${authorTag} | ID: ${authorId}`);
        Webhook.send({ embeds: [Embed] });
    },
};
