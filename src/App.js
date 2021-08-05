import { useEffect } from 'react';
import Nav from "./components/Nav";
import NewNote from "./components/NewNote";
import { StylesProvider } from "@material-ui/core";
import { FlexWrap } from "./utils/components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteList from "./components/NoteList";

const App = () => {

    useEffect(() => {
        if(localStorage.keys !== null) return;
        localStorage.setItem("keys", "[]")
    }, [])

    return (
        <StylesProvider injectFirst>
            <FlexWrap direction="row">
                <Router>
                    <Nav />
                    <Switch>
                        <Route exact path="/new">
                            <NewNote />
                        </Route>
                    </Switch>
                    <Switch>
                        <Route exact path="/">
                            <NoteList />
                        </Route>
                    </Switch>
                </Router>
            </FlexWrap>
        </StylesProvider>
    )
}

export default App
