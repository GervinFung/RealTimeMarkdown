import React from 'react';
import '../../css/other/Footer.css';

interface PropsSocialLink {
    readonly link: string,
    readonly className: string
}

const SocialLink = (props: PropsSocialLink) => {

    const { link, className } = props;

    return <a href={link} target='_blank' rel='noreferrer noopener'><i className={className}/></a>;
};

const Footer = () => {

    const socialLinkList: Array<PropsSocialLink> = [
        { link: 'https://www.linkedin.com/in/gervin-fung-387409209/', className: 'fab fa-linkedin-in' },
        { link: 'https://www.facebook.com/GervinFung', className: 'fab fa-facebook-f' },
        { link: 'https://www.instagram.com/poolofdeath20/', className: 'fab fa-instagram' },
        { link: 'mailto:gervinfungdaxuen@gmail.com', className: 'fab fa-google' },
        { link: 'https://github.com/GervinFung/', className: 'fab fa-github' }
    ];

    return (
        <div id='footer'>
            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'/>
            <div className='social-link'>
                {socialLinkList.map((socialLink, index) => <SocialLink key={socialLink.link + index} link={socialLink.link} className={socialLink.className}/>)}
            </div>
        </div>
    );
};

export default Footer;