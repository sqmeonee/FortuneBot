import { BaseInteraction, Client, Events } from "discord.js";
import { SlashCommand } from "../../Modules/types/discord";

export default {
    name: Events.InteractionCreate,
    
    async run (interaction : BaseInteraction) {
        if (!interaction.isChatInputCommand()) return;


        
        try {
            const cmd : SlashCommand = interaction.client.commands.get(interaction.commandName);

            if (!cmd.data || !cmd.run) return;

            cmd.run(interaction.client, interaction);
        } catch (err) {
            console.log(err)
            await interaction.followUp("We ran into an error with this interaction! Try again.")
        }
    }
}