import React, { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import {IUpdatePreview} from '../interface/MarkdownInterface';
import ReactHtmlParser from 'react-html-parser';
import DOMPurify from 'dompurify';
import { convertTextToMarkdown } from '../../ts/markdownConverter';

const MarkdownPreview = (props: IUpdatePreview) => {

    const { markdownContent, fullMarkdownFeature } = props;

    const markdownType = (): ReactElement | Array<ReactElement> | string => {
        if (fullMarkdownFeature) {
            const purified = DOMPurify.sanitize(markdownContent, {USE_PROFILES: {html: true}} )
            return <ReactMarkdown className='react-markdown'>{purified}</ReactMarkdown>;
        }
        const purified = DOMPurify.sanitize(convertTextToMarkdown(markdownContent), {USE_PROFILES: {html: true}} );
        const parsed = ReactHtmlParser(purified);
        return parsed;
    };

    return (
        <div className='Markdown'>
            <div className='markdown-wrapper'>
                <div className='title markdown-wrapper-title'><span>Markdown Preview</span></div>
                <div className='preview-container markdown-main-content-wrapper'>
                    <div id='markdown-preview' className='markdown-main-content'>{markdownType()}</div>
                </div>
            </div>
        </div>
    );
};

export default MarkdownPreview;