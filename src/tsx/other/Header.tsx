import { saveAs } from 'file-saver';
import React, { LegacyRef, ReactElement } from 'react';
import { IChangeMarkdownType, IMarkdownTypeProps, IThemeToggle, IUpdateMarkdownText, IUpdatePreview, IUpdateTextArea } from '../interface/MarkdownInterface';
import '../../css/other/Header.css';

class FileDropdown extends React.Component<IUpdateTextArea> {

    render() {
        return (
            <div className='dropdown'>
                <span className='option'>Markdown Text</span>
                <div className='dropdown-content'>
                    <button name='clear-markdown' className='option-content' onClick={() => {this.removeMarkdownContent()}}>Clear Markdown Text</button>
                    <button name='download-markdown' className='option-content' onClick={() => {this.writeTextToFile()}}>Download Markdown Text</button>
                </div>
            </div>
        );
    }

    private removeMarkdownContent = (): void => {
        this.props.updateMarkdownContent('');
    }

    private writeTextToFile = () => {
        const blob = new Blob([this.props.markdownContent], {type: 'text/plain;charset=utf-8'});
        saveAs(blob, 'markdownText.txt');
    }
}

interface MarkdownDropdownProps extends IMarkdownTypeProps, IChangeMarkdownType{}

class MarkdownDropdown extends React.Component<MarkdownDropdownProps> {

    render() {
        return (
            <div className='dropdown'>
                <span className='option'>Markdown Type</span>
                <div className='dropdown-content'>
                    <div className='option-content'>
                        <label onClick={() => {this.props.enableFullMarkdown()}}>
                            {this.createFullMDRadioInput()}Full Markdown
                        </label>
                    </div>
                    <div className='option-content'>
                        <label onClick={() => {this.props.disableFullMarkdown()}}>
                            {this.createPartialMDRadioInput()}Partial Markdown
                        </label>
                    </div>
                </div>
            </div>
        );
    }

    private createFullMDRadioInput = (): React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> => {
        if (this.props.fullMarkdownFeature) {
            return <input type='radio' name='markdown-type' defaultChecked/>
        }
        return <input type='radio' name='markdown-type'/>
    }

    private createPartialMDRadioInput = (): React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> => {
        if (!this.props.fullMarkdownFeature) {
            return <input type='radio' name='markdown-type' defaultChecked/>
        }
        return <input type='radio' name='markdown-type'/>
    }
}

interface HeaderProps extends IThemeToggle, IUpdatePreview, IUpdateMarkdownText, IChangeMarkdownType{}

class Header extends React.Component<HeaderProps> {

    render() {
        return (
            <div id='header'>
                <div className='nav-link'>
                    <a className='personal-link' href='https://poolofdeath20.herokuapp.com/' target='_blank' rel='noreferrer noopener'>PoolOfDeath20</a>
                </div>
                <div className='title app-title'>Markdown Editor</div>
                <div className="dropdown-option">
                    <FileDropdown
                        markdownContent={this.props.markdownContent}
                        updateMarkdownContent={this.props.updateMarkdownContent}
                    />
                    <MarkdownDropdown
                        enableFullMarkdown={this.props.enableFullMarkdown}
                        disableFullMarkdown={this.props.disableFullMarkdown}
                        fullMarkdownFeature={this.props.fullMarkdownFeature}
                    />
                </div>
                <div className='toggle-wrapper'>
                    <button name='toggle-theme-button' className='toggle-theme-button' onClick={() => this.props.toggleTheme()}>
                        {this.toggleIcon()}
                    </button>
                </div>
            </div>
        );
    }

    private toggleIcon = (): ReactElement<LegacyRef<HTMLElement>, string> => {
        return <i id='toggle-theme' className={this.props.isLightMode ? 'fas fa-sun' : 'fas fa-moon'} aria-hidden='true'/>;
    }
}

export default Header;