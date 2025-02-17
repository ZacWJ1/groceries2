import React,{useEffect, useState} from 'react';

const Loader = () => {
    const[text,setText]=useState('');
    const[showImg,setShowImg]=useState(true)


    useEffect(()=>{
        setTimeout(()=>{
            setShowImg(false)
            SetText(
                "Loading"
            )
        },3000)
    })

  return (
    <div>
      showImg ? (
            <img src="groceries2/src/assets/spinner.gif" />
      ) :(
        <h3>{text}</h3>
      )
    </div>
  )
}

export default Loader
