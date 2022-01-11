const { MessageEmbed } = require("discord.js");
const client = require("../../structures/index");

const status = (queue) =>
    `Volume: \`${queue.volume}%\` | Filtre: \`${
        queue.filters.join(", ") || "Désactivé"
    }\` | Boucle: \`${
        queue.repeatMode
            ? queue.repeatMode === 2
                ? "File d'attente"
                : "Musique"
            : "Désactive"
    }\` | Lecture automatique: \`${queue.autoplay ? "Activé" : "Désactive"}\``;
client.distube
    .on("playSong", (queue, song) =>
        queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription(
                        `🎶 | Lecture: \`${song.name}\` - \`${
                            song.formattedDuration
                        }\`\nDemandé par: ${song.user}\n${status(queue)}`
                    ),
            ],
        })
    )
    .on("addSong", (queue, song) =>
        queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription(
                        `🎶 | Ajout: ${song.name} - \`${song.formattedDuration}\` dans la file d'attente - Demandé par ${song.user}`
                    ),
            ],
        })
    )
    .on("addList", (queue, playlist) =>
        queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription(
                        `🎶 | Ajout: \`${playlist.name}\` playlist (${
                            playlist.songs.length
                        } musiques) dans la file d'attente \n${status(queue)}`
                    ),
            ],
        })
    )
    .on("error", (channel, err) => {
        channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription(
                        "⛔ Une erreur s'est produite lors de l'envoi de la commande."
                    ),
            ],
        });
        console.error(err);
    })
    .on("empty", (channel) =>
        channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription("Le salon vocal est vide."),
            ],
        })
    )
    .on("searchNoResult", (message) =>
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription("⛔ Aucun résultat trouvé."),
            ],
        })
    )
    .on("finish", (queue) =>
        queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("PURPLE")
                    .setDescription("Liste de lecture terminée."),
            ],
        })
    );
