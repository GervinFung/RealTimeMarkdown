import React from 'react';
import {IUpdateTextArea} from '../interface/MarkdownInterface';

class MarkdownEditor extends React.Component<IUpdateTextArea> {

    render() {
        return (
            <div className='Markdown'>
                <div className='markdown-wrapper'>
                    <div className='title markdown-wrapper-title'><label htmlFor='markdown-text-area'>Markdown Text</label></div>
                    <div className='textarea-container markdown-main-content-wrapper'>
                        <textarea name='markdown-text-editor' id='markdown-text-area' className='markdown-main-content' value={this.props.markdownContent} autoCapitalize='none' autoCorrect='off' spellCheck='false' onChange={(event) => {
                            this.props.updateMarkdownContent(event.target.value)
                        }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MarkdownEditor;