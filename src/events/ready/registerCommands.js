const { REST, Routes } = require("discord.js");
require('dotenv').config();

const { testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client);

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find((cmd) => cmd.name === name);

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`🗑 Deleted command "${name}".`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(`🔄 Edited command "${name}".`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(`⏩ Skipping registering command "${name}" as it's set to delete.`);
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        })

        console.log(`👍 Registered command "${name}.`);
      }
    }
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }


  // try {
  //   const localCommands = getLocalCommands();
  //   const applicationCommands = await getApplicationCommands(client);

  //   for (const localCommand of localCommands) {
  //     const { name, description, options } = localCommand;

  //     const existingCommand = await applicationCommands.cache.find(cmd => cmd.name === name);

  //     if (existingCommand) {
  //       if (localCommand.deleted) {
  //         await rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, existingCommand.id))
  //           .then(() => console.log(`🗑 Deleted command "${name}".`))
  //           .catch(console.error);
  //       }

  //       if (areCommandsDifferent(existingCommand, localCommand)) {
  //         await rest.put(Routes.applicationCommand(process.env.CLIENT_ID), { body: localCommand })
  //           .then(() => console.log(`🔄 Edited command "${name}".`))
  //           .catch(console.error);
  //       }
  //     } else {
  //       if (localCommand.deleted) {
  //         console.log(`⏩ Skipping registering command "${name}" as it's set to delete.`);
  //         continue;
  //       }

  //       await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: localCommands })
  //         .then(() => console.log(`👍 Registered command "${name}.`))
  //         .catch(console.error);
  //     }

  //   }

  // } catch (error) {
  //   console.log(`There was an error: ${error}`);
  // }


};