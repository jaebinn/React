import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Header = ({loginUser}) => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(loginUser == ""){
            alert("로그인 후 이용하세요!");
            navigate("/")
        }
    })

    const clickLogout = ()=>{
        axios.get("/api/user/logout")
        .then(resp => {
            if(resp.data == "O"){
                navigate("/");
            }
        })
    }
    const clickMypage = ()=>{
        navigate("/user/myInfo");
    }

    return (
        <header>
            <table className="title">
                <tbody>
                    <tr>
                        <td>
                            <a onClick={() => { navigate("/product/list") }}>
                                <h3>UMS 프로젝트</h3>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className="header_area">
                <tbody>
                    <tr>
                        <td>
                            <span>{loginUser}님 환영합니다</span>
                        </td>
                        <td>
                            <Button onClick={clickLogout} value="로그아웃" size="half" id="logout-btn"></Button>
                            <Button onClick={clickMypage} value="마이페이지" size="half" id={"mypage-btn"}></Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </header>
    )
}
export default Header;