import {useState} from "react";
function Count(){
    let [Count1,SetCounter]=useState(0);
      let handlecount = () => {
    SetCounter(Count1+1);
  };  
    return (
        <div>
            <h1>{Count1}</h1>
        <button onClick={handlecount}>icrement</button>
        </div>
    )
}

export default Count;