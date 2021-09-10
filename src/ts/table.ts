import { combineMultipleStrings } from './markdownUtil';
const TABLE_REG = /^(\|[^\n]+\|\r?\n\s*?)((?:\| {0,}:?[\s-]+:? {0,})+\|)(\n\s*?(?:\|[^\n]+\|\r?\n?\s*?)*)?$/gim;
const ALIGN_CENTER = /:-{3,}:/;
const ALIGN_RIGHT = /-{3,}:/;
const ALIGN_LEFT = /:-{3,}/;

const testAgainstRegex = (regex: RegExp, alignStyle: string): boolean => regex.test(alignStyle);

const formAlignFromFormat = (format: Array<string>): Array<string> => {
    const arrStyle = format.map(col => {
            if (testAgainstRegex(ALIGN_CENTER, col)) {
                return ' align="center"';
            }
            else if (testAgainstRegex(ALIGN_RIGHT, col)) {
                return ' align="right"';
            }
            else if (testAgainstRegex(ALIGN_LEFT, col)) {
                return ' align="left"';
            }
            return '';
        }
    );
    return arrStyle;
};

const formTHead = (header: Array<string>, align: Array<string>): string => {
    const headerContent = header.map((hd, index) => {
        return combineMultipleStrings(`<th${align[index]}>`, hd, '</th>')
    }).join('');
    return combineMultipleStrings('<thead>', '<tr>', headerContent, '</tr>', '</thead>');
};

const formTBody = (body: Array<string>, align: Array<string>): string => {

    const bodyContent = body.map(row => {
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

            const formatRow = filtered.concat(extraCol).map((col, index) => combineMultipleStrings(`<td${align[index]}>`, col.trim(), '</td>')).join('');

            return combineMultipleStrings('<tr>', formatRow, '</tr>');
        }

        const formatRow = filtered.map((col, index) => combineMultipleStrings(`<td${align[index]}>`, col.trim(), '</td>')).join('');

        return combineMultipleStrings('<tr>', formatRow, '</tr>');
    }).join('');

    return combineMultipleStrings('<tbody>', bodyContent, '</tbody>');
};

const getProcessedBody = (split: Array<string>): Array<string> => split.filter((_, index) => index >= 2).map(row => row.trim()).filter(row => row);

const getProcessedHeader = (header: string): Array<string> => header.split('|').map(hd => hd.trim()).filter((_, index, arr) => index > 0 && index < arr.length - 1);

const getProcessedFormat = (format: string): Array<string> => format.split('|').filter(content => content.includes('---'));

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