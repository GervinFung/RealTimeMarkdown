import { combineMultipleStrings } from './markdownUtil';

abstract class AbstractAlign {
    private readonly regex: RegExp;
    private readonly colStyle: string;

    protected constructor(readonly _regex: RegExp, readonly _colStyle: string) {
        this.regex = _regex;
        this.colStyle = _colStyle;
    }

    public testAgainstRegex = (alignStyle: string): boolean => {
        return this.regex.test(alignStyle);
    }

    public getColStyle = (): string => {
        return ` align="${this.colStyle}"`;
    }
}

class AlignCenter extends AbstractAlign {

    private static readonly alignCenter = new AlignCenter();

    private constructor() {
        super(/:-{3,}:/, 'center');
    }

    public static getSingletonInstance = (): AbstractAlign => {
        return AlignCenter.alignCenter;
    };
}

class AlignLeft extends AbstractAlign {

    public static readonly alignLeft = new AlignLeft();

    private constructor() {
        super(/:-{3,}/, 'left');
    }

    public static getSingletonInstance = (): AbstractAlign => {
        return AlignLeft.alignLeft;
    };
}

class AlignRight extends AbstractAlign {

    public static readonly alignRight = new AlignRight();

    private constructor() {
        super(/-{3,}:/, 'right');
    }

    public static getSingletonInstance = (): AbstractAlign => {
        return AlignRight.alignRight;
    };
}

const TABLE_REG = /^(\|[^\n]+\|\r?\n\s*?)((?:\| {0,}:?[\s-]+:? {0,})+\|)(\n\s*?(?:\|[^\n]+\|\r?\n?\s*?)*)?$/gim;

const formAlignFromFormat = (format: Array<string>): Array<string> => {
    const arrStyle = format.map((col) => {
            if (AlignCenter.getSingletonInstance().testAgainstRegex(col)) {
                return AlignCenter.getSingletonInstance().getColStyle();
            }
            else if (AlignLeft.getSingletonInstance().testAgainstRegex(col)) {
                return AlignLeft.getSingletonInstance().getColStyle();
            }
            else if (AlignRight.getSingletonInstance().testAgainstRegex(col)) {
                return AlignRight.getSingletonInstance().getColStyle();
            }
            return '';
        }
    );
    return arrStyle;
}

const formTHead = (header: Array<string>, align: Array<string>): string => {
    const headerContent = header.map((hd, index) => {
        return combineMultipleStrings(`<th${align[index]}>`, hd, '</th>')
    }).join('');
    return combineMultipleStrings('<thead>', '<tr>', headerContent, '</tr>', '</thead>');
}

const formTBody = (body: Array<string>, align: Array<string>): string => {

    const bodyContent = body.map((row) => {
        const filtered = row.split('|').filter((content, index, arr) => {
            if (index === arr.length - 1) {
                return content
            }
            return content && index > 0 && index < arr.length - 1;
        });

        if (align.length > filtered.length) {

            const extraCol = [];

            for (let i = 0; i < align.length - filtered.length; i++) {
                extraCol.push('');
            }

            const formatRow = filtered.concat(extraCol).map((col, index) => {
                return combineMultipleStrings(`<td${align[index]}>`, col.trim(), '</td>');
            }).join('');

            return combineMultipleStrings('<tr>', formatRow, '</tr>');
        }

        const formatRow = filtered.map((col, index) => {
            return combineMultipleStrings(`<td${align[index]}>`, col.trim(), '</td>');
        }).join('');

        return combineMultipleStrings('<tr>', formatRow, '</tr>');
    }).join('');

    return combineMultipleStrings('<tbody>', bodyContent, '</tbody>');
}

const getProcessedBody = (split: Array<string>): Array<string> => {
    return split.filter((_, index) => {
        return index >= 2;
    }).map((row) => {
        return row.trim();
    }).filter((row) => {
        return row;
    });
}

const getProcessedHeader = (header: string): Array<string> => {
    return header.split('|').map((hd) => {
        return hd.trim();
    }).filter((_, index, arr) => {
        return index > 0 && index < arr.length - 1;
    });
}

const getProcessedFormat = (format: string): Array<string> => {
    return format.split('|').filter((content) => {
        return content.includes('---');
    });
}

export const convertTable = (unprocessedInput: string): string => {

    return unprocessedInput.replace(TABLE_REG, (string) => {
        const split = string.split('\n');

        if (split.length < 2) {
            return string;
        }
    
        const header = getProcessedHeader(split[0]);
        const format = getProcessedFormat(split[1]);
    
        if (header.length === format.length) {
            const align = formAlignFromFormat(format);
            const body = getProcessedBody(split);
    
            return combineMultipleStrings('<table>', formTHead(header, align), formTBody(body, align), '</table>');
        }
        return string;
    });
};