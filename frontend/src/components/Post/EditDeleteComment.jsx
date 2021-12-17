import React, { useContext, useState, useEffect }  from 'react';
import { UidContext } from "../AppContext";

const EditDeletComment = ({ comment,postUuid }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const uid = useContext(UidContext);

    const handleEdit = () => {

    };

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterUuid){
                setIsAuthor(true);
            }
        }
        checkAuthor();
    }, [uid, comment.commenterUuid])

    return (
        <div className="edit-comment">
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <img src="./img/icons/edit.svg" alt="edit-comment" />
                </span>
            )}
            {isAuthor && edit && (
                <form action="" onSubmit={handleEdit} className='edit-comment-form'>
                    <label htmlFor="text" onClick={() => setEdit(!edit)}>Editer</label>
                    <br />
                    <input 
                        type="text" 
                        name="text" 
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.text} 
                    />
                    <br />
                    <input type="submit" value="Valider modification" />
                </form>
            )}
        </div>
    );
};

export default EditDeletComment;