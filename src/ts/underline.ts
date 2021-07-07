import {combineWords, withoutLeadingTrailingWhitespace} from './markdownUtil';
const LEADING_TRAILING_UNDERSCORE: RegExp = /\b_(\S[\s\S]*?)_\b/g;

export const convertLeadingAndTrailingUnderscore = (unprocessedInput: string): string => {
    return unprocessedInput.replace(LEADING_TRAILING_UNDERSCORE, (string, txt): string => {
        return withoutLeadingTrailingWhitespace(txt) ? combineWords('<u>', txt, '</u>') : string;
    });
};