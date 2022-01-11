const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Supprimer des messages en masse",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "amount",
            description: "Choisir le montant de messages",
            type: "NUMBER",
            required: true,
        },
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
        const { channel, options } = interaction;
        const Amount = options.getNumber("amount");
        const User = options.getMember("user");
        const Messages = await channel.messages.fetch();
        const Embed = new MessageEmbed().setColor("PURPLE");
        if (User) {
            const userId = User.user.id;
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if (m.author.id === userId && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            });
            await channel.bulkDelete(filtered, true).then((messages) => {
                Embed.setDescription(
                    `💥 Suppression de ${
                        messages.size === 0 ? "1" : messages.size
                    } message(s) envoyé(s) par ${User}.`
                );
            });
        } else {
            await channel.bulkDelete(Amount, true).then((messages) => {
                Embed.setDescription(
                    `💥 Suppression de ${
                        messages.size === 0 ? "1" : messages.size
                    } message(s) envoyé(s) dans ce salon.`
                );
            });
        }
        interaction.reply({ embeds: [Embed], ephemeral: true });
    },
};
