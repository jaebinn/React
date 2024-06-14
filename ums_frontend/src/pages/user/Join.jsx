import { useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import DaumPostCode from "../../components/DaumPostCode";

const Join = () => {
    const [inputs, setInputs] = useState({userid:"",userpw:"",userpw_re:"",username:"",usergender:"",foreigner:"",zipcode:"",addr:"",addrdetail:"",addretc:"",hobby:""})
    const {userid,userpw,userpw_re,username,usergender,foreigner,zipcode,addr,addrdetail,addretc,hobby} = inputs;

    const navigate = useNavigate();

    const change = (e) => {
        const {name,value} = e.target;
        setInputs({
            ...inputs,
            [name]:value
        })
        console.log(inputs)
    }
    const clickCheckId = () => {
        
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

    const userhobby = [];
    const clickAddHobby = () => {
        const hobby_list = document.getElementsByClassName("hobby_list")[0];
        if(hobby == ""){
            alert("취미를 입력해 주세요.")
            return;
        }
        if(userhobby.indexOf(hobby) != -1){
            alert("중복된 취미입니다.")
            return;
        }
        if(!/^[가-힣a-zA-Z\s]+$/.test(hobby)){
            alert("정확한 취미를 입력해 주세요.")
            return;
        }
        if(userhobby.length >= 5){
            alert("취미는 5개 이하로 입력해 주세요.")
            return;
        }
        const inputHobby = document.createElement("span");
        inputHobby.classList = "userhobby";
        inputHobby.name = "userhobby";
        inputHobby.innerHTML = hobby;
        userhobby.push(hobby);
        
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
        for(let i in userhobby){
            if(userhobby[i] == txt){
                userhobby.splice(i,1);
                break;
            }
        }
        deleteNode.remove();
    }
    const clickJoin = () => {

    }
    const clickBack = () => {
        navigate("/");
    }


    return (
        <div id='wrap' className='join'>
            <form name="joinForm">
                <table>
                    <tbody>
                        <tr>
                            <td id="result" colSpan={2}></td>
                        </tr>
                        <tr className="userid_area">
                            <th>아이디</th>
                            <td>
                                <input type="text" name="userid" className="input-with-btn"/>
                                <Button value="중복검사" size="small"/>
                            </td>
                        </tr>
                        <tr className="userpw_area">
                            <th>비밀번호</th>
                            <td>
                                <input type="password" name="userpw" onKeyUp={pwCheck} onChange={change}/>
                            </td>
                        </tr>
                        <tr className="userpw_re_area" >
                            <th>비밀번호 확인</th>
                            <td>
                                <input type="password" name="userpw_re" onKeyUp={pwCheck} onChange={change}/>
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
                                <input type="text" name="username" onChange={change}/>
                            </td>
                        </tr>
                        <tr className="gender_area radio_area">
                            <th>성별</th>
                            <td>
                                <div>
                                    <ul>
                                        <li className="radio_item">
                                            <input type="radio" name="usergender" id="usergender1" value='M' onChange={change}/>
                                            <label htmlFor="usergender1">남자</label>
                                        </li>
                                        <li className="radio_item">
                                            <input type="radio" name="usergender" id="usergender2" value='W' onChange={change}/>
                                            <label htmlFor="usergender2">여자</label>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li className="radio_item">
                                            <input type="radio" name="foreigner" id="foreigner1" value='K' onChange={change}/>
                                            <label htmlFor="foreigner1">내국인</label>
                                        </li>
                                        <li className="radio_item">
                                            <input type="radio" name="foreigner" id="foreigner2" value='F' onChange={change}/>
                                            <label htmlFor="foreigner2">외국인</label>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr className="zipcode_area">
                            <th>우편번호</th>
                            <td>
                                <input className="input-with-btn" name="zipcode" type="text" id="zipcode" placeholder="우편번호" readOnly onChange={change}/>
                                <DaumPostCode></DaumPostCode>
                            </td>
                        </tr>
                        <tr className="addr_area">
                            <th>주소</th>
                            <td>
                                <input readOnly name="addr" type="text" id="addr" placeholder="주소" onChange={change}/>
                            </td>
                        </tr>
                        <tr className="addrdetail_area">
                            <th>상세주소</th>
                            <td>
                                <input name="addrdetail" type="text" id="addrdetail" placeholder="상세주소" onChange={change}/>
                            </td>
                        </tr>
                        <tr className="addretc_area">
                            <th>참고항목</th>
                            <td>
                                <input readOnly name="addretc" type="text" id="addretc" placeholder="참고항목" onChange={change}/>
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
                                <div className="hobby_list"></div>
                                <input type="hidden" value="" name="userhobby"/>
                            </td>
                        </tr>
                        
                        <tr>
                            <td colSpan={2}>
                                <Button className='submit' value="가입 완료" size="half"/>
                                <Button className='back' value="이전으로" size="half" onClick={clickBack}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
export default Join;