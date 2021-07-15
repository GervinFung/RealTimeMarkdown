import {combineMultipleStrings, withoutLeadingTrailingWhitespace} from './markdownUtil';
const ANY_STRIKE_THROUGH: RegExp = /(?:~){2}([\s\S]+?)(?:~){2}/gi;

export const convertStrikeThrough = (unprocessedInput: string): string => {
    return unprocessedInput.replace(ANY_STRIKE_THROUGH, (string, txt): string => {
        return withoutLeadingTrailingWhitespace(txt) ? combineMultipleStrings('<del>', txt, '</del>') : string;
    });
};