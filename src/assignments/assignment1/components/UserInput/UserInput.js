const UserInput = (props) => {

    const inputStyle = {
      border: '2px solid red'
    };

    return (

        <input type="text"
               style={inputStyle}
               onChange={props.changedHandler}
               value={props.currentName}/>

    );
};

export default UserInput;