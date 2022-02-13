import { Document, ILine, ParameterizedLine, RawLine } from "gap-script";

type LineGroup = ILine[];

export class Utils {
    static splitLines(doc: Document): LineGroup[] {
        let separators: number[] = [0];
        doc.lines.forEach((line, index) => {
            if (line instanceof ParameterizedLine) {
                if (line.module === "JrnCmd" && line.lineType === "ProcessCommand") {
                    if (line.parameters[0].value !== `"gm.view.navigate"`) {
                        separators.push(index);
                    }
                }
            }
        });
        separators.push(doc.lines.length);

        let result: LineGroup[] = [];
        let i = 0;
        while (i < separators.length - 1) {
            let currentSeparator: number = separators[i];
            const nextSeparator = separators[i + 1];
            let temp: ILine[] = [];
            while (currentSeparator < nextSeparator) {
                temp.push(doc.lines[currentSeparator]);
                ++currentSeparator;
            }
            result.push(temp);
            ++i;
        }
        return result;
    }
}