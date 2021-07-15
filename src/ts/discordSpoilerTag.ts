const ANY_TAG: RegExp = /(?:\|){2}([\s\S]+?)(?:\|){2}/gi;

export const convertDiscordSpoilerTag = (unprocessedInput: string): string => {
    return unprocessedInput.replace(ANY_TAG, '<span class="discord-spoiler" aria-hidden="true">$1</span>');
};