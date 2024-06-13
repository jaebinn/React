const Button = (props) => {
    return <input type="button" value={props.value} onClick={props.onClick} id={props.id} className={`btn 
    ${props.className}`}></input>
}

export default Button;