import Header from "./header"
import First,{First1,Name} from "./Components"
import Project from "./jsxa"
import Lecture13 from "./Lecture13"
import {useState} from "react";
import Count from "./counter";
import Lecture18 from "./Lecture18";
import User from "./lecture19User.jsx"
import College from "./College.jsx"
import Student from "./student.jsx"
import Pratice1 from "./pratice.jsx"
import {Pratice2} from "./pratice.jsx"
import Use from "./Lecture20.jsx"
import Wrapper1 from "./Wrapper.jsx"
import Lecture21 from "./Lecture21.jsx";
import Checkboxes from "./checkbox23.jsx"
import YouBox  from "./project.jsx";
import {Color1} from "./pratice.jsx"
import Loops from "./loops.jsx"
import Clock from "./clock.jsx"
function App(){

   const [fruit,setfruit] =useState("apple");
     const handleFruit = () => {
    setfruit("banana");
  };  
  
  let [display,setdisplay]=useState("true");
  function Fun(){
    setdisplay(!display);
  }
   let [Count1,SetCounter]=useState(0);
   let Username="nikhil";
   let age=29;
   let object={
    name:"nikhil",
    age:24,
   }

   let object1={
    name:"purva",
    age:4,
   }
  
   let object3={
    name:"shubhada",
    age:24,
   }

   let Studentdata={
    name:"Nikhil",
    age:23,
    email:"np9273903@gmail.com",
   }
   let arr=['one','two','three','four','five'];
   let [Student1,newname]=useState("sam");
    function change(){
         newname("nikhil");
   } 
   const [currname,newn]=useState("");
  function S(event){
      newn(event.target.value);
   }
   const [gender,setgender]=useState('female');
   function radi(event){
     setgender(event.target.value);
   }
   const [city,selected]=useState('delhi');
   function selection(event){
       selected(event.target.value);
   }
   const [color,changecolor]=useState("red")
   function change(event){
    changecolor(event.target.value)
   }
   
   return (
      
      <div>
        <select onChange={change}>
          <option value={"red"}>red</option>
          <option value={"blue"}>blue</option>
          <option value={"green"}>green</option>
          <option value={"orange"}>orange</option>
        </select>
        <Clock color={color}/>
        <Loops/>
        <h1>Handle radio and dropdown</h1>
        <input type="radio" onChange={radi} name="gender" value="male" id="male"/>
        <label htmlFor="male">Male</label>
        <input type="radio" onChange={radi}  name="gender" value="female" id="female"/>
        <label htmlFor="female">female</label>   
          <h2>Selected Gender:{gender}</h2>
          <Checkboxes/>
        
        <br>
        </br>

        <select onChange={selection} defaultValue={"delhi"}>
          <option value="noida">Noida</option>
          <option vallue="gurgaon">Gurgaon</option>
          <option value="delhi">delhi</option>
         </select>
        <h2>Selected city:{city}</h2>

      <input 
      value={currname}
      style={{
        height:"50px",
        width:"100px",
        border:"2px solid black",
      }} 
      onChange={S}
      type="text" placeholder="enter the name"/>
       {currname}
        <Color1/>
        {/* <h1 style={{
          color:"red",
          height:"100px",
          width:"100px",
        }}>
        Hello
        </h1> */}
         {/* <YouBox/> */}
      
           <Lecture21 />
        <Wrapper1 color="orange">
          <h1>HELLO</h1>
        </Wrapper1>
         <Wrapper1 color="blue">
          <h1>MELLO</h1>
          <h1 style={{
            color:"red",
          }}>nikhil</h1>
        </Wrapper1>
        <Use />
        <Use name="nikhil"/>
       <Pratice2 User={Studentdata} />
       {/* <Pratice2 name="nikhil"/> */}
       {/* <Pratice1/> */}

       {/* <College name={arr}/>  */}
       <Student name={Student1}/>
       <button onClick={change}>student button</button>
      {/* lecture18 can create multiple objects*/}
      <User User={object}/>
      <User User={object1}/>
      <User User={object3}/>
       {/* <User name={Username} age={age}/> */}
       <Lecture18 />;
       {display ? <h1>Hello</h1> : null}
       <button onClick={Fun}>toggle</button>
      
      
     <h1>{fruit}</h1>
      <button onClick={handleFruit}>change fruit name</button>
     </div>
    //   <div>
    //   <h1>hello 1 i am called by App {Name}</h1>
    //   <Hello />
    //   <First />
    //   <First1 />
    //   <h1>Using jsx because of react we can write html</h1>
    //   <h1>{10+20}</h1>
    //   <button>click</button>
    //  </div>
       
        // <div>
        //   <h1>hello</h1>
        //    <Project />

    //     // </div>
    //     <div>
    //       <Lecture13 />
    //     </div>
     )
}

function Hello(){ //components
  return (
    <h1>hello 2 i am called by Components
    </h1>
  )
}
export default App
//App react component first letter is
//is capital letter then it differ from a
//html tag and react component