import React, {Component} from 'react';
import styles from './Person.module.css';


class Person extends Component {

    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Person.js] getDerivedStateFromProps');
    //     return state;
    // }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('[Person.js] shouldComponentUpdate');
        let newName = nextProps.name;
        let currentName = this.props.name;

        // performance optimization
        if (newName.trim()!== currentName.trim()) {
            console.log('[Person.js] shouldComponentUpdate re-rendered component');
           return true;
        }
        return false;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Person.js] getSnapshotBeforeUpdate');
        // we can return coordinates for scrolling for example
        return { message: 'Snapshot!'};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Person.js] componentDidUpdate');

        // will print { message: 'Snapshot!'}
        console.log(snapshot);
    }

    // used for cleanup, destroying listeners for example
    componentWillUnmount() {
        console.log('[Person.js] componentWillUnmount');
    }

    render() {

        console.log('[Person.js] rendering')

        const rnd = Math.random();
        //const threshold = 0.90;
        const threshold = 1;
        if (rnd > threshold) {
            throw new Error("This is random ERROR")
        }

        return (
            <div className={styles.Person}>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type='text' onChange={this.props.changed} value={this.props.name}/>
            </div>
        )
    }
}

// const Person = (props) => {
//
//     console.log('[Person.js] rendering')
//
//     const rnd = Math.random();
//     if (rnd > 0.90) {
//         throw new Error("This is random ERROR")
//     }
//
//     return (
//         <div className={styles.Person}>
//             <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
//             <p>{props.children}</p>
//             <input type='text' onChange={props.changed} value={props.name}/>
//         </div>
// )
//
// };

export default Person;