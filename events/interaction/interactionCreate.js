const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            const errorEmbed = new MessageEmbed()
                .setColor("PURPLE")
                .setDescription(
                    "⛔ Une erreur s'est produite lors de l'envoi de la commande."
                );
            if (!command)
                return await (interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true,
                }) && client.commands.delete(interaction.commandName));
            command.execute(interaction, client);
        }
    },
};
