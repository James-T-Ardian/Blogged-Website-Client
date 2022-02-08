import './Footer.css'
import githubLogo from "./logo-images/github-logo.png"
import linkedInLogo from "./logo-images/linkedin_black_logo.png"
import emailLogo from "./logo-images/email-logo.png"


const Footer = (): JSX.Element => {
    return (
        <div id="footer">
            <a href="https://github.com/James-T-Ardian/Blogged-Website" target="_blank">
                <img src={githubLogo} id="github-icon" />
            </a>
            <a href="https://www.linkedin.com/in/james-ardian-238880186/" target="_blank">
                <img src={linkedInLogo} id="linkedin-icon" />
            </a>
            <a href="mailto:jamesardian01@gmail.com" target="_blank">
                <img src={emailLogo} id="gmail-icon" />
            </a>
        </div>
    );
};

export default Footer;