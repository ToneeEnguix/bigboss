
import { useLocation } from 'react-router-dom';
/** @jsx jsx */
import { jsx } from "@emotion/core";
import FooterLinks from "./FooterLinks";
import FooterAds from "./FooterAds";

const Footer = () => {

    let location = useLocation();

    return (
        <footer css={{
            display: location.pathname === "/bye" ||
                location.pathname === "/basket"
                ? "none" : "inline",
            flexDirection: "column"
        }}>
            <FooterLinks />
            <FooterAds />
        </footer>
    )
}
export default Footer;







