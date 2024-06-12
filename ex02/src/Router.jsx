import Header from './components/Header';
import Footer from './components/Footer';
import Info from './components/Info';
import Join from './components/Join';
import BoardContainer from './container/BoardContainer';
const Router = () => {
    const command = document.location.href.substring(22);
    console.log(command)
    let component = null;
    if(command === "info"){
        const user = {id:"apple",pw:"1234",name:"김사과",man:true}
        component =  <Info id={user.id} pw={user.pw} name={user.name}></Info>
    }
    else if(command === "join"){
        component =  <Join></Join> 
    }
    else if(command === "board"){
        component = <BoardContainer></BoardContainer>
    }
    return (
        <>
            <Header></Header>
            {component}
            <Footer></Footer>
        </>
    )
}

export default Router;