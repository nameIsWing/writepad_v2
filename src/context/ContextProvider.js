import React, { useContext, useReducer } from "react";

const Context = React.createContext();
export const useContextProvider = () => useContext(Context);

const reducer = ( state, action ) => {

    const note = {
        title: action.title,
        details: action.details,
        id: action.id,
        date: action.date,
        time: action.time,
        important: action.important,
    }


    switch (action.type) {

        case "ADD_NOTE": {
            const keys = JSON.parse(localStorage.getItem('keys'));
            const found = keys.find(key => key === action.id)
            if(!found) {
                localStorage.setItem(
                    'keys', JSON.stringify([...keys, `${action.id}`]));
            }
            localStorage.setItem(`${action.id}`, JSON.stringify(note));
            localStorage.setItem( 'currentNote', JSON.stringify(note));

            return { notes: [] }; //needs to clear notes every time to see updates when list component reloads
        }
        // break;

        case "GRAB_STORAGE": {
            const keys = JSON.parse(localStorage.getItem('keys'));
            keys.forEach( (keyItem) => {
                const newItem = JSON.parse(localStorage.getItem(keyItem));
                const found = state.notes.find(note => note.id === newItem.id);
                if( !found ) state.notes = [ ...state.notes, newItem ];
            })
            return { notes: [ ...state.notes ] }
        }

        default: 
            console.log(state)

    }
};

const ContextProvider = ({ children }) => {

    const [ { notes }, dispatch ] = useReducer( reducer, { 
        notes: []
    } );

    const values = { notes, dispatch };

    return (
        <Context.Provider value={values}>
            { children }
        </Context.Provider>
    )
}

export default ContextProvider
