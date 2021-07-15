import { combineMultipleStrings } from './markdownUtil';

const ANY_ORDERED: RegExp = /[^\n]?([\d+].+[\s\S]\r?\n?[ \t]*)+/gi;
const NUMBER: RegExp = /(([\d+])+)/i;
const SUB_LIST: RegExp = /(([\d+])+(\D)+\.)/i;

const formSubList = (content: string, filtered: Array<string>, index: number, i: number): string => {
    if (SUB_LIST.test(filtered[index])) {
        const subList = combineMultipleStrings('<li>', filtered[index].trim(), '</li>')
        if (i === index) {
            return content + combineMultipleStrings('<ul>', formSubList(subList, filtered, index + 1, i), '</ul>')
        }
        return content + formSubList(subList, filtered, index + 1, i)
    }
    return content;
}

export const convertOrderedList = (unprocessedInput: string): string => {
    return unprocessedInput.replace(ANY_ORDERED, (string): string => {
        const filtered = string.replace('\r', '').split('\n').filter((content) => {
            return content;
        }).map((content) => {
            return content.trim()
        });

        const processedList = filtered.map((content, index): string => {
            if (SUB_LIST.test(content)) {
                return '';
            }
            return combineMultipleStrings('<li>', formSubList(content.replace(NUMBER, '').replace('.', '').trim(), filtered, index + 1, index + 1), '</li>');
        }).join('');

        const x = filtered[0].split(' ')[0];

        return combineMultipleStrings(`<ol start="${x}">`, processedList, '</ol>');
    });
};