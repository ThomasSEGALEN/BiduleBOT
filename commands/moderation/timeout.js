const {
    CommandInteraction,
    MessageEmbed,
    WebhookClient,
} = require("discord.js");
const { StaffID } = require("../../structures/config.json");
const ms = require("ms");

module.exports = {
    name: "timeout",
    description: "Réduire au silence un utilisateur",
    permission: "MUTE_MEMBERS",
    options: [
        {
            name: "user",
            description: "Choisir un utilisateur",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "Fournir une raison",
            type: "STRING",
            required: true,
        },
        {
            name: "preset-time",
            description: "Choisir un temps prédéfini",
            type: "STRING",
            required: false,
            choices: [
                {
                    name: "1 hour",
                    value: "1h",
                },
                {
                    name: "1 day",
                    value: "1d",
                },
                {
                    name: "7 days",
                    value: "7d",
                },
            ],
        },
        {
            name: "custom-time",
            description: "Choisir un temps à définir",
            type: "STRING",
            required: false,
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const User = interaction.options.getMember("user");
        const Time =
            interaction.options.getString("preset-time") ||
            interaction.options.getString("custom-time") ||
            "end";
        const Reason = interaction.options.getString("reason");
        const Logger = new WebhookClient({
            id: "903078189629308950",
            token: "gYygFTO7Wmlm9wMi3rGHmaHM8an4J3gMml1ccABK-BTNC-6FScSk2rlxWRbmzcTuZxQR",
        });
        const userTag = User.user.tag;
        const userAvatar = User.user.avatarURL({ dynamic: true, size: 512 });
        const userId = User.id;
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor(`${userTag}`, userAvatar)
            .setDescription(
                `L'utilisateur ${User} a été mis en **sourdine** pendant **${Time}**.\nRaison: ${Reason}.`
            )
            .setTimestamp()
            .setFooter(`ID: ${userId}`);
        if (User.roles.cache.find((r) => r.id === StaffID))
            return interaction.reply({
                content:
                    "Vous ne pouvez pas mettre en sourdine un membre du Staff.",
                ephemeral: true,
            });
        if (ms(Time) < 1000 || ms(Time) > 2419200000)
            return interaction.reply({
                content:
                    "La durée de mise en sourdine doit être comprise entre 1 seconde et 28 jours.",
                ephemeral: true,
            });
        if (
            !User.isCommunicationDisabled() ||
            (User.isCommunicationDisabled() && Time !== "end")
        ) {
            await User.timeout(ms(Time), Reason);
        } else {
            await User.timeout(null);
            Embed.setDescription(
                `La mise en **sourdine** de l'utilisateur ${User} a été **révoquée**.\nRaison: ${Reason}.`
            );
        }
        Logger.send({ embeds: [Embed] });
        interaction.reply({ embeds: [Embed], ephemeral: true });
    },
};
