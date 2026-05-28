export class Load {
    private frames : string[] = ["|", "/", "-", "\\"];
    private interval? : NodeJS.Timeout;
    private i : number = 0;

    private clearLine() {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
    }

    startLoading(text : string = "Loading...") {
        this.interval = setInterval(() => {
            this.clearLine();
            process.stdout.write(
                `\r[${this.frames[this.i++ % this.frames.length]}] ${text}                                               `
            )
        }, 100);
    }

    stopLoading(text : string = "Loading complete!", success : boolean = true) {
        if (this.interval) {
            clearInterval(this.interval)
            
            this.clearLine();
            process.stdout.write(
                `\r[${success && "✓" || "✕"}] ${text}                                               \n`
            );
        }
    }
}