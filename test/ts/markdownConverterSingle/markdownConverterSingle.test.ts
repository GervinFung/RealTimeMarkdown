import {convertTextToMarkdown} from '../../../src/ts/markdownConverter';
import { processSingleLineFileData } from '../testUtil';

describe('Test MarkdownConverter SingleLine Markdown', () => {
    test.each(processSingleLineFileData('markdownConverterSingle'))(
        'data => %p',
        (data) => {
            expect(convertTextToMarkdown(data.input)).toEqual(data.output);
        }
    );
});