import { Document } from "gap-script";

export interface Task {
    setDocument(doc: Document): void;
    run(): void;
}