import { useEffect, useRef, useState } from "react";

const Dropdown = ({list, name, width, onChange, value}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedItem = useRef("");
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    const clickElement = (e) => {
        const value = e.target.innerHTML;
        selectedItem.current = value;
        document.getElementById(name).value = value;
        if(value == "전체"){
            document.getElementById(name).value = 'all';
        }
        setIsOpen(false);
        if(onChange){
            onChange(document.getElementById(name).value);
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
                setIsOpen(false);
            }
        }
        document.addEventListener('click',handleClickOutside);

        return () => {
            document.removeEventListener('click',handleClickOutside);
        }
    },[])

    return (
        <div ref={dropdownRef} className={`common-dropdown ${isOpen?'show':''}`} style={{width:`${width}px`}}>
            <input type="hidden" value={selectedItem.current} name={name} id={name}></input>
            <input type="button" className="dropdown-button" value={selectedItem.current == "" ? (value?value:"카테고리") : selectedItem.current} style={{width:`${width}px`}} onClick={toggleDropdown}></input>
            <div className={`dropdown-content ${isOpen?'show':''}`}>
                <ul style={{width:`${width}px`}}>
                    {
                        list.map((item) => {
                            return <li key={item} onClick={clickElement} style={{width:`${width}px`}}>{item}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
export default Dropdown;