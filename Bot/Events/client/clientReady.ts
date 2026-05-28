import { Client, Events } from "discord.js";

export default {
    name: Events.ClientReady,
    
    async run (client: Client) {
        console.log(`[=== ${client.user?.username} | Online ===]`);
    }
}