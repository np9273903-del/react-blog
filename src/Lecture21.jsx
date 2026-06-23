import { useState } from "react";

function Lecture21() {
//    const [val,setval]=useState("");
    //   const [currstate,newstate]=useState("");
    //   function newfun(event){
    //     newstate(event.target.value);
    // 
      const [currname,newname]=useState("");
      const [currpassword,newpassword]=useState("");
      const [curremail,newemail]=useState(""); 
      function fun(event){
        newname(event.target.value);
      }
      function fun1(event){
        newpassword(event.target.value);
      }
       function fun2(event){
        newemail(event.target.value);
      }
      function clearfunction(){
        newname("");
        newpassword("");
        newemail("");
      }
    return (
    <div>
      {/* <h1>Lecture 21 Component</h1>
      <h1>get input field value</h1> */}
      {/* <input type="text" value={val} onChange={(event)=>setval(event.target.value)} placeholder="enter username"/>
      <h1>{val}</h1>
      <button onClick={()=>setval("")}>click</button> */}
      {/* <input type="text"  value={currstate} onChange={newfun} placeholder="username"/>
      <h1>{currstate}</h1>
      <br></br>
      <input type="text" value={currstate}  onChange={newfun}  placeholder="username"/>
      <h1>{currstate}</h1>
      <br></br>
      <input type="text"  value={currstate}  onChange={newfun}  placeholder="username"/>
      <h1>{currstate}</h1> */}
      
       <input type="text" value={currname} style={{
    padding: "10px",
    margin: "10px",
    border: "2px solid black",
    borderRadius: "5px"
  }} onChange={fun} placeholder="Enter Name"/>
        <br></br>
       <input type="text" value={currpassword} style={{
    padding: "10px",
    margin: "10px",
    border: "2px solid black",
    borderRadius: "5px"
  }} onChange={fun1} placeholder="ENTER PASSWORD"/>
        <br></br>
       <input type="text" value={curremail} style={{
    padding: "10px",
    margin: "10px",
    border: "2px solid black",
    borderRadius: "5px"
  }} onChange={fun2} placeholder="enter email"/>
        <br></br>
       <button>submit</button>  <button onClick={clearfunction}>clear</button>
        <h1>{currname}</h1>
        <h1>{currpassword}</h1>
        <h1>{curremail}</h1>
    </div>
  );
}

export default Lecture21;