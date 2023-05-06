const Discord = require('discord.js');//Coded ByRoa
const moment = require('moment');//Coded ByRoa
const chalk = require('chalk');//Coded ByRoa
const { prefix } = require('../ayarlar.json')//Coded ByRoa
const Gamedig = require('gamedig');

module.exports = client => {
  var interval = setInterval(function () {
    let ipabs = "185.193.165.36"
      let port = "27015"
      Gamedig.query({
        type: 'csgo',
        host: ipabs, 
      }).then((state) => {


        client.user.setActivity(`🗺️・${state.map} | ${state.players.length}/${state.maxplayers}`);

      }).catch((error) => {
        console.log(error);
      });
  }, 30000);
         
  
  client.user.setStatus("dnd"); //dnd, idle, online, offline
  
}

console.log