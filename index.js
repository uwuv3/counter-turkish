const { Client } = require("discord.js");
const client = new Client();
client.kanal = " kanalın idsi"

const db = require("quick.db")

client.on("message", async (message) => {
  if (message.author.bot) return;
  let kanal = client.channels.cache.get(client.kanal)
  if (message.channel.id !== kanal.id) return;
  let channel = message.channel;
  let count = db.fetch(`counter`);
  if (count === null) count = db.set(`counter`, {
    number: 0,
    author: client.user.id
  });
  if (!message.author.bot && message.author.id === count.author) {
    message.delete();
    message.reply("Lütfen sıranı bekle").then(m => m.delete({ timeout: 5000 }));
    return;
  } 

  if (!message.author.bot && isNaN(message.content)) {
    message.delete();
    message.reply("Sadece sayı içerir").then(m => m.delete({ timeout: 5000 }));
    return;
  }
  if (!message.author.bot && parseInt(message.content) !== count.number + 1) {
    message.delete();
    message.reply(`Sonraki sayı **${count.number + 1}**`).then(m => m.delete({ timeout: 5000 }));
    return;
  }
  db.set(`counter`, { number: count.number + 1, author: message.author.id });

})


client.on("ready", () => {
  client.user.setStatus("dnd");

  setInterval(() => { let count = db.fetch(`counter`); 
                     if (count === null) count = db.set(`counter`, {
    number: 0,
    author: client.user.id
  });
                     client.user.setActivity(`Sonraki sayı >> ${count.number + 1}`); }, 500)
})


client.login(process.env.token)
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Bruh')
});

app.listen(3000);
