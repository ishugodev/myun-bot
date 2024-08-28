const { messages } = require("../../../config.json");

module.exports = (client, message) => {
  replyMessages(message);
}

function replyMessages(_message) {
  try {
    if (_message.author.bot) {
      return;
    }

    const filteredMessage = messages.find(item => (item.message).toLowerCase() === (_message.content).toLowerCase());

    if (!filteredMessage) {
      return;
    }

    _message.reply(filteredMessage.reply);

  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
}