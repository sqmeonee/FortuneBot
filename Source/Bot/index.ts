import { Client } from "discord.js";
import dotenv from "dotenv";
import { Load } from "./Modules/generic/terminalConfig.js";

dotenv.config({ path: "./Data/storage.env" })

//// Variables /////

const loader : Load = new Load()
const nodeArgs : string[] = process.argv.slice(2)

///////////////////

// stop if no token / app id
if (!process.env.token || !process.env.appid) throw new Error("No token or application ID provided in storage.env");

// Create client
const client: Client = await import("./Modules/client/handleClient.js").then(async (module) => { 
    loader.startLoading("Creating client");
    const c = await module.default(true);
    loader.stopLoading("Client created");

    return c;
});

// Load command handler if prompted
void await import("./Modules/client/handleCommands.js").then(async (module) => {
    loader.startLoading("Configuring commands");
    await module.default(client, {
        applyCommands: nodeArgs.includes("cmd") && true || false,
        token: process.env.token as unknown as string,
        app_id: process.env.appid as unknown as string
    });
    return loader.stopLoading(`Commands configured ${nodeArgs.includes("cmds") && "[ Routed to bot ]" || " "}`);
});

// Load event handler
void await import("./Modules/client/handleEvents.js").then(async (module) => {
    loader.startLoading("Configuring events");
    await module.default(client);
    loader.stopLoading("Events configured");
});