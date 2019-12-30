import React, { Component } from 'react'
import logo from './pomate.png';

export class Header extends Component {
    render() {

        const styleTitle = {
            fontSize: 20,
            fontFamily: "Monospace",
            color: "white",
            padding: "5px"
        }

        const header = {
            background: "black",
            textAlign: "center"
        }

        const backgroundTitle = "POMATO";

        const tomatoImg = <img src={logo} className="App-logo" alt="logo"/>

        return (
            <div style={header}>
                {tomatoImg}
                <p style={styleTitle}>
                    {backgroundTitle}
                </p>
                
            </div>
        )
    }
    
}

export default Header
