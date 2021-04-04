import React from 'react';
import styled from "styled-components";
import styles from "./Cockpit.module.css";


const cockpit = (props) => {
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

export default cockpit;