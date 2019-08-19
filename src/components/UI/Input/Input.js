import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.inputElement];
    
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid); // this is to add design for invalid data. By default InputElement css class will be applied, but if 
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                        <select 
                            className={inputClasses.join(' ')} 
                            value={props.value}
                            onChange={props.changed}>
                                {props.elementConfig.options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.displayValue}
                                    </option>
                            ))}
                        </select>
                    );
            break;
        default:
            inputElement = <input 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>;
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;
