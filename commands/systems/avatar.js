const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Afficher l'avatar d'un utilisateur",
    permisson: "SEND_MESSAGES",
    options: [
        {
            name: "user",
            description: "Choisir un utilisateur",
            type: "USER",
            required: false,
        },
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { options } = interaction;
        const User = options.getMember("user") || interaction.member;
        const userAvatar = User.user.avatarURL({ dynamic: true, size: 512 });
        await interaction.reply(userAvatar);
    },
};
