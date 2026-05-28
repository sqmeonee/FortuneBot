import { ChatInputCommandInteraction, Client, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { DefaultColor } from "../../Data/defaults.json";

export default {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),

    async run (client: Client, interaction: ChatInputCommandInteraction) {
        await interaction.reply({ 
            embeds: [{
                color: Number(DefaultColor),
                description: `
                    🏓 Pong!
                    📨 Messages: \` ${client.ws.ping}ms \`    
                `
            }] 
        })
    }
}