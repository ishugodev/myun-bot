const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "add",
  description: "Adds two numbers.",
  options: [
    {
      name: "first-number",
      description: "The first number.",
      type: ApplicationCommandOptionType.Number,
      required: true
    },
    {
      name: "second-number",
      description: "The second number.",
      type: ApplicationCommandOptionType.Number,
      required: true
    }
  ],

  callback: (client, interaction) => {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;
    interaction.reply(`${num1} mais ${num2} é igual a ${num1 + num2}, myun...`);
  }
}