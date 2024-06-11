
import Info from './components/Info';
import Join from './components/Join';
const Router = () => {
    const command = document.location.href.substring(22);
    console.log(command)
    if(command === "info"){
        const user = {id:"apple",pw:"1234",name:"김사과",man:true}
        return <Info id={user.id} pw={user.pw} name={user.name}></Info>
    }
    else if(command === "join"){
        return <Join></Join> 
    }
    return <></>
}

export default Router;