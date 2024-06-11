// const Info = (props) => {
//     //실제로는 백 서버와의 소통
//     //외부에서 백 서버와 통신을 했고, 그 데이터를 넘겨받는 경우에는 props을 이용

//     return (<>
//         <p>
//             아이디 : {props.id}
//         </p>
//         <p>
//             비밀번호 : {props.pw}
//         </p>
//         <p>
//             이름 : {props.name}
//         </p>
//         <p>
//             성별 : {props.man ? "남" : "여"}
//         </p>
//     </>)
// }
const Info = ({id, pw, name, man}) => {
    //자바스크립트의 객체를 변수로 나누어서 선언이 가능
    //const {id,pw} = {id="",pw:""}
    //실제로는 백 서버와의 소통
    //외부에서 백 서버와 통신을 했고, 그 데이터를 넘겨받는 경우에는 props을 이용

    return (<>
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
            성별 : {man ? "남" : "여"}
        </p>
    </>)
}
Info.defaultProps = {
    id:"디폴트아이디",
    pw:"디폴트패스워드",
    name:"디폴트네임",
}
export default Info;