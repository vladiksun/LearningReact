import React, { useEffect,  useState } from 'react';
import styled from "styled-components";
import styles from "./Cockpit.module.css";


const StyledButton = styled.button`
      background-color: ${props => props.alt ? 'red' : 'green'};
      color: white;
      font: inherit;
      border: 1px solid blue;
      padding: 8px;
      cursor: pointer;
      margin: 5px;
    
      :hover {
        background-color: ${props => props.alt ? 'yellow' : 'lightgreen'} ;
        color: black
      }
`;

const Cockpit = (props) => {

    // React hook for functional components
    // useEffect runs on every update
    // can be used for http calls
    useEffect(() => {
        console.log('[Cockpit.js] useEffect')
        // Http request...
        setTimeout(() => {
            console.log('Executed when props.persons changed');
        }, 1000)
    }, [props.persons]); // executes only if props.persons changed

    useEffect(() => {
        console.log('[Cockpit.js] useEffect 2')
        // Http request...
        setTimeout(() => {
            console.log('Executed only once');
        }, 1000)
    }, []); // executes only once - no dependencies

    let [counter, setCounter] = useState(0);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect3');

        const interval = setInterval(() => {
            setCounter((v) => v + 1)
        }, 2000);

        return () => {
            console.log('[Cockpit.js] run after every render cycle. Can be used for cleanup or cancellation') // executes only if props.showPersons changed
            clearInterval(interval);
            setCounter((v) => 0);
        };
    }, [props.showPersons]); // executes only if props.showPersons changed

    let assignedClasses = [];
    if (props.showPersons) {
        assignedClasses.push(styles.red, styles.bold)
    } else {
        assignedClasses = [];
    }

    let buttonClasses = [styles.ModuleDefault];

    if (props.showAssignments) {
        buttonClasses.push(styles.Yellow);
    }

    return (
        <div className={styles.Cockpit}>
            <h1 className={assignedClasses.join(' ')}>{props.title}</h1>

            <h3>Interval is working, counter is: {counter} [ Test "useEffect() hook" ]</h3>

            <StyledButton key="button1"
                          title="CSS Via styled-components"
                          onClick={props.onSwitchNameHandler.bind(this, 'TEST_NAME_AS_BIND')}>
                Switch Name via BIND
            </StyledButton>

            <StyledButton key="button2"
                          title="CSS Via styled-components"
                          onClick={(event) => props.onSwitchNameHandler('TEST_NAME_AS_ARROW_FUNCTION')}>
                Switch Name via Arrow Function
            </StyledButton>

            <StyledButton key="button3"
                          title="CSS Via styled-components"
                          onClick={props.onTogglePersonsHandler}>
                Toggle Persons
            </StyledButton>

            <button className={buttonClasses.join(' ')} title="CSS Via CSS module"
                    key="button4"
                    onClick={props.onToggleAssignments}>Show Assignments</button>
        </div>

    );
}

export default React.memo(Cockpit);