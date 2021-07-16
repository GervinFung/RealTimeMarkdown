import {convertDiscordSpoilerTag} from '../../../src/ts/discordSpoilerTag';
import { processSingleLineFileData } from '../testUtil';

describe('Test MarkdownConverter SingleLine Markdown', () => {
    test.each(processSingleLineFileData('discordTag'))(
        'data => %p',
        (data) => {
            expect(convertDiscordSpoilerTag(data.input)).toEqual(data.output);
        }
    );
});