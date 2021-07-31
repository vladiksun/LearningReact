import './AssignmentsHolder.css'

import Assignment1 from "./assignments/assignment1/Assignment1";
import Assignment2 from "./assignments/assignment2/Assignment2";

const AssignmentsHolder = (props) => {
    return (

        <div className='AssignmentsHolder'>
            <Assignment1/>
            <hr/>
            <Assignment2/>
            <hr/>
        </div>


    );
};

export default AssignmentsHolder;