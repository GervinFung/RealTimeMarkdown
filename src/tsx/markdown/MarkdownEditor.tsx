import React from 'react';
import {IUpdateTextArea} from '../interface/MarkdownInterface';

const MarkdownEditor = (props: IUpdateTextArea) => {

    const { markdownContent, updateMarkdownContent } = props;

    return (
        <div className='Markdown'>
            <div className='markdown-wrapper'>
                <div className='title markdown-wrapper-title'><label htmlFor='markdown-text-area'>Markdown Text</label></div>
                <div className='textarea-container markdown-main-content-wrapper'>
                    <textarea name='markdown-text-editor' id='markdown-text-area' className='markdown-main-content' value={markdownContent} autoCapitalize='none' autoCorrect='off' spellCheck='false' onChange={(event) => updateMarkdownContent(event.target.value)}/>
                </div>
            </div>
        </div>
    );
};

export default MarkdownEditor;