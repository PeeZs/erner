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
  .setColor('WHITE')
  .setAuthor('💖 Hype JailBreak Sunucusu', client.user.avatarURL())
  .addField(`📍 ・ GameTracker Linki`,'\`\`\`⧼ https://www.gametracker.com/server_info/185.193.165.30:27015/ ⧽\`\`\`')
  .setImage('https://cdn.discordapp.com/attachments/1059223023384809512/1070166545663279174/BANNER2.png')
  .setFooter('💖 https://discord.gg/hypejb')


  message.channel.send(message1)


}).catch((error) => {
console.log(error);
});
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['dc'],
  permLevel: 0
};

exports.help = {
  name: 'gt',
  description: 'CS:GO Sunucusunun durumunu gösterir.',
  usage: 'gt'
};

