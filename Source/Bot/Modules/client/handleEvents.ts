import { Client } from "discord.js";
import { DiscordEvent } from "../types/discord";
import { pathToFileURL } from "node:url";
import { loopDir } from "../generic/fileManager";

/// SETTINGS //////////////////////////////////////////////////

const eventPath: string = `./Source/Bot/Events` // event folder path

///////////////////////////////////////////////////////////////

export default async function handle(client: Client, csp?: string) {
    return loopDir({
        path: eventPath,

        validFileFunction: function (file: string, filePath: string) {

            void import(pathToFileURL(filePath).href).then((v: { default: DiscordEvent }) => {
                if (!v.default.name) return;

                if (v.default.once) {

                    client.once(v.default.name,
                        (...args) => v.default.run(...args)
                    )

                } else {

                    client.on(v.default.name,
                        (...args) => v.default.run(...args)
                    )

                }
            });

        }
    });
}