import { saveAs } from 'file-saver';
import React, { LegacyRef, ReactElement } from 'react';
import { IChangeMarkdownType, IMarkdownTypeProps, IThemeToggle, IUpdateMarkdownText, IUpdatePreview, IUpdateTextArea } from '../interface/MarkdownInterface';
import '../../css/other/Header.css';

const FileDropdown = (props: IUpdateTextArea) => {

    const { updateMarkdownContent, markdownContent } = props;

    const writeTextToFile = () => {
        const blob = new Blob([markdownContent], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'markdownText.txt');
    };

    return (
        <div className='dropdown'>
            <span className='option'>Markdown Text</span>
            <div className='dropdown-content'>
                <button name='clear-markdown' className='option-content' onClick={() => updateMarkdownContent('')}>Clear Markdown Text</button>
                <button name='download-markdown' className='option-content' onClick={() => writeTextToFile()}>Download Markdown Text</button>
            </div>
        </div>
    );
};

interface MarkdownDropdownProps extends IMarkdownTypeProps, IChangeMarkdownType {}

const MarkdownDropdown = (props: MarkdownDropdownProps) => {

    const { fullMarkdownFeature, enableFullMarkdown, disableFullMarkdown } = props;

    const createFullMDRadioInput = (): React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> => {
        return fullMarkdownFeature ? <input type='radio' name='markdown-type' defaultChecked /> : <input type='radio' name='markdown-type' />;
    };

    const createPartialMDRadioInput = (): React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> => {
        return fullMarkdownFeature ? <input type='radio' name='markdown-type' /> : <input type='radio' name='markdown-type' defaultChecked />;
    };

    return (
        <div className='dropdown'>
            <span className='option'>Markdown Type</span>
            <div className='dropdown-content'>
                <div className='option-content'>
                    <label onClick={() => enableFullMarkdown()}>
                        {createFullMDRadioInput()}Full Markdown
                    </label>
                </div>
                <div className='option-content'>
                    <label onClick={() => disableFullMarkdown()}>
                        {createPartialMDRadioInput()}Partial Markdown
                    </label>
                </div>
            </div>
        </div>
    );
};

interface HeaderProps extends IThemeToggle, IUpdatePreview, IUpdateMarkdownText, IChangeMarkdownType { }

const Header = (props: HeaderProps) => {

    const { isLightMode, markdownContent, updateMarkdownContent, enableFullMarkdown, disableFullMarkdown, fullMarkdownFeature, toggleTheme } = props;

    const toggleIcon = (): ReactElement<LegacyRef<HTMLElement>, string> => {
        return <i id='toggle-theme' className={isLightMode ? 'fas fa-sun' : 'fas fa-moon'} aria-hidden='true' />;
    };

    return (
        <div id='header'>
            <div className='nav-link'>
                <a className='personal-link' href='https://poolofdeath20.herokuapp.com/' target='_blank' rel='noreferrer noopener'>PoolOfDeath20</a>
            </div>
            <div className='title app-title'>Markdown Editor</div>
            <div className="dropdown-option">
                <FileDropdown
                    markdownContent={markdownContent}
                    updateMarkdownContent={updateMarkdownContent}
                />
                <MarkdownDropdown
                    enableFullMarkdown={enableFullMarkdown}
                    disableFullMarkdown={disableFullMarkdown}
                    fullMarkdownFeature={fullMarkdownFeature}
                />
            </div>
            <div className='toggle-wrapper'>
                <button name='toggle-theme-button' className='toggle-theme-button' onClick={() => toggleTheme()}>
                    {toggleIcon()}
                </button>
            </div>
        </div>
    );

};

export default Header;