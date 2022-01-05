import React from "react";
import { useContext } from "react";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/Log"
import FriendsSuggestion from "../components/Profil/FriendsSuggestion";

const Home = () => {
    const uid = useContext(UidContext);

    return (
        <div className="home">
            <div className="main">
                <div className="home-header">
                {uid ? <NewPostForm /> : <Log signin={true} signup={false} /> }
                </div>
                <Thread />
            </div>
            <div className="right-side">
                <div className="right-side-container">
                    <div className="wrapper">
                        {uid && <FriendsSuggestion />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;