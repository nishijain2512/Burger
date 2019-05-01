import React from 'react';
import classes from './Modal.css';

const modal = (props) => (
    <div 
        className={classes.Modal} 
        //inline styling is added to animate the modal to appear n disappear when order now button is pressed.
        style={{transform: props.show ? 'translateY(0)' : 'translateY(100vh)',
                opacity: props.show ? '1' : '0' }}>
        {props.children}
    </div>
);

export default modal;