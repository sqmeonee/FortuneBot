import { readdirSync, statSync } from "node:fs";
import { DirData } from "../types/general";

export function isValidFile(file : string) : boolean {
    if (file.endsWith(".ts") || file.endsWith(".js")) {
        return true;
    }
    return false;
}

export function loopDir(data : DirData) {
    for (const file of readdirSync(data.path)) {
        const filePath = `${data.path}/${file}`;

        if (statSync(filePath).isDirectory()) {
            if (data.isDirFunction) {
                data.isDirFunction(file, filePath)
                continue;
            }
            
            loopDir({
                path: filePath,
                validFileFunction: data.validFileFunction
            })
        }

        if (isValidFile(file) && data.validFileFunction) {
            data.validFileFunction(file, filePath)
        }
    }
}