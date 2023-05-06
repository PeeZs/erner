const Discord = require('discord.js');
const client = new Discord.Client();
const Gamedig = require('gamedig');
const moment = require("moment");
moment.locale("tr")


exports.run = async function(client, message, args) {

  function GetTime(ms) {
    ms *= 1000;
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    return `${hrs.padStart(2, `0`)}:${min.padStart(2, `0`)}:${sec.padStart(2, `0`)}` 
  } // Zaman Fonksiyonu Tekrar Düzeltme Yapılacak!!!!

  let ipabs = "185.193.165.30"
  let port = "27015"
Gamedig.query({
type: 'csgo',
host: ipabs, 
}).then((state) => {

  const message1 = new Discord.MessageEmbed()
  .setColor('WHİTE')
  .setAuthor(state.name, client.user.avatarURL())
  .addField(`🗺️ Harita`,`\`\`\`${state.map}\`\`\``)
  .addField(`👥 Oyuncular`,`\`\`\`${state.players.length}/${state.maxplayers}\`\`\``)
  .addFields({ name: ` :bow_and_arrow: Oyuncu Listesi [${state.players.length}]`, value: `\`\`\`${state.players.map((x, y) => `${y + 1}- ${x.name} `).join("\n")  || "-"}\`\`\``, inline: true})
  .addFields({ name: ` :dart: Skorlar [${state.players.length}]`, value: `\`\`\`${state.players.map((x, y) => `${y + 1}- ${x.raw.score}`).join("\n")  || "-"}\`\`\``, inline: true})
  .addFields({ name: ` :stopwatch: Süreler [${state.players.length}]`, value: `\`\`\`${state.players.map((x, y) => `${y + 1}- ${GetTime(x.raw.time)}`).join("\n")  || "-"}\`\`\``, inline: true})
  .setImage("https://cdn.discordapp.com/attachments/1071021738013499422/1071180847601958963/BANNER2.png") 
  message.channel.send(message1)


}).catch((error) => {
console.log(error);
});
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['oyuncular'],
  permLevel: 0
};

exports.help = {
  name: 'oyuncular',
  description: 'CS:GO Sunucusunun durumunu gösterir.',
  usage: 'Oyuncular'
};

