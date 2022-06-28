import './Card.css'

const Card = (props) => {
    const myclass = 'card '+props.className;
    return (
        <div className= {myclass} >{props.children}</div>
        
    )
}

export default Card;