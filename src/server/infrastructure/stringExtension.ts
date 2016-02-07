"use strict";

class StringExtension {

    public static format(templateString: string, ...values: any[]): string {
        let out: string = templateString;
        for (let i: number = 0; i < values.length; i++) {
            let regEx: any = new RegExp("\\{" + i + "\\}");
            out = out.replace(regEx, values[i]);
        }
        return out;
    }
}

export = StringExtension;
