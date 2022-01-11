const { CommandInteraction, MessageEmbed } = require("discord.js");

const answers = ["Pile", "Face"];

module.exports = {
    name: "coinflip",
    description: "Pile ou face",
    permission: "SEND_MESSAGES",
    required: true,
    options: [
        {
            name: "bet",
            description: "Pile ou face",
            type: "STRING",
            choices: [
                {
                    name: "pile",
                    value: "Pile",
                },
                {
                    name: "face",
                    value: "Face",
                },
            ],
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { options } = interaction;
        const Bet = options.getString("bet");
        const coin = answers[Math.floor(Math.random() * answers.length)];
        const Embed = new MessageEmbed();
        switch (Bet) {
            case "Pile": {
                if (coin === "Pile") {
                    Embed.setTitle(`Mise sur ${Bet} 💸`)
                        .setDescription(
                            `La pièce est tombée sur ${coin}. Vous gagnez le pari.`
                        )
                        .setColor("GREEN");
                } else {
                    Embed.setTitle(`Mise sur ${Bet} 💸`)
                        .setDescription(
                            `La pièce est tombée sur ${coin}. Vous perdez le pari.`
                        )
                        .setColor("RED");
                }
                return interaction.reply({ embeds: [Embed] });
            }
            case "Face": {
                if (coin === "Face") {
                    Embed.setTitle(`Mise sur ${Bet} 💸`)
                        .setDescription(
                            `La pièce est tombée sur ${coin}. Vous gagnez le pari.`
                        )
                        .setColor("GREEN");
                } else {
                    Embed.setTitle(`Mise sur ${Bet} 💸`)
                        .setDescription(
                            `La pièce est tombée sur ${coin}. Vous perdez le pari.`
                        )
                        .setColor("RED");
                }
                return interaction.reply({ embeds: [Embed] });
            }
        }
    },
};
