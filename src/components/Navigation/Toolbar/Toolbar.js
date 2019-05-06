import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = (props) => (
    <header className={classes.Toolbar }>
        <div onClick={props.clicked}>Menu</div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;

//For Logo to adjust as per the size of the device, we wrapped it into another <div> and defined
// logo height in the sidedrawer.css file. other logo styling parameters will be picked from logo.css