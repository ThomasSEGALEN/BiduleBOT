const {
    GuildMember,
    MessageAttachment,
    MessageEmbed,
    WebhookClient,
} = require("discord.js");
const { MemberID } = require("../../structures/config.json");
const Canvas = require("canvas");
const { registerFont } = require("canvas");
registerFont("./structures/fonts/BebasNeue-Regular.ttf", {
    family: "Bebas Neue",
});

module.exports = {
    name: "guildMemberAdd",
    /**
     *
     * @param {GuildMember} member
     */
    async execute(member) {
        const { user } = member;
        const userTag = user.tag;
        const userAvatar = user.avatarURL({ dynamic: true, size: 512 });
        const guildName = guild.name;
        const userCreatedTimestamp = parseInt(user.createdTimestamp / 1000);
        const guildMemberCount = guild.memberCount;
        const userId = user.id;
        member.roles.add(MemberID);
        const WelcomeWebhook = new WebhookClient({
            url: "https://discord.com/api/webhooks/903077243134304286/JHTosDHl1H4nS59uVy-4IZAjzx4zEoRv7GA56JOCBmj-zpGSi2I1arvmzFAndKdhCeSQ",
        });
        const canvas = Canvas.createCanvas(1024, 500);
        const ctx = canvas.getContext("2d");
        const background = await Canvas.loadImage(
            "./structures/images/welcome.jpg"
        );
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.font = '72px "Bebas Neue"';
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 10;
        ctx.fillText("BIENVENUE", 512, 360);
        ctx.beginPath();
        ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.font = '55px "Bebas Neue"';
        ctx.textAlign = "center";
        ctx.fillText(member.user.tag, 512, 410);
        ctx.font = '40px "Bebas Neue"';
        ctx.textAlign = "center";
        ctx.fillText(
            `Vous êtes le ${member.guild.memberCount}e membre !`,
            512,
            460
        );
        ctx.beginPath();
        ctx.arc(512, 166, 119, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({ format: "png", size: 1024 })
        );
        ctx.drawImage(avatar, 393, 47, 238, 238);
        const WelcomeCanvas = new MessageAttachment(
            canvas.toBuffer(),
            `welcome-${member.id}.png`
        );
        WelcomeWebhook.send({ files: [WelcomeCanvas] });
        const Webhook = new WebhookClient({
            id: "903078189629308950",
            token: "gYygFTO7Wmlm9wMi3rGHmaHM8an4J3gMml1ccABK-BTNC-6FScSk2rlxWRbmzcTuZxQR",
        });
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor(userTag, userAvatar)
            .setThumbnail(userAvatar)
            .setDescription(
                `${member} a rejoint **${guildName}**.\nDate de création: <t:${userCreatedTimestamp}:R>\nTotal de membres: **${guildMemberCount}**`
            )
            .setTimestamp()
            .setFooter(`ID: ${userId}`);
        Webhook.send({ embeds: [Embed] });
    },
};
