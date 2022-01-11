const {
    GuildMember,
    MessageAttachment,
    MessageEmbed,
    WebhookClient,
} = require("discord.js");
const Canvas = require("canvas");
const { registerFont } = require("canvas");
registerFont("./structures/fonts/BebasNeue-Regular.ttf", {
    family: "Bebas Neue",
});

module.exports = {
    name: "guildMemberRemove",
    /**
     *
     * @param {GuildMember} member
     */
    async execute(member) {
        const { user, guild } = member;
        const userTag = user.tag;
        const userAvatar = user.avatarURL({ dynamic: true, size: 512 });
        const guildName = guild.name;
        const userJoinedTimestamp = parseInt(member.joinedTimestamp / 1000);
        const guildMemberCount = guild.memberCount;
        const userId = user.id;
        const GoodbyeWebhook = new WebhookClient({
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
        ctx.shadowBlur = 15;
        ctx.fillText("AU REVOIR", 512, 360);
        ctx.beginPath();
        ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.font = '55px "Bebas Neue"';
        ctx.textAlign = "center";
        ctx.fillText(member.user.tag, 512, 410);
        ctx.beginPath();
        ctx.arc(512, 166, 119, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({ format: "png", size: 1024 })
        );
        ctx.drawImage(avatar, 393, 47, 238, 238);
        const GoodbyeCanvas = new MessageAttachment(
            canvas.toBuffer(),
            `goodbye-${member.id}.png`
        );
        GoodbyeWebhook.send({ files: [GoodbyeCanvas] });
        const Webhook = new WebhookClient({
            id: "903078189629308950",
            token: "gYygFTO7Wmlm9wMi3rGHmaHM8an4J3gMml1ccABK-BTNC-6FScSk2rlxWRbmzcTuZxQR",
        });
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor(userTag, userAvatar)
            .setThumbnail(userAvatar)
            .setDescription(
                `${member} a quitté **${guildName}**.\nDate d'arrivée: <t:${userJoinedTimestamp}:R>\nTotal de membres: **${guildMemberCount}**`
            )
            .setTimestamp()
            .setFooter(`ID: ${userId}`);
        Webhook.send({ embeds: [Embed] });
    },
};
