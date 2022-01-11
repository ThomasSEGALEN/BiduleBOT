const { CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "giveaway",
    description: "Système de giveaway",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "start",
            description: "Créer un giveaway",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "duration",
                    description: "Fournir une durée",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "winners",
                    description: "Choisir le nombre de gagnants",
                    type: "INTEGER",
                    required: true,
                },
                {
                    name: "prize",
                    description: "Fournir un prix",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "channel",
                    description: "Choisir le salon",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"],
                    required: false,
                },
            ],
        },
        {
            name: "actions",
            description: "Options du giveaway",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "messageid",
                    description: "Fournir l'identifiant du giveaway",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "options",
                    description: "Choisir une option",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "end",
                            value: "end",
                        },
                        {
                            name: "pause",
                            value: "pause",
                        },
                        {
                            name: "unpause",
                            value: "unpause",
                        },
                        {
                            name: "reroll",
                            value: "reroll",
                        },
                        {
                            name: "delete",
                            value: "delete",
                        },
                    ],
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
        const { options } = interaction;
        const Sub = options.getSubcommand();

        switch (Sub) {
            case "start":
                {
                    const giveawayDuration = options.getString("duration");
                    const giveawayWinnerCount = options.getInteger("winners");
                    const giveawayPrize = options.getString("prize");
                    const giveawayChannel =
                        options.getChannel("channel") || interaction.channel;
                    const giveawayHostedBy = interaction.user;
                    const successEmbed = new MessageEmbed().setColor("PURPLE");
                    const errorEmbed = new MessageEmbed().setColor("PURPLE");
                    client.giveawaysManager
                        .start(giveawayChannel, {
                            duration: ms(giveawayDuration),
                            winnerCount: giveawayWinnerCount,
                            prize: giveawayPrize,
                            hostedBy: giveawayHostedBy,
                            messages: {
                                giveaway: "🎉 **GIVEAWAY EN COURS** 🎉",
                                giveawayEnded: "🎊 **GIVEAWAY TERMINÉ** 🎊",
                                winMessage:
                                    "Félicitation, {winners}! Vous avez gagné **{this.prize}**!",
                            },
                        })
                        .then(async () => {
                            successEmbed.setDescription(
                                "Le giveaway a débuté avec succès. 🎉"
                            );
                            return interaction.reply({
                                embeds: [successEmbed],
                                ephemeral: true,
                            });
                        })
                        .catch((err) => {
                            errorEmbed.setDescription(
                                `Une erreur s'est produite:\n\`${err}\`.`
                            );
                            return interaction.reply({
                                embeds: [errorEmbed],
                                ephemeral: true,
                            });
                        });
                }
                break;
            case "actions":
                {
                    const choice = options.getString("options");
                    const messageId = options.getString("messageid");
                    const giveaway = client.giveawaysManager.giveaways.find(
                        (g) =>
                            g.guildId === interaction.guildId &&
                            g.messageId === messageId
                    );
                    if (!giveaway) {
                        errorEmbed.setDescription(
                            `L'identifiant \`${messageId}\` est invalide.`
                        );
                        return interaction.reply({
                            embeds: [errorEmbed],
                            ephemeral: true,
                        });
                    }
                    switch (choice) {
                        case "end":
                            {
                                client.giveawaysManager
                                    .end(messageId)
                                    .then(() => {
                                        successEmbed.setDescription(
                                            "Le giveaway est terminé."
                                        );
                                        return interaction.reply({
                                            embeds: [successEmbed],
                                            ephemeral: true,
                                        });
                                    })
                                    .catch((err) => {
                                        errorEmbed.setDescription(
                                            `Une erreur s'est produite:\n\`${err}\`.`
                                        );
                                        return interaction.reply({
                                            embeds: [errorEmbed],
                                            ephemeral: true,
                                        });
                                    });
                            }
                            break;
                        case "pause":
                            {
                                client.giveawaysManager
                                    .pause(messageId)
                                    .then(() => {
                                        successEmbed.setDescription(
                                            "Le giveaway est en pause."
                                        );
                                        return interaction.reply({
                                            embeds: [successEmbed],
                                            ephemeral: true,
                                        });
                                    })
                                    .catch((err) => {
                                        errorEmbed.setDescription(
                                            `Une erreur s'est produite:\n\`${err}\`.`
                                        );
                                        return interaction.reply({
                                            embeds: [errorEmbed],
                                            ephemeral: true,
                                        });
                                    });
                            }
                            break;
                        case "unpause":
                            {
                                client.giveawaysManager
                                    .unpause(messageId)
                                    .then(() => {
                                        successEmbed.setDescription(
                                            "Le giveaway reprend."
                                        );
                                        return interaction.reply({
                                            embeds: [successEmbed],
                                            ephemeral: true,
                                        });
                                    })
                                    .catch((err) => {
                                        errorEmbed.setDescription(
                                            `Une erreur s'est produite:\n\`${err}\`.`
                                        );
                                        return interaction.reply({
                                            embeds: [errorEmbed],
                                            ephemeral: true,
                                        });
                                    });
                            }
                            break;
                        case "reroll":
                            {
                                client.giveawaysManager
                                    .reroll(messageId)
                                    .then(() => {
                                        successEmbed.setDescription(
                                            "Le giveaway est relancé."
                                        );
                                        return interaction.reply({
                                            embeds: [successEmbed],
                                            ephemeral: true,
                                        });
                                    })
                                    .catch((err) => {
                                        errorEmbed.setDescription(
                                            `Une erreur s'est produite:\n\`${err}\`.`
                                        );
                                        return interaction.reply({
                                            embeds: [errorEmbed],
                                            ephemeral: true,
                                        });
                                    });
                            }
                            break;
                        case "delete":
                            {
                                client.giveawaysManager
                                    .delete(messageId)
                                    .then(() => {
                                        successEmbed.setDescription(
                                            "Le giveaway est supprimé."
                                        );
                                        return interaction.reply({
                                            embeds: [successEmbed],
                                            ephemeral: true,
                                        });
                                    })
                                    .catch((err) => {
                                        errorEmbed.setDescription(
                                            `Une erreur s'est produite:\n\`${err}\`.`
                                        );
                                        return interaction.reply({
                                            embeds: [errorEmbed],
                                            ephemeral: true,
                                        });
                                    });
                            }
                            break;
                    }
                }
                break;
        }
    },
};
