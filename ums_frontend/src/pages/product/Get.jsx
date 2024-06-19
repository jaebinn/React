import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../layout/Header";
import Button from "../../components/Button";

const Get = () => {
    const {prodnum} = useParams();
    const [product,setProduct] = useState(null);
    const [loginUser,setLoginUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`/api/product/${prodnum}`)
        .then(resp=>{
            setProduct(resp.data);
        })
        axios.get("/api/user/loginCheck")
        .then(resp => {
            setLoginUser(resp.data);
        })
        .catch(e => {
            setLoginUser(e.response.data);
        })
    },[]);
    if(!product){
        return <>로딩중...</>
    }
    
    const clickLike = (e) => {
        axios.put(`/api/product/like/${prodnum}`)
        let likecnt = Number(e.target.nextElementSibling.innerHTML);
        likecnt++;
        e.target.nextElementSibling.innerHTML = likecnt;
    }
    const clickModify = () => {
        navigate(`/product/modify/${prodnum}`)
    }
    const clickRemove = () => {
        axios.delete(`/api/product/${prodnum}`)
        alert("상품 삭제 완료!")
        navigate("/product/list")
    }
    const clickList = () => {
        navigate("/product/list")
    }

    return (
        <>
            {loginUser != null?<Header loginUser={loginUser}></Header>:<></>}
            <div id="wrap" className="get">
                <div id="get">
                    <div className="row">
                        <div className="prodname">상품명</div>
                        <div className="get_area">
                            {product.prodname}
                        </div>
                    </div>
                    <div className="row">
                        <div className="userid">판매자</div>
                        <div className="get_area">
                            {product.userid}
                        </div>
                    </div>
                    <div className="row">
                        <div className="prodprice">판매 가격</div>
                        <div className="get_area">
                            {product.prodprice}
                        </div>
                    </div>
                    <div className="row">
                        <div className="prodprice">판매 수량</div>
                        <div className="get_area">
                            {product.prodamount}
                        </div>
                    </div>
                    <div className="row">
                        <div className="prodprice">카테고리</div>
                        <div className="get_area">
                            {product.prodcategory}<span className="like" onClick={clickLike}>♡</span> <span>{product.likecnt}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="prodinfo">상품설명</div>
                        <div className="get_area">
                            <textarea name="prodinfo" defaultValue={product.prodinfo} readOnly></textarea>
                        </div>
                    </div>
                    <div className="btn_area center">
                        {
                            loginUser == product.userid?
                            <>
                                <Button value="수정" onClick={clickModify}></Button>
                                <Button value="삭제" onClick={clickRemove}></Button>
                            </>:
                            <></>
                        }
                        <Button value="목록으로" size="common" onClick={clickList}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Get;