







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

let arr=['nikhil','patil','purva','dattu','dilip']
function sum(a,b){
  return a+b;
}
const login=false;
export function Jsx(){
     return(
      <div>
        <h1>{arr[0]}</h1>
        <h1>{arr[1]}</h1>
        <h1>{sum(1,2)}
         
        </h1>
         <h1>{login?"welcome":"failed"}</h1>
      </div>
     )
}





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

const obj={
    Name:"nikhil",
    age:13,
    email:"np9273903@gmail.com"
  }


export function JulyNine(){
  function alu(){
    console.log("clicked");
    
  }
  function sum(a,b){
return a+b;
  }
  const [sarthak,newsarthak]=useState("chutiya");
  function mustufa(){
    newsarthak(sarthak);
  }
    const [z,newz]=useState("0");
    const [on, setOn] = useState(false);
    const[login,islogin]=useState(0);
  return(
    <div>
      <h1>{login?"logged sucess":"login failed"}</h1>
      <button onClick={()=>{
        islogin(!login);
      }}>States</button>

      {
        login===0?<h1>login {login}</h1>
        :login===1?<h1>LOGIN {login}</h1>
        : <h1>Invalid</h1>     
      }
      <h1>{on ? "ON" : "OFF"}</h1>

      <button onClick={() => setOn(!on)}>
        Toggle
      </button>
    
      

      <h1>hello</h1>
      <li>
        hello 1
      </li>
      <li>
        hello 2
      </li>
      <h1>{sum(1,3)}</h1>
      <h1>Name</h1>
      <h1>{obj.Name}</h1>
    <button onClick={mustufa}>Phone</button>
     <h1>{sarthak}</h1> 
      <button onClick={alu}>click</button>
    </div>
  )
}

