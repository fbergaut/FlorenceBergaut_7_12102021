import React, { useContext } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  PinterestIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";
import {UidContext} from "../AppContext";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

const SocialShare = ({ post }) =>{
    const uid = useContext(UidContext);

    return (
        <div className="socialShare-container">
            {uid === null && (
                <Popup
                trigger={<img src="./img/icons/share.svg" alt="share" />}
                position={["bottom center", "bottom right", "bottom left"]}
                closeOnDocumentClick
                >
                <div>Connectez-vous<br/> pour partager 😉</div>
                </Popup>
            )}
            {uid && (
                <Popup
                trigger={<img src="./img/icons/share.svg" alt="share" />}
                position={["bottom center", "bottom right", "bottom left"]}
                closeOnDocumentClick
                >
                <div className="social-share">
                    <FacebookShareButton 
                        url={String(window.location)} 
                        quote={post.message}>
                        <FacebookIcon size={27} round={true}></FacebookIcon>
                    </FacebookShareButton>
                    <PinterestShareButton
                        url={String(window.location)}
                        media={post.picture} 
                        description={post.message}>
                        <PinterestIcon size={27} round={true}></PinterestIcon>
                    </PinterestShareButton>
                    <RedditShareButton
                        url={String(window.location)}
                        title={post.message}>
                        <RedditIcon size={27} round={true}></RedditIcon>
                    </RedditShareButton>
                    <EmailShareButton
                        url={String(window.location)} 
                        subject={post.message}>
                        <EmailIcon size={27} round={true}></EmailIcon>
                    </EmailShareButton>
                    <TwitterShareButton
                        url={String(window.location)}
                        title={post.message}>
                        <TwitterIcon size={27} round={true}></TwitterIcon>
                    </TwitterShareButton>
                    <WhatsappShareButton
                        url={String(window.location)}
                        title={post.message}>
                        <WhatsappIcon size={27} round={true}></WhatsappIcon>
                    </WhatsappShareButton>
                </div>
                </Popup>
            )}
        </div>
    );
};

export default SocialShare;