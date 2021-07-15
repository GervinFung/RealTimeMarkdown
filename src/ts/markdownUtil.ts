const LEADING_TRAILING_WHITESPACE = /^[ \s]+|[ \s]+$/;

export const combineMultipleStrings = (...args: string[]): string => {
    return args.join('');
}

export const withoutLeadingTrailingWhitespace = (txt: string) => {
    return !LEADING_TRAILING_WHITESPACE.test(txt)
}