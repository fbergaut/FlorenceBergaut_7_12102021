import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../actions/userActions';

const DeleteProfil = (props) =>{
    const dispatch = useDispatch();

    const deleteQuote = ()=> {
        dispatch(deleteUser(props.userUuid))
    }

    return (
        <div onClick={() => {
            if (window.confirm('Voulez-vous supprimer ce profil ?')) { 
                deleteQuote();
                window.location.reload();
            }
        }}>
            <h6>Supprimer le profil</h6>
        </div>
    );
};

export default DeleteProfil;