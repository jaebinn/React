import {useRef, useState} from 'react'
const useBoardList = () => {
    const [list, setList] = useState([]);
    const NUM = useRef(0);
    const KEY = useRef(0);

    const remove = (key) => {
        for(let i = 0; i< list.length; i++){
            if(list[i].key == key){
                list[i] = null;    
            }
            else if(list[i].key > key){
                list[i].key -= 1;
            }
        }
        KEY.current -= 1;

        setList(list.filter(
            (item) => item != null
            )
        );
    }
    const write = () => {
        const board ={key:KEY.current, num:NUM.current}
        NUM.current += 1;
        KEY.current += 1;

      
        setList(
            (prevList)=>[board,...prevList]
        );
    }
}
export default useBoardList;