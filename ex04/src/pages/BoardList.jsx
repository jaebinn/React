import useBoardList from "../hooks/useBoardList";

const BoardList = () => {
    
    const {list, write, remove} = useBoardList("board");
    
    return (
        <>
            <ul>
                {
                    list.map(
                        (board)=>{
                            const {num,key,type} = board;
                            const clickRemove = (e)=>{
                                e.preventDefault();
                                remove(key);
                            }
                            return (
                                <li className={`r${num} ${type}`} key={key}>
                                    게시글 번호 {num} - {key}번째 게시글
                                    <a href="#" onClick={clickRemove}>삭제</a>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <input type="button" value="게시글 추가" onClick={write}/>
        </>
    )
}
export default BoardList;