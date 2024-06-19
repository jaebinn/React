const Button = ({className,value,size="common",hide,id,onClick}) => {
    return <input
        type="button"
        className={`${size}-btn ${className}`}
        value={value}
        style={hide?{display:'none'}:{}}
        id={id}
        onClick={onClick}
    ></input>
}
export default Button;