import React from 'react';
import '../../css/other/Popup.css';

interface PopupState {
    isHidden: boolean
}

class Popup extends React.Component<{}, PopupState> {

    private readonly key: string;
    private readonly value: string;

    private constructor(readonly props: any) {
        super(props);
        this.state = {
            isHidden: true
        };
        this.key = 'popupKey';
        this.value = 'surprised'
    }

    private countDownShowSurprised = (): void => {
        if (this.alreadySurprised()) {
            return;
        }
        setTimeout(() => {
            this.setState({
                isHidden: false
            })
        }, 5000);
    }

    private alreadySurprised = (): boolean => {
        const value = sessionStorage.getItem(this.key);
        return value !== null && value === this.value;
    }

    render() {
        return (
            <div id='surprised' style={{display: this.state.isHidden ? 'none' : 'flex'}} onLoad={() => {
                this.countDownShowSurprised();
            }}>
                <button name='close-popup-button' id='close-msg' onClick={() => {this.closeSurprised()}}>&times;</button>
                <div style={{textAlign: 'center'}}>
                    <img src='img/thankyou.gif' alt='thankyou.gif'/>
                    <h1 className='wow-msg message'>WOW</h1>
                    <p className='thankyou-msg message'>Thank You for using my Markdown Text Editor! Wishing you a good day!</p>
                </div>
            </div>
        );
    }

    private closeSurprised = (): void => {
        if (this.alreadySurprised()) {
            return;
        }
        this.setState({
            isHidden: !this.state.isHidden
        });
        sessionStorage.setItem(this.key, this.value);
    }
}

export default Popup