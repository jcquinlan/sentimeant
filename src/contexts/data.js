import {useState, createContext} from 'react';

export const useDataContext = () => {
    const [state, setState] = useState({
        currentUser: null
    });

    const setCurrentUser = (currentUser) => {
        setState(state => {
            return {
                ...state,
                currentUser
            }
        });
    }

    return {
        currentUser: state.currentUser,
        setCurrentUser
    }
};

export const DataContext = createContext();