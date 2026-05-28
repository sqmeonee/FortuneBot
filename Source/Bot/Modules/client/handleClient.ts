import { Client, GatewayIntentBits, Collection } from "discord.js";

const client = new Client({
    intents: Object.keys(GatewayIntentBits).map(key => GatewayIntentBits[key as keyof typeof GatewayIntentBits])
})

client.cooldowns = new Collection();
client.commands = new Collection();
client.buttons = new Map();
client.modals = new Map();
client.selectMenus = new Map();

export default async function getClient(login: boolean) {
    if (login == true) {
        client.login(process.env.TOKEN);
    }
    
    return client;
};
