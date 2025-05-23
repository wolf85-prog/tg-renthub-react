import React, {useState, useRef, useEffect} from 'react';
import drp from './Dropdown2.module.css'
import Close from "../../img/close.svg"

const Dropdown2 = ({options, tags, setTags, widthStyle}) => {
    const [menuShow, setMenuShow] = useState(false)
    const [selected, setSelected] = useState(options[0])
    const [showClose, setShowClose] = useState(false)

    //console.log(spec)

    const selectOption = e => {
        
        const res = tags.find(item => item === e.target.innerText)
        if (!res) {
            tags.push(e.target.innerText)
            setTags(tags) 
        } else {
            console.log('Специальность уже существует!')
        }
        
        //console.log("spec: ", tags)
        setMenuShow(!menuShow)
    }

    function removeTag(index, e){
        e.stopPropagation();
        setTags(tags.filter((el, i) => i !== index))
    }


    const specList = tags.map((item, i) =>
       // if (item !== 'Blacklist') {
            <li key={i} onMouseOver={()=>setShowClose(true)} onMouseOut={()=>setShowClose(false)}>
                {item}<div style={{position: 'relative'}}><img src={Close} onClick={(e) => removeTag(i, e)} width={15} alt='' className={drp.close} style={{visibility: showClose ? 'visible' : 'hidden'}}></img></div>
            </li>
       // }
    )

    const dropdownList = options.map((option, i) =>
        <li key={i} onClick={selectOption} style={{color: `${option.color}`}}>{option.label}</li>
    )

    const wrapperRef = useRef(null);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            //alert("You clicked outside of me!");
            setMenuShow(false)
            event.stopPropagation();
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef ]);

    return (
        <div className={drp.dropdown} ref={wrapperRef}>
            <ul onClick={()=>setMenuShow(!menuShow)} className={`${drp.speclist}`} style={{width: widthStyle}}>
                {specList}
            </ul>

            <ul className={`${drp.menu} ${menuShow && drp.menuOpen}`} style={{display: menuShow ? 'block' : 'none', listStyle: 'disc', padding: '0.2em 2.0em'}}>
                {dropdownList}
            </ul>
        </div>
    );
};

export default Dropdown2;