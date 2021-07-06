import React from 'react';
import '../../css/other/Footer.css';

interface PropsSocialLink {
    readonly link: string,
    readonly className: string
}

class SocialLink extends React.Component<PropsSocialLink> {
    render() {
        return (
            <a href={this.props.link} target='_blank' rel='noreferrer noopener'><i className={this.props.className}/></a>
        );
    }
}

class Footer extends React.Component {

    private readonly socialLinkList: Array<{
        link: string;
        className: string;
    }>

    private constructor(readonly props: any) {
        super(props);
        this.socialLinkList = this.createSocialLinkList();
    }

    private createSocialLinkList = (): Array<{
        link: string;
        className: string;
    }> => {
        return [
            { link: 'https://www.linkedin.com/in/gervin-fung-387409209/', className: 'fab fa-linkedin-in' },
            { link: 'https://www.facebook.com/GervinFung', className: 'fab fa-facebook-f' },
            { link: 'https://www.instagram.com/poolofdeath20/', className: 'fab fa-instagram' },
            { link: 'mailto:gervinfungdaxuen@gmail.com', className: 'fab fa-google' },
            { link: 'https://github.com/GervinFung/', className: 'fab fa-github' }
        ];
    }

    render() {
        return (
            <div id='footer'>
                <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'/>
                <div className='social-link'>
                    {
                        this.socialLinkList.map((socialLink, index) => {
                            return <SocialLink key={socialLink.link + index} link={socialLink.link} className={socialLink.className}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Footer;