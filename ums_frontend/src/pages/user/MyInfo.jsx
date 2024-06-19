import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostCode from "../../components/DaumPostCode";
import Button from "../../components/Button";
import axios from "axios";

const MyInfo = () => {
    const [user, setUser] = useState(null);
    const [inputs, setInputs] = useState({userid:"",userpw:"",userpw_re:"",username:"",usergender:"",foreigner:"",zipcode:"",addr:"",addrdetail:"",addretc:"",hobby:""})
    const {userid,userpw,userpw_re,username,usergender,foreigner,zipcode,addr,addrdetail,addretc,hobby} = inputs;

    const navigate = useNavigate();

    const change = (e) => {
        const {name,value} = e.target;
        setInputs({
            ...inputs,
            [name]:value
        })
    }
    
    const pwTest = [false,false,false,false,false]
    const pwCheck = () => {
        const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@-]).{4,}$/;
        const c = document.querySelectorAll(".pw_check span");
        console.log("비밀번호 : "+/^[a-zA-Z0-9~?!@-]*$/.test(userpw));
        if(userpw.length == 0){
            for(let i=0;i<5;i++){
                pwTest[i] = false;
                c[i].classList = "";
            }
            return;
        }
        if(!reg.test(userpw)){
            c[0].classList = "pcf";
            pwTest[0] = false;
        }
        else{
            c[0].classList = "pct";
            pwTest[0] = true;
        }
        if(userpw.length < 8){
            c[1].classList = "pcf";
            pwTest[1] = false;
        }
        else{
            c[1].classList = "pct";
            pwTest[1] = true;
        }
        if(/(\w)\1\1\1/.test(userpw) || /(\s)\1\1\1/.test(userpw)){
            c[2].classList = "pcf";
            pwTest[2] = false;
        }
        else{
            c[2].classList = "pct";
            pwTest[2] = true;
        }
        if(!/^[a-zA-Z0-9~?!@-]*$/.test(userpw)){
            c[3].classList = "pcf";
            pwTest[3] = false;
        }
        else{
            c[3].classList = "pct";
            pwTest[3] = true;
        }
        if(userpw != userpw_re){
            c[4].classList = "pcf";
            pwTest[4] = false;
        }
        else{
            c[4].classList = "pct";
            pwTest[4] = true;
        }
    }

    const userhobby = useRef([]);
    const clickAddHobby = () => {
        const hobby_list = document.getElementsByClassName("hobby_list")[0];
        if(hobby == ""){
            alert("취미를 입력해 주세요.")
            return;
        }
        if(userhobby.current.indexOf(hobby) != -1){
            alert("중복된 취미입니다.")
            return;
        }
        if(!/^[가-힣a-zA-Z\s]+$/.test(hobby)){
            alert("정확한 취미를 입력해 주세요.")
            return;
        }
        if(userhobby.current.length >= 5){
            alert("취미는 5개 이하로 입력해 주세요.")
            return;
        }
        const inputHobby = document.createElement("span");
        inputHobby.classList = "userhobby";
        inputHobby.name = "userhobby";
        inputHobby.innerHTML = hobby;
        userhobby.current.push(hobby);
        
        const xBox = document.createElement("a")
        xBox.classList = "xBox";
        inputHobby.appendChild(xBox);
        inputHobby.addEventListener("click",deleteHobby);
        hobby_list.appendChild(inputHobby);

    }
    
    function deleteHobby(e){
    
        let deleteNode = null;
        if(e.target.classList == "xBox"){
            deleteNode = e.target.parentNode;
        }
        else{
            deleteNode = e.target;
        }
        let txt = deleteNode.innerText;
        console.log(txt);
        for(let i in userhobby.current){
            if(userhobby.current[i] == txt){
                userhobby.current.splice(i,1);
                break;
            }
        }
        deleteNode.remove();
        console.log(userhobby.current)
    }
    const clickModify = () => {
        const user = {
            userid:userid,
            userpw:document.myinfoForm.userpw.value,
            username:username,
            usergender:usergender+"-"+foreigner,
            zipcode:document.getElementById("zipcode").value,
            addr:document.getElementById("addr").value,
            addrdetail:document.myinfoForm.addrdetail.value,
            addretc:document.getElementById("addretc").value,
            userhobby:userhobby.current.join("\\")
        }
        console.log(user);
        axios.put(`/api/user/${userid}`,user)
        .then(resp=>{
            alert("수정 성공!");
            navigate("/user/myInfo")
        })
        .catch(e=>{
            alert("수정 실패!")
            navigate("/user/myInfo")
        })
    }
    const clickBack = () => {
        navigate("/");
    }
    const clickLeave = () => {
        axios.delete(`/api/user/${userid}`)
        .then(resp=>{
            alert("안녕히가세요...");
            navigate("/")
        })
        .catch(e=>{
            alert("회원탈퇴 실패!")
            navigate("/user/myInfo");
        })
    }
    useEffect(()=>{
        axios.get("/api/user/myinfo")
        .then(resp=>{
            setUser(resp.data);
            setInputs({
                ...inputs,
                usergender:resp.data.usergender.split("-")[0],
                foreigner:resp.data.usergender.split("-")[1]
            })
        })
        axios.get("/api/user/loginCheck")
        .then(resp=>{
            setInputs({
                ...inputs,
                userid:resp.data
            })
        })
        .catch(e=>{

        })
    },[])
    useEffect(() => {
        if(user != null){
            const hobby_list = document.getElementById("hobby_list");
            const temp = user.userhobby.split("\\");
            for(const item of temp){
                const inputHobby = document.createElement("span");
                inputHobby.classList = "userhobby";
                inputHobby.name = "userhobby";
                inputHobby.innerHTML = item;
                userhobby.current.push(item);
                
                const xBox = document.createElement("a")
                xBox.classList = "xBox";
                inputHobby.appendChild(xBox);
                inputHobby.addEventListener("click",deleteHobby);
                hobby_list.appendChild(inputHobby);
            }
            console.log(userhobby.current);
        }
    },[user])
    
    if(user == null){
        return <>로딩중...</>
    }
    else{
        
        return (
            <div id='wrap' className='myinfo'>
                <form name="myinfoForm">
                    <table>
                        <tbody>
                            <tr>
                                <td id="result" colSpan={2}></td>
                            </tr>
                            <tr className="userid_area">
                                <th>아이디</th>
                                <td>
                                    <input type="text" name="userid" defaultValue={user.userid} readOnly/>
                                </td>
                            </tr>
                            <tr className="userpw_area">
                                <th>비밀번호</th>
                                <td>
                                    <input type="password" name="userpw" onKeyUp={pwCheck} onChange={change} defaultValue={user.userpw}/>
                                </td>
                            </tr>
                            <tr className="userpw_re_area" >
                                <th>비밀번호 확인</th>
                                <td>
                                    <input type="password" name="userpw_re" onKeyUp={pwCheck} onChange={change} defaultValue={user.userpw}/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div className="pw_check">
                                        <span>영어 대문자, 소문자, 숫자, 특수문자(~,?,!,@,-)를 모두 하나 이상 포함해야 해요 😃</span>
                                        <span>최소 8자 이상의 비밀번호가 보안에 안전해요 😄</span>
                                        <span>같은 문자가 연속해서 사용되지 않았어요 😆</span>
                                        <span>사용할 수 없는 문자가 포함되지 않았어요 🙂</span>
                                        <span>비밀번호 확인이 완료되었어요! 😊</span>
                                    </div>                                
                                </td>
                            </tr>
                            <tr className="username_area">
                                <th>이름</th>
                                <td>
                                    <input type="text" name="username" readOnly defaultValue={user.username}/>
                                </td>
                            </tr>
                            <tr className="gender_area radio_area">
                                <th>성별</th>
                                <td>
                                    <div>
                                        <ul>
                                            <li className="radio_item">
                                                <input type="radio" name="usergender" id="usergender1" value='M' disabled defaultChecked={usergender == 'M'}/>
                                                <label htmlFor="usergender1">남자</label>
                                            </li>
                                            <li className="radio_item">
                                                <input type="radio" name="usergender" id="usergender2" value='W' disabled defaultChecked={usergender == 'W'}/>
                                                <label htmlFor="usergender2">여자</label>
                                            </li>
                                        </ul>
                                        <ul>
                                            <li className="radio_item">
                                                <input type="radio" name="foreigner" id="foreigner1" value='K' disabled defaultChecked={foreigner == 'K'}/>
                                                <label htmlFor="foreigner1">내국인</label>
                                            </li>
                                            <li className="radio_item">
                                                <input type="radio" name="foreigner" id="foreigner2" value='F' disabled defaultChecked={foreigner == 'F'}/>
                                                <label htmlFor="foreigner2">외국인</label>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <tr className="zipcode_area">
                                <th>우편번호</th>
                                <td>
                                    <input className="input-with-btn" name="zipcode" type="text" id="zipcode" placeholder="우편번호" readOnly onChange={change} defaultValue={user.zipcode}/>
                                    <DaumPostCode></DaumPostCode>
                                </td>
                            </tr>
                            <tr className="addr_area">
                                <th>주소</th>
                                <td>
                                    <input readOnly name="addr" type="text" id="addr" placeholder="주소" onChange={change} defaultValue={user.addr}/>
                                </td>
                            </tr>
                            <tr className="addrdetail_area">
                                <th>상세주소</th>
                                <td>
                                    <input name="addrdetail" type="text" id="addrdetail" placeholder="상세주소" onChange={change} defaultValue={user.addrdetail}/>
                                </td>
                            </tr>
                            <tr className="addretc_area">
                                <th>참고항목</th>
                                <td>
                                    <input readOnly name="addretc" type="text" id="addretc" placeholder="참고항목" onChange={change} defaultValue={user.addretc}/>
                                </td>
                            </tr>
                            <tr className="hobby_area">
                                <th id="hobby_lbl">취미</th>
                                <td>
                                    <div>
                                        <div className="hobby_input">
                                            <input className="input-with-btn" type="text" name="hobby" onChange={change}/><Button value="추가" size="small" onClick={clickAddHobby}/>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>
                                    <div className="hobby_list" id="hobby_list"></div>
                                    <input type="hidden" value="" name="userhobby"/>
                                </td>
                            </tr>
                            
                            <tr>
                                <td colSpan={2}>
                                    <Button className='submit' value="수정 완료" size="small" onClick={clickModify}/>
                                    <Button className='back' value="이전으로" size="small" onClick={clickBack}/>
                                    <Button className='leave' value="회원탈퇴" size="small" onClick={clickLeave}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}
export default MyInfo;