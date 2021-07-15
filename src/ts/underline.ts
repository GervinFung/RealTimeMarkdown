import {combineMultipleStrings, withoutLeadingTrailingWhitespace} from './markdownUtil';
const LEADING_TRAILING_UNDERSCORE: RegExp = /\b_(\S[\s\S]*?)_\b/gi;

export const convertLeadingAndTrailingUnderscore = (unprocessedInput: string): string => {
    return unprocessedInput.replace(LEADING_TRAILING_UNDERSCORE, (string, txt): string => {
        return withoutLeadingTrailingWhitespace(txt) ? combineMultipleStrings('<u>', txt, '</u>') : string;
    });
};