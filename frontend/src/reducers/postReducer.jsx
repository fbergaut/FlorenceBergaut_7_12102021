import { DELETE_POST, GET_POSTS, LIKE_POST, UNLIKE_POST, UPDATE_POST, EDIT_COMMENT, DELETE_COMMENT } from "../actions/postActions";

const initialState = {};

export default function postReducer(state = initialState, action)
{
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case LIKE_POST:
            return state.map((post) => {
                if (post.uuid === action.payload.postUuid) {
                    return {
                        ...post,
                        likers: [{posterUuid: action.payload.posterUuid}, ...post.likers]
                    }
                }
                return post;
            });
        case UNLIKE_POST:
            return state.map((post) => {
                if (post.uuid === action.payload.postUuid) {
                    return {
                        ...post,
                        likers: post.likers.filter((uuid) => action.payload.posterUuid !== uuid.posterUuid), ...post.likers
                    }
                }
                return post;
            });
        case UPDATE_POST:
            return state.map((post) => {
                if(post.uuid === action.payload.postUuid) {
                    return {
                        ...post,
                        message: action.payload.message
                    }
                } else return post;
            })
        case DELETE_POST:
            return state.filter((post) => post.uuid !== action.payload.postUuid);
        case EDIT_COMMENT:
            return state.map((post) => {
                if (post.uuid === action.payload.postUuid) {
                    return {
                        ...post,
                        comments: post.comments.map((comment) => {
                            if (comment.uuid === action.payload.uuid){ 
                                return {
                                ...comment,
                                text: action.payload.text
                                } 
                            } else return comment;
                        })
                    }
                } else return post;
            });
        case DELETE_COMMENT:
            return state.map((post) => {
                if (post.uuid === action.payload.postUuid) {
                    return {
                        ...post,
                        comments: post.comments.filter((comment) => comment.uuid !== action.payload.uuid)
                    }
                } else return post;
            });
        default:
            return state;    
    }
}