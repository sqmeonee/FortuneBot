import { Client, REST, Routes } from "discord.js"
import { SlashCommand } from "../types/discord";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { loopDir } from "../generic/fileManager";

const commandsFolder = `./Bot/Commands`
const commands: any[] = [];

async function getCommands(client: Client, csp?: string) {
    const imports: Promise<any>[] = [];

    loopDir({
        path: csp || commandsFolder,

        isDirFunction: function(_, filePath : string) {
            imports.push(getCommands(client, filePath))
        },

        validFileFunction: function(_, filePath : string) {
            imports.push(
                import(pathToFileURL(filePath).href).then((v: { default: SlashCommand }) => {
                    if (!v.default.data || !v.default.run) {
                        console.log("[/] Command skipped (not finished): " + _);
                        return;
                    }

                    commands.push(v.default.data.toJSON());
                    client.commands.set(v.default.data.name, v.default);
                })
            );
        }
    })

    await Promise.all(imports);
}

export default async function handle(client : Client, data : { applyCommands : boolean, token? : string, app_id? : string }) {
    try {
        await getCommands(client)
        if (data.applyCommands) {
            const rest = new REST({ version : "10" }).setToken(data.token as string)
            rest.put(
                Routes.applicationCommands(data.app_id as string),
                { body: commands }
            )
        }

    } catch (err) {
        console.log(err);
    }
}