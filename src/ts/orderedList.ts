import { combineMultipleStrings } from './markdownUtil';

const ANY_ORDERED = /^\d+\.[ ].*(\n\d+\..*)*$/gim;

const NUMBER_DOT = /(\d+\.)/i;

export const convertOrderedList = (unprocessedInput: string): string => {
    return unprocessedInput.replace(ANY_ORDERED, (string): string => {
        const filtered = string.replace('\r', '').split('\n').filter(content => content).map((content) => content.trim());

        const processedList = filtered.map(content => combineMultipleStrings('<li>', content.replace(NUMBER_DOT, '').trim(), '</li>')).join('');

        const x = filtered[0].split(' ')[0].replace('.', '');

        return combineMultipleStrings(`<ol start="${x}">`, processedList, '</ol>');
    });
};