const { CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "emit",
    description: "Émettre un événement",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "event",
            description: "Événement à émettre",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "guildMemberAdd",
                    value: "guildMemberAdd",
                },
                {
                    name: "guildMemberRemove",
                    value: "guildMemberRemove",
                },
            ],
        },
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        const { member } = interaction;
        const choices = interaction.options.getString("member");
        switch (choices) {
            case "guildMemberAdd":
                {
                    client.emit("guildMemberAdd", member);
                    interaction.reply({
                        content: "Événement emis.",
                        ephemeral: true,
                    });
                }
                break;
            case "guildMemberRemove":
                {
                    client.emit("guildMemberRemove", member);
                    interaction.reply({
                        content: "Événement emis.",
                        ephemeral: true,
                    });
                }
                break;
        }
    },
};
