import {useEffect, useState} from 'react';


export function UseEffect(){
    const [counter,setcounter]=useState(0);
    const [data,setdata]=useState(0);
    function call(){
        console.log("callonce function");
        
    }
    useEffect(()=>{
 call();
    },[counter])
   
    return(
        <div>
        <button onClick={()=>{
           setcounter(counter+1);
        }}>click{counter}</button>
         <button onClick={()=>{
           setdata(data+1);
        }}>data{data}</button>
        </div>
    )
}