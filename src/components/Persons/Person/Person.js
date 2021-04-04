import React from 'react';
import styles from './Person.module.css';

const Person = (props) => {

    const rnd = Math.random();
    if (rnd > 0.90) {
        throw new Error("This is random ERROR")
    }

    return (
        <div className={styles.Person}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type='text' onChange={props.changed} value={props.name}/>
        </div>
)

};

export default Person;