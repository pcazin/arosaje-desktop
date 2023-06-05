import React, { useState } from "react";
import "./styles.css";
import CloseIcon from '@mui/icons-material/Close';

export default function SearchBar() {

    const [value, setValue] = useState<string>("")

    return (
       <div className="bar flex">
            <input className="searchbar w-5/6" style={{height: "32px"}} type="text" value={value}  onChange={e => {
                console.log(e)
                if(value.length <= 30) {
                    setValue(e.target.value)
                }
            }}/>
            <CloseIcon onClick={e => setValue("")} className="absolute right-2 top-2"/>
        </div>
    )
}