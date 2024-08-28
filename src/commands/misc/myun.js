module.exports = {
  name: "myun",
  description: "Myun...?",
  //devOnly: Boolean,
  //testOnly: Boolean,
  //options: Object[],
  //deleted: Boolean,

  callback: (client, interaction) => {
    interaction.reply(`Myun! ${client.ws.ping}ms`);
  }
}