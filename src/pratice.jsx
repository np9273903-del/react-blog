//importing states
import {Children, useState} from "react";


function Add(a,b){
    return a+b;
}

//using object

let Student={
    Name:"nikhil",
    age:34,
    email:"np9273903@gmail.com",
}

let fruits=['apple','mango','banana','jackfruit'];



function Pratice1(){
    let value="nikhil";
    let [animal,newanimal]=useState("TIGER");
    function change(){
    newanimal("DOG");
}
  let [display,setdisplay]=useState("false");
  function Fun(){
    setdisplay(true);
  }
    let age=19;
    const [status, setStatus] = useState(false);
    return(
        <div>
     <h1>{status ? "ON" : "OFF"}</h1>

      <button onClick={() => setStatus(!status)}>
        Toggle
      </button>
    </div>

            
        // {age<18?<h1>child</h1>:<h1>mature</h1>}
        //  <h1>name:{animal}</h1>
        //  <button onClick={change}>onclickanimal</button>
        //  {display?<h1>working</h1>:null}
         
        

    )
}


export function Pratice2({User}){
    return(
      <div>
        <h1>{User.name}</h1>
       <h1>{User.email}</h1>
      </div>
    )
}


export function Color1({children}){
  return(   
    <div>
  <h1 style={{
    color:"blue"
  }}>hello</h1>
  {children}
    </div>
  )
 
}

export default Pratice1;
