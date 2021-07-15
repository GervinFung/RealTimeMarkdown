import React, { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import {IUpdatePreview} from '../interface/MarkdownInterface';
import ReactHtmlParser from 'react-html-parser';
//added purify to sanitizes HTML and prevents XSS attacks
import DOMPurify from 'dompurify';
import { convertTextToMarkdown } from '../../ts/markdownConverter';

class MarkdownPreview extends React.Component<IUpdatePreview> {
    
    render() {
        return (
            <div className='Markdown'>
                <div className='markdown-wrapper'>
                    <div className='title markdown-wrapper-title'><span>Markdown Preview</span></div>
                    <div className='preview-container markdown-main-content-wrapper'>
                        <div id='markdown-preview' className='markdown-main-content'>{this.markdownType()}</div>
                    </div>
                </div>
            </div>
        );
    }

    private markdownType = (): ReactElement | Array<ReactElement> | string => {
        if (this.props.fullMarkdownFeature) {
            //parse text and convert to markdown text via ReactMarkdown library (full markdown done by other contributors)
            //to allow this app to be more usable as a side-project
            const purified = DOMPurify.sanitize(this.props.markdownContent, {USE_PROFILES: {html: true}} )
            return <ReactMarkdown className='react-markdown'>{purified}</ReactMarkdown>;
        }
        //parse text and convert to markdown text via ReactHtmlParser library (partial markdown by me)
        //to allow this app to do 4 markdown type as implemented
        const purified = DOMPurify.sanitize(convertTextToMarkdown(this.props.markdownContent), {USE_PROFILES: {html: true}} );
        const parsed = ReactHtmlParser(purified);
        
        return parsed;
    }
}

export default MarkdownPreview;