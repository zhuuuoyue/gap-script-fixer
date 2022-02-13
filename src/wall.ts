import { Document, ParameterizedLine } from "gap-script";
import _ from "lodash";

import { Task } from "./task";
import { Utils } from "./utils";

function beginDrawingWall(cmd: string): boolean {
    return -1 !== [`"gmDrawStructureStraightWall"`].indexOf(cmd);
}

export class TaskForWallType implements Task {
    private doc: Document | undefined;

    constructor() {
    }

    setDocument(doc: Document): void {
        this.doc = doc;
    }

    run(): void {
        if (_.isUndefined(this.doc)) {
            return;
        }

        let lineGroups = Utils.splitLines(this.doc);
        for (let i = 0; i < lineGroups.length; ++i) {
            let lineGroup = lineGroups[i];
            if (lineGroup.length === 0) {
                continue;
            }
            let first = lineGroup[0];
            if (first instanceof ParameterizedLine) {
                if (first.module === "JrnCmd" && first.lineType === "ProcessCommand") {
                    let firstParameter = first.parameters[0].value;
                    if (beginDrawingWall(firstParameter)) {
                        lineGroup.forEach((line) => {
                            if (line instanceof ParameterizedLine) {
                                // 在此添加处理的逻辑
                                // 修改事务的名称
                                if (line.module === "JrnRes" && line.lineType === "CompareExpectedResult" && line.parameters[1].value === `"成功提交用户事务：墙-直线"`) {
                                    line.parameters[1].value = `"<new transaction name>"`;
                                }
                                // 删除多余的事务
                                if (false) {
                                    line.clear();
                                }
                            }
                        });
                    }
                }
            }
        }
    }
    
}
