import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import Header from "../../layout/Header";

const List = () => {
    const [pagenum, setPagenum] = useState('1');
    const [category, setCategory] = useState("all");
    const [data, setData] = useState();
    const navigate = useNavigate();

    const elList = [];
    const pagination = [];
    useEffect(()=>{
        axios.get(`/api/product/list/${pagenum}/${category}`)
        .then(resp=>{
            setData(resp.data);
        })
    },[pagenum,category])
    if(!data){
        return <>로딩중...</>
    }
    else{
        let list = data.list;
        let page = data.page;
        let len = 0;
        console.log(list, page);
        if(list && list.length > 0){
            len = list.length;
            for(let i=0;i<len;i++){
                let product = list[i];
                const clickProduct = () => {
                    navigate(`/product/get/${product.prodnum}`);
                }
                elList.push(
                    <div className="row" key={i} onClick={clickProduct}>
                        <div className="prodnum">{product.prodnum}</div>
                        <div className="prodname"><span className="prodcategory">[{product.prodcategory}]</span>{product.prodname}</div>
                        <div className="regdate">{product.regdate}</div>
                        <div className="userid">{product.userid}</div>
                    </div>
                )
            }
        }
        else{
            elList.push(
                <div className="row" key="0">
                    등록된 상품이 없습니다.
                </div>
            )
        }
        const changePage = (e) => {
            e.preventDefault();
            let target = e.target.getAttribute("href");
            setPagenum(target);
        }
        const changeCategory = (value) => {
            setCategory(value);
            setPagenum('1');
        }

        if(page.startPage != 1){
            pagination.push(<a className="arrow" href={1} onClick={changePage} key="first">&lt;&lt;</a>)
        }
        if(page.prev){
            pagination.push(<a className="arrow" href={page.startPage-1} onClick={changePage} key={"prev"}>&lt;</a>)
        }
        for(let i=page.startPage; i<=page.endPage; i++){
            pagination.push(
                i == page.cri.pagenum ? 
                <span key={i}>{i}</span> :
                <a href={i} onClick={changePage} key={i}>{i}</a>
            )
        }
        if(page.next){
            pagination.push(<a className="arrow" href={page.endPage+1} onClick={changePage} key="next">&gt;</a>)
        }
        if(page.endPage != Math.ceil(page.total/10)){
            pagination.push(<a className="arrow" href={parseInt(Math.ceil(page.total/10))} onClick={changePage} key={"last"}>&gt;&gt;</a>) 
        }

        const categories = ["전체","패션의류/잡화","뷰티","출산/유아동","식품","주방용품","생활용품","홈인테리어","가전디지털","스포츠/레저","자동차용품","도서/음반/DVD","완구/취미","문구/오피스","반려동물용품","헬스/건강식품"]
        const selectCategory = (value) => {
            changeCategory(value);
        }
        return (
            <>
                <Header loginUser={data.loginUser}></Header>
                <div id="wrap" className="list">
                    <div className="category">
                        <div className="total">총 상품 : {page.total}</div>
                        <Dropdown list={categories} width={200} name={"category"} onChange={selectCategory}/>
                    </div>
                    <div id="list" className={list && len > 0?'':'empty'}>
                        <div className="row">
                            <div className="prodnum">상품번호</div>
                            <div className="prodname">상품명</div>
                            <div className="regdate">등록시간</div>
                            <div className="userid">판매자</div>
                        </div>
                        {elList}
                    </div>
                    <div className="pagination">
                        {pagination}
                    </div>
                    <div className="btn_area">
                        <Button value="상품등록" onClick={() => { navigate("/product/add") }}></Button>
                    </div>
                </div>
            </>
        )
    }
}
export default List;