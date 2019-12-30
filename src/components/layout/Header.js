import React, { Component } from 'react'
import tomate from './pomate.png';
import logo from './logo.png'


export class Header extends Component {
    render() {

        const headerStyle = {
            display: 'flex',
            background: 'black',
            width: '100%',

        }
        
        const titleStyle = {
            display: 'flex',
            fontSize: 20,
            fontFamily: "Monospace",
            color: 'white',
            padding: '20px'
        }

        return (
            <div id="header" style={headerStyle}>
                <span id="title" style={titleStyle}>Pomate</span>
            </div>
        )
    }
    
}

export default Header
