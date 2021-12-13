import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import {firebase} from '../firebase/firebase-config'
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { DeshBoardPublicRuters } from './DeshBoardPublicRuters';
import {startLoadingNotes } from '../actions/notes';

export const RouterApp = () => {
    const dispatch = useDispatch()

    const [checking, setchecking] = useState(true);
    const [isLoggedIn, setisLoggedIn] = useState(false)


    useEffect(() => {
        firebase.auth().onAuthStateChanged(async(user) =>{
            if(user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setisLoggedIn(true)
                dispatch(startLoadingNotes(user.uid))
            } else {
                setisLoggedIn(false)
            }
            setchecking(false)
        })
    }, [dispatch, setchecking, setisLoggedIn])



if(checking) {
    return(
        <h1>Wait...</h1>
    )
}
    return (
        <div>
            <Router>
                <div>
                    <Switch>
                    <PublicRoute path = "/auth" component = {DeshBoardPublicRuters}
                    isLoggedIn = {isLoggedIn}
                    />
                    <PrivateRoute exact  path="/" component={JournalScreen}
                    isLoggedIn = {isLoggedIn}
                    />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
