
// NODE MODULES
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaYoutubeSquare } from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa';
import { FaGithubSquare } from 'react-icons/fa';

// CSS
import '../styles/components/Footer.css';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    renderItems(items) {

        if (items) {
            return (
                <ul className="footer__items">
                    {
                        items.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link
                                        to={`/${item.replace(' ', '-').toLowerCase()}`}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
            );
        };

        return null;
    }

    renderList() {
        return (
            <div className="footer__list">

                <div id="footer__logo">
                    <Link
                        to="/"
                    >
                        VOTIFY
                    </Link>
                </div>

                {this.renderItems(['CONTACT US', 'ABOUT US', 'RESOURCES'])}
                {this.renderItems(['SOFTWARE', 'BUSINESSES', 'SERVICES'])}
            </div>
        );
    };

    renderSocial() {
        return (
            <div className="footer__social">
                <ul>
                    <li>
                        <a href="https://www.github.com/uitwaaien6" target="_blank" rel="noreferrer"><FaGithubSquare /></a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/uitwaaien6" target="_blank" rel="noreferrer"><FaFacebookSquare /></a>
                    </li>
                    <li>
                        <a href="https://www.twitter.com/uitwaaien_6" target="_blank" rel="noreferrer"><FaTwitterSquare /></a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/ruzgar.ata" target="_blank" rel="noreferrer"><FaInstagramSquare /></a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/ruzgar-ata-ozkan" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/channel/UC929IQUbYGJnpnMBlP_sepQ" target="_blank" rel="noreferrer"><FaYoutubeSquare /></a>
                    </li>
                    <li>
                        <a href="https://discord.gg/Vzs6cFBs79" target="_blank" rel="noreferrer"><FaDiscord /></a>
                    </li>
                </ul>
            </div>
        );
    };

    componentDidMount() {

    }

    render() {
        return (
            <div className="footer__container">
                <div className="footer__content">

                    {this.renderList()}
                    <hr />
                    {this.renderSocial()}

                    <p>© All Rights Reserved.</p>
                    
                </div>
            </div>
        );
    };
}

export default Footer;
