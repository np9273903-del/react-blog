import { useEffect } from "react";

function CounterDisplay({aa}) {
 
    function hello(){
    console.log("hey");
                              }
   
      useEffect(()=>{
     hello()
        },[]);
    //use useEffect to stop multiple 
    //exceution of the code
    return (
    <div>
        <h1>Hello Counter using Props</h1>
       <h1>{aa}</h1>
     </div>
  );
}

export default CounterDisplay;