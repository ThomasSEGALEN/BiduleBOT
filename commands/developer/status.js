const { Client, MessageEmbed } = require("discord.js");
const { invalid } = require("moment");
const { connection } = require("mongoose");
require("../../events/client/ready");

module.exports = {
    name: "status",
    description:
        "Afficher l'état de la connexion entre le bot et la base de données",
    permission: "ADMINISTRATOR",
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const botPing = client.ws.ping;
        const botReadyTimestamp = parseInt(client.readyTimestamp / 1000);
        const commandAmount = client.commands.size;
        const guildAmount = client.guilds.cache.size;
        const userAmount = client.users.cache.size;
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setTitle(`${client.user.username}`)
            .setDescription(
                `**Bot :** \`🟢 EN LIGNE\` - \`${botPing}ms\`\n**Temps de fonctionnement :** <t:${botReadyTimestamp}:R>\n**Base de données :**\`${switchTo(
                    connection.readyState
                )}\`
                \n**Outils :**\n> **Discord Javscript :** \`${
                    process.version
                }\`\n> **Node.js :** \`${
                    process.version
                }\`\n> **Discord.js :** \`${
                    require("discord.js").version
                }\`\n> **MongoDB :** \`${
                    require("mongoose").version
                }\`\n> **Discord.js-Commands :** \`${
                    require("../../package.json").version
                }\``
            )
            .addFields([
                {
                    name: "Commandes",
                    value: `\`${commandAmount}\` chargées`,
                    inline: true,
                },
                {
                    name: "Serveurs",
                    value: `\`${guildAmount}\` connectés`,
                    inline: true,
                },
                {
                    name: "Utilisateurs",
                    value: `\`${userAmount}\` identifiés`,
                    inline: true,
                },
            ]);
        interaction.reply({ embeds: [Embed] });
    },
};
function switchTo(val) {
    var status = " ";
    switch (val) {
        case 0:
            status = "🔴 DÉCONNECTÉ";
            break;
        case 1:
            status = "🟢 CONNECTÉ";
            break;
        case 2:
            status = "🟠 EN COURS DE CONNEXION";
            break;
        case 3:
            status = "⚪ EN COURS DE DÉCONNEXION";
            break;
    }
    return status;
}
