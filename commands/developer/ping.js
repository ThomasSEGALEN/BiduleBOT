const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Afficher le délai de réponse du bot",
    permission: "ADMINISTRATOR",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        const botPing = client.ws.ping;
        interaction.reply({ content: `Pong! 🏓 \`${botPing}ms\`` });
    },
};
