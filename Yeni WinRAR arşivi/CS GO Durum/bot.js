var bigInt = require("big-integer");
var SteamIDConverter = {

  BASE_NUM: bigInt("76561197960265728"), // "V" in the conversion algorithms

  REGEX_STEAMID64: /^[0-9]{17}$/,
  REGEX_STEAMID:   /^STEAM_[0-5]:[01]:\d+$/,
  REGEX_STEAMID3:  /^\[U:1:[0-9]+\]$/,

  /**
   * Generate a SteamID64 from a SteamID or SteamID3
   */
  toSteamID64: function(steamid) {
      if(!steamid || typeof steamid !== "string") {
          return false;
      }
      else if(this.isSteamID3(steamid)) {
          steamid = this.fromSteamID3(steamid);
      }
      else if(!this.isSteamID(steamid)) {
          throw new TypeError("Parameter must be a SteamID (e.g. STEAM_0:1:912783)");
      }

      var split = steamid.split(":"),
          v = this.BASE_NUM,
          z = split[2],
          y = split[1];

      if(z && y) {
          return v.plus(z*2).plus(y).toString();
      }
      return false;
  },

  /**
   * Generate a SteamID from a SteamID64 or SteamID3
   */
  toSteamID: function(steamid64) {
      if(!steamid64 || typeof steamid64 !== "string") {
          return false;
      }
      else if(this.isSteamID3(steamid64)) {
          return this.fromSteamID3(steamid64);
      }
      else if(!this.isSteamID64(steamid64)) {
          throw new TypeError("Parameter must be a SteamID64 (e.g. 76561190000000000)");
      }

      var v = this.BASE_NUM,
          w = bigInt(steamid64),
          y = w.mod(2).toString();

      w = w.minus(y).minus(v);

      if(w < 1) {
          return false;
      }
      return "STEAM_0:" + y + ":" + w.divide(2).toString();
  },

  /**
   * Generate a SteamID3 from a SteamID or SteamID64
   */
  toSteamID3: function(steamid) {
      if(!steamid || typeof steamid !== "string") {
          return false;
      }
      else if(!this.isSteamID(steamid)) {
          steamid = this.toSteamID(steamid);
      }

      var split = steamid.split(":");

      return "[U:1:" + (parseInt(split[1]) + parseInt(split[2]) * 2) + "]";
  },

  /**
   * Generate a SteamID from a SteamID3.
   */
  fromSteamID3: function(steamid3) {
      var split = steamid3.split(":");
      var last  = split[2].substring(0, split[2].length - 1);

      return "STEAM_0:" + (last % 2) + ":" + Math.floor(last / 2);
  },

  // ------------------------------------------------------------------------------

  isSteamID: function(id) {
      if(!id || typeof id !== "string") {
          return false;
      }
      return this.REGEX_STEAMID.test(id);
  },

  isSteamID64: function(id) {
      if(!id || typeof id !== "string") {
          return false;
      }
      return this.REGEX_STEAMID64.test(id);
  },

  isSteamID3: function(id) {
      if(!id || typeof id !== "string") {
          return false;
      }
      return this.REGEX_STEAMID3.test(id);
  },

  // ------------------------------------------------------------------------------

  profileURL: function(steamid64) {        
      if(!this.isSteamID64(steamid64)) {
          steamid64 = this.toSteamID64(steamid64);
      }
      return "http://steamcommunity.com/profiles/" + steamid64;
  }
};
const Discord = require("discord.js");//Coded ByRoa
const client = new Discord.Client();//Coded ByRoa
const ayarlar = require("./ayarlar.json");//Coded ByRoa
const chalk = require("chalk");//Coded ByRoa
const fs = require("fs");//Coded ByRoa
const moment = require("moment");//Coded ByRoa
const Jimp = require("jimp");//Coded ByRoa
const db = require("quick.db");//Coded ByRoa
var prefix = ayarlar.prefix;//Coded ByRoa

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
  
};
const SteamAPI = require('steamapi');
const steam = new SteamAPI('');
client.on('message', message => {
  if (message.content.startsWith('/steam')) {
    let args = message.content.split(' ').slice(1);
    if (!args[0]) return message.reply('Bir steam URL\'si gir!');
    message.reply('bilgiler toplanıyor..');
    steam.resolve(args[0]).then(id => {
      steam.getUserSummary(id).then(summary => {
            message.reply(summary.nickname + " adlı kullanıcının steam IDsi: ["+SteamIDConverter.toSteamID(summary.steamID.toString())+"]\nHesap URLsi: ("+summary.url+")");
      });
    });
  }
});

////////////////////////////////////////////

client.on("message", async(message) => {
if(message.content === "!dc") {
message.channel.send('https://discord.gg/hypejb')
}
})
//
client.on("message", async(message) => {
if(message.content === "!ip") {
message.channel.send('IP adresimiz; 185.193.165.30 \nTıkla Bağlan; steam://connect/185.193.165.30:27015');
}
})
//
client.on("message", async(message) => {
if(message.content === "!grup") {
message.channel.send('__Steam Topluluğumuz__\nhttps://steamcommunity.com/groups/hypecsot')
}
})
//
client.on("message", async(message) => {
  if(message.content === "!aktif") {
  message.channel.send('Hype Jailbreak Sunucumuz Aktif | İP : steam://connect/185.193.165.30:27015 | Lütfen Müsait Olan Üyelerimiz Ve Yetkililerimiz Sunucuya Girebilirmi.')
  }
  })
////////////////////////////////////////////


////////////////////////////////////////////


////////////////////////////////////////////


////////////// KOMUTLAR SON
////////////// ALTI ELLEME
require("./util/eventLoader")(client);


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


client.login(ayarlar.token)
