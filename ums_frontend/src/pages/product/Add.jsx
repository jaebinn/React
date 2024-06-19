import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Header from "../../layout/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const categories = ["전체","패션의류/잡화","뷰티","출산/유아동","식품","주방용품","생활용품","홈인테리어","가전디지털","스포츠/레저","자동차용품","도서/음반/DVD","완구/취미","문구/오피스","반려동물용품","헬스/건강식품"]

    const [loginUser,setLoginUser] = useState();
    const navigate = useNavigate();
    //redux recoil zustand

    useEffect(()=>{
        axios.get("/api/user/loginCheck")
        .then(resp => {
            setLoginUser(resp.data);
        })
        .catch(e => {
            setLoginUser(e.response.data);
        })
    })

    const clickAdd = () => {
        const addForm = document.addForm;
        const prodname = addForm.prodname;
        const prodprice = addForm.prodprice;
        const prodamount = addForm.prodamount;
        const prodcategory = addForm.prodcategory;
        const prodinfo = addForm.prodinfo;

        const product = {
            prodname:prodname.value,
            prodprice:prodprice.value,
            prodamount:prodamount.value,
            prodcategory:prodcategory.value,
            prodinfo:prodinfo.value,
            userid:loginUser
        }

        axios.post("/api/product/add",product)
        .then(resp=>{
            alert("상품 등록 성공!")
            navigate("/product/list")
        })
        .catch(e=>{
            alert("상품 등록 실패!");
        })
    }
    const clickList = () => {
        navigate("/product/list");
    }

    return (
        <>
            <Header loginUser={loginUser}></Header>
            <div id="wrap" className="add">
                <form name="addForm">
                    <div id="add">
                        <div className="row">
                            <div className="prodname">상품명</div>
                            <div className="input_area">
                                <input type="text" name="prodname" maxLength={20} defaultValue={""}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="userid">판매자</div>
                            <div className="input_area">
                                <input type="text" name="userid" defaultValue={loginUser} readOnly/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="prodprice">판매 가격</div>
                            <div className="input_area">
                                <input type="text" name="prodprice" defaultValue={""}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="prodprice">판매 수량</div>
                            <div className="input_area">
                                <input type="text" name="prodamount" defaultValue={""}/>
                            </div>
                        </div>
                        <div className="row category">
                            <div className="prodprice">카테고리</div>
                            <Dropdown list={categories} name="prodcategory" width={400}/>
                        </div>
                        <div className="row">
                            <div className="prodinfo">상품설명</div>
                            <div className="input_area">
                                <textarea name="prodinfo" defaultValue={""}></textarea>
                            </div>
                        </div>
                        <div className="btn_area center">
                            <Button value="등록하기" size="common" onClick={clickAdd}/>
                            <Button value="목록으로" size="common" onClick={clickList}/>
                        </div>
                    </div>
                </form>
            </div>            
        </>
    )
}
export default Add;