import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
const Info = ({id="did", pw, name, man}) => {
    const navigate = useNavigate();

    return(
        <>
            <p>
                아이디 : {id}
            </p>
            <p>
                비밀번호 : {pw}
            </p>
            <p>
                이름 : {name}
            </p>
            <p>
                성별 : {man?"남":"여"}
            </p>
            <Button value="메인으로" onClick={() => {navigate("/")}}></Button>
        </>
    )
}
Info.defaultProps = {
    id:"did",
    pw:'dpw',
    name:'dname',
    man:true
}
export default Info;