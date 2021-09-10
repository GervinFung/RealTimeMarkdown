const LEADING_TRAILING_WHITESPACE = /^[ \s]+|[ \s]+$/;

export const combineMultipleStrings = (...args: string[]): string => args.join('');

export const withoutLeadingTrailingWhitespace = (txt: string) => !LEADING_TRAILING_WHITESPACE.test(txt);