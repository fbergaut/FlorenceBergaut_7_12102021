import { GET_POSTS, LIKE_POST, UNLIKE_POST, UPDATE_POST } from "../actions/postActions";

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
                        likers: [...post.likers, {posterUuid: action.payload.posterUuid}, ...post.likers]
                    }
                }
                return post;
            });
        case UNLIKE_POST:
            return state.map((post) => {
                if (post.uuid === action.payload.postUuid) {
                    return {
                        ...post,
                        likers: post.likers.filter((uuid) => action.payload.posterUuid !== uuid.posterUuid)
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
        default:
            return state;    
    }
}