const { GuildMember, MessageAttachment, MessageEmbed } = require("discord.js");
const Canvas = require("canvas");

module.exports = {
    name: "guildMemberUpdate",
    /**
     *
     * @param {GuildMember} oldMember
     * @param {GuildMember} newMember
     */
    async execute(oldMember, newMember) {
        const { guild } = newMember;
        const guildIcon = guild.iconURL({ dynamic: true, size: 512 });
        const Embed = new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor("SERVEUR BOOST", guildIcon);
        if (!oldMember.premiumSince && newMember.premiumSince) {
            const canvas = Canvas.createCanvas(800, 250);
            const ctx = canvas.getContext("2d");
            const background = await Canvas.loadImage(
                "./structures/images/nitro.png"
            );
            const avatar = await Canvas.loadImage(
                newMember.user.displayAvatarURL({ format: "jpg" })
            );
            const attachment = new MessageAttachment(
                canvas.toBuffer(),
                "nitro.png"
            );
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#985986";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = "38px cursive";
            ctx.textAlign = "center";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(
                newMember.displayName,
                canvas.width / 2,
                canvas.height / 1.2
            );
            ctx.beginPath();
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 25, 25, 200, 200);
            Embed.setDescription("Merci d'avoir boost le serveur !");
            Embed.setImage("attachment://nitro.png");
            guild.systemChannel
                .send({
                    embeds: [Embed],
                    files: [attachment],
                })
                .catch((err) => console.log(err));
        }
    },
};
