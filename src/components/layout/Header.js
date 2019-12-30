import React, { Component } from 'react';
import './header.css';
import cog from './cog.png';
// import logo from './logo.png'

export class Header extends Component {
    render() {

        const iconStyle = {
            width: '30px',
            display: 'flex',
            alignItems: 'center',
            background: "white",
            borderRadius: '10px'
        }

        const headerStyle = {
            display: 'flex',
            background: 'black',
            width: '100%',

        }

        const allStyle = {
            margin: '0px',
            padding: '0px',
            boxSizing: 'border-box'
        }       


        const navStyle = {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '8vh',
            background: '#a81824'
        }   

        const titleStyle = {
            marginLeft: '30px',
            padding: '0px', 
            color: 'white',
            fontFamily: 'Kulim Park',
            fontSize: '30',
            letterSpacing: '5px',
            textTransform: 'uppercase'
        }

        const linksStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '30%',
            color: 'white',
            marginRight: '30px'
        }

        const navBar = (
            <nav style={navStyle}>
                <div class="logo">
                    <h4 style={titleStyle}>Pomate</h4>
                </div>
                <ul class="nav-links">
                    {/* <li>
                        <a href="#">Home</a>
                    </li> */}

                    <li>
                        <a href="#"><img src={cog} style={iconStyle}/></a>
                    </li>

                    {/* <li>
                        <a href="#">User</a>
                    </li> */}

                </ul>
            </nav>

        )

        return (
            <div style={allStyle}>
                {navBar}
                {this.navSlide}
            </div>
            
        )
    }
}

export default Header
