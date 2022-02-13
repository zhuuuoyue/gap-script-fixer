import { Document } from "gap-script";
import { Utils } from "gap-script-test";

import { Task } from "./task";
import { TaskForWallType } from "./wall";

class Tasks {
    private rootDir: string;
    private tasks: Task[];

    constructor(rootDir: string) {
        this.rootDir = rootDir;
        this.tasks = [];
    }

    addTask(task: Task): void {
        this.tasks.push(task);
    }

    run(): void {
        this.tasks.forEach((task) => {
            const jsFiles: string[] = Utils.getNativeJsFiles(this.rootDir);
            jsFiles.forEach((currentJsFile) => {
                let doc = new Document();
                doc.open(currentJsFile);

                task.setDocument(doc);
                task.run();

                doc.save();
            });
        });
    }
    
}

const rootDir: string = "C:\\Users\\zhuoy\\Desktop\\Single";
const tasks = new Tasks(rootDir);
tasks.addTask(new TaskForWallType());
tasks.run();