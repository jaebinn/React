import { useState } from 'react';
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom';

const Home =()=>{
    const [inputs,setInputs] = useState({userid:"",userpw:""})
    const {userid,userpw}= inputs;
    const navigate = useNavigate();
    
    const change =(e) =>{
        const {name,value} = e.target;
        setInputs({
            ...inputs,
            [name]:value
        })
    }

    const clickLogin =()=>{
        if(!userid){
            alert("아이디를 입력해주세요 ")
            return
        }
        else if (!userpw){
            alert("비밀번호를 입력해주세요")
            return
        }
        const user = {userid, userpw};
        //백통신
    }
    const clickJoin =()=>{
        navigate("user/join")
    }   
    return (
        <>
            <div id="wrap" className="login">
                <form name="loginForm" id="loginForm">
                    <table>
                        <tbody>
                            <tr>
                                <th>아이디</th>
                                <td>
                                    <input type="text" className="userid" id="userid" onChange={change}/>
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호</th>
                                <td>
                                    <input type="password" className="userpw" id="userpw" onChange={change}/>
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
        </>
    )
}

export default Home;