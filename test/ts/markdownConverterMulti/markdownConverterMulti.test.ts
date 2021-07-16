import {convertTextToMarkdown} from '../../../src/ts/markdownConverter';
import { processMultilineFileData } from '../testUtil';

describe('Test MarkdownConverter MultiLine Markdown', () => {
    test.each(processMultilineFileData('markdownConverterMulti'))(
        'data => %p',
        (data) => {
            expect(convertTextToMarkdown(data.input)).toEqual(data.output);
        }
    );
});