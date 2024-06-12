const BoardList = ({list,remove,write}) =>{
    return (
        <>
            <ul>
                {
                    list.map(
                        (board)=>{
                            const {num,key} = board;
                            const clickRemove = (e)=>{
                                e.preventDefault();
                                remove(key);
                            }
                            return(
                                <li className ={`r${num}`} key ={key}>
                                    게시글 번호 {num} - {key}번째 게시글
                                    <a href="#" onClick={clickRemove}>삭제</a>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <input type ="button" value="게시글 추가" onClick={write}/>
        </>
    )
}
export default BoardList;