import { useState, useRef, useEffect } from "react";

const Join = () =>{
    const [inputs, setInputs] = useState({id: "", pw: "", name: ""});
    const {id, pw, name} = inputs;
    const [list, setList] = useState([]);

    const inputRef = useRef([]);
    //inputRef는 빈 배열([])로 만들어지기 떄문에 그 배열에 각 input 태그들을 
    //추가하기 위한 함수 서언
    const addInputRef = (el) => {
        if(!inputRef.current.includes(el)){
            inputRef.current.push(el);
        }
    }
    
    useEffect(()=>{
        if(inputRef.current[0]){
            inputRef.current[0].focus();
        }
    },[list])
    const change = (e) => {
        //id input에 apple 입력 시
        //name : "id" / value : "apple"
        const {name, value} = e.target;
        // setInputs(
        //     {
        //         ...inputs,
        //         ["id"]:"apple"
        //     }
        // )
        setInputs(
            {
                ...inputs,
                [name]:value
            }
        )
    }

    const join = () => {
        if(!id){
            alert("아이디를 입력해주세요")
            inputRef.current[0].focus();
            return;
        }
        else if(!pw){
            alert("비밀번호를 입력해주세요")
            inputRef.current[1].focus();
            return;
        }
        else if(!name){
            alert("이름을 입력해주세요")
            inputRef.current[2].focus();
            return;
        }
        const user = {id, pw, name};
        //실제로는 백서버로 가입 요청 
        setList(list.concat(user));
        setInputs({id:"",pw:"",name:""})
    }
    return (
        <>
            <h2>회원가입</h2>
            <form>
                <p>
                    <input type="text" value={id} placeholder="Input join Id" name ="id" onChange={change} ref={addInputRef}></input><br/>
                    <input type="password" value={pw} placeholder="Input join PW" name ="pw" onChange={change} ref={addInputRef}></input><br/>
                    <input type="text" value={name} placeholder="Input join Name" name ="name" onChange={change} ref={addInputRef}></input><br/>
                    <input type="button" value="Join!" onClick={join}></input>
                </p>
            </form>
            <ul>
                {list.map(
                    (user)=>{
                        return <li> {user.name}({user.id}) = {user.pw}</li>
                    }
                )}
            </ul>
        </>
    )
}
export default Join;