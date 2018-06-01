import React from 'react';
import { Register } from './Register'
import '../styles/Main.css'
import {Login} from './Login';

export class Main extends React.Component {
    render() {
        return(
            <div>
                <Login/>
            </div>
        );
    }
}