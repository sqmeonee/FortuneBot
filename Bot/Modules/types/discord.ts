import { Collection, SlashCommandBuilder } from "discord.js";

declare module "discord.js" {
    export interface Client {
        cooldowns: Collection<string, any>;

        commands: Collection<string, any>;        
        buttons: Map<string, any>;
        modals: Map<string, any>;
        selectMenus: Map<string, any>;
    }
}

interface Executable {
    run: (...args: any[]) => void
}

export interface DiscordEvent extends Executable {
    name: string;
    once?: boolean;
}

export interface SlashCommand extends Executable {
    data: SlashCommandBuilder;
    cooldown: number;
}

export interface Interaction extends Executable {
    name: string,
    id: string,
    goto: string,
}