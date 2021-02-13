
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// NODE MODULES > REACT ICONS
import { FaFacebookSquare } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaYoutubeSquare } from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa';
import { FaGithubSquare } from 'react-icons/fa';
import { FaSnapchatSquare } from 'react-icons/fa';

// CSS
import '../styles/components/Footer.css';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    renderItems(items) {

        if (items) {
            return (
                <ul className="footer__items">
                    {
                        items.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                >
                                    <Link
                                        to={`/${(item.replace(' ', '-').toLowerCase())}`}
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
                {this.props.isLoggedIn ? null : this.renderItems(['LOGIN', 'REGISTER'])}
            </div>
        );
    };

    renderSocial() {

        const data = [
            {
                url: 'https://www.github.com/uitwaaien6',
                icon: <FaGithubSquare />
            },
            {
                url: 'https://www.facebook.com/uitwaaien6',
                icon: <FaFacebookSquare />
            },
            {
                url: 'https://www.twitter.com/uitwaaien_6',
                icon: <FaTwitterSquare />
            },
            {
                url: 'https://www.snapchat.com/add/ruzgar_ata',
                icon: <FaSnapchatSquare />
            },
            {
                url: 'https://www.instagram.com/ruzgar.ata',
                icon: <FaInstagramSquare />
            },
            {
                url: 'https://www.linkedin.com/in/ruzgar-ata-ozkan',
                icon: <FaLinkedin />
            },
            {
                url: 'https://www.youtube.com/channel/UC929IQUbYGJnpnMBlP_sepQ',
                icon: <FaYoutubeSquare />
            },
            {
                url: 'https://discord.gg/Vzs6cFBs79',
                icon: <FaDiscord />
            },
        ]

        return (
            <div className="footer__social">
                <ul>
                    {
                        data.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                >
                                    <a href={item.url} target="_blank" rel="noreferrer">{item.icon}</a>
                                </li>
                            );
                        })
                    }
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

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}

export default connect(mapStateToProps, null)(Footer);
