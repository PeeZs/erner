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
  }
  let ipabs = "185.193.165.30"
  let port = "27015"
Gamedig.query({
type: 'csgo',
host: ipabs, 
}).then((state) => {


  const message1 = new Discord.MessageEmbed()
  .setColor('PURPLE')
  .setAuthor(state.name, client.user.avatarURL())
  .addField(`🗺️ Harita`,state.map)
  .addField(`👥 Oyuncular`,`\`\`\`${state.players.length}/${state.maxplayers}\`\`\``, true)
  .addField('📍 IP - Tıkla Bağlan',"185.193.165.30 - steam://connect/185.193.165.30:27015")

  message.channel.send(message1)


}).catch((error) => {
console.log(error);
});
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['jb'],
  permLevel: 0
};

exports.help = {
  name: 'jb',
  description: 'CS:GO Sunucusunun durumunu gösterir.',
  usage: 'jb'
};

