import { combineMultipleStrings } from './markdownUtil';

const ANY_ORDERED: RegExp = /^\d+\.[ ].*(\n\d+\..*)*$/gim;

const NUMBER_DOT: RegExp = /(\d+\.)/i;

export const convertOrderedList = (unprocessedInput: string): string => {
    return unprocessedInput.replace(ANY_ORDERED, (string): string => {
        const filtered = string.replace('\r', '').split('\n').filter((content) => {
            return content;
        }).map((content) => {
            return content.trim()
        });

        const processedList = filtered.map((content): string => {
            return combineMultipleStrings('<li>', content.replace(NUMBER_DOT, '').trim(), '</li>');
        }).join('');

        const x = filtered[0].split(' ')[0].replace('.', '');

        return combineMultipleStrings(`<ol start="${x}">`, processedList, '</ol>');
    });
};