import { useEffect, useState } from 'react';
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Home = () => {
    const [inputs, setInputs] = useState({userid:"",userpw:""})
    const {userid,userpw} = inputs;
    const navigate = useNavigate();

    const change = (e) => {
        const {name,value} = e.target;
        setInputs({
            ...inputs,
            [name]:value
        })
    }

    const clickLogin = () => {
        if(!userid){
            alert("아이디를 입력해주세요!")
            return
        }
        else if(!userpw){
            alert("비밀번호를 입력해주세요!")
            return
        }
        const user = {userid,userpw};
        //백 통신
        axios.get("/api/user/login",{params:user})
        .then(resp=>{
            let result = resp.data;
            if(result != "X"){
                alert(`${result}님 어서오세요~!`)
                navigate("/product/list");
            }
        })
        .catch(e=>{
            alert("오타입니다");
            setInputs({userid:"",userpw:""});
        })
    }
    const clickJoin = () =>{
        navigate("/user/join")
    }

    useEffect(()=>{
        axios.get("/api/user/joinCheck")
        .then(resp=>{
            const data = resp.data;
            if(data){
                setInputs({
                    ...inputs,
                    userid:data
                })
            }
        })
    },[])

    return (
        <div id="wrap" className="login">
            <form name="loginForm" id="loginForm">
                <table>
                    <tbody>
                        <tr>
                            <th>아이디</th>
                            <td>
                                <input type="text" name="userid" id="userid" value={inputs.userid} onChange={change}/>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input type="password" name="userpw" id="userpw" value={inputs.userpw} onChange={change}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className="btn_area">
                                    <Button value="로그인" className="login" onClick={clickLogin}></Button>
                                    <Button value="회원가입" className="join" onClick={clickJoin}></Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
export default Home;