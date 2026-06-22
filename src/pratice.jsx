//importing states
import {useState} from "react";


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
    return(
        <div>
        
         <h1>name:{animal}</h1>
         <button onClick={change}>onclickanimal</button>
        
           
         </div>

    )
}

export default Pratice1;
