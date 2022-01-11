const { ContextMenuInteraction } = require("discord.js");

module.exports = {
    name: "Avatar",
    type: "USER",
    context: true,
    permission: "SEND_MESSAGES",
    /**
     *
     * @param {ContextMenuInteraction} interaction
     */
    async execute(interaction) {
        const User = await interaction.guild.members.fetch(
            interaction.targetId
        );
        const userAvatar = User.user.avatarURL({ dynamic: true, size: 512 });
        await interaction.reply(userAvatar);
    },
};
