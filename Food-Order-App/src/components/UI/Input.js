import './Input.css';

const Input = (props) => {
    return (
        <div className='input' >
            <label htmlFor={props.id} >{props.label}</label>
            <input {...props.Input} />
        </div>

    )
}

export default Input;