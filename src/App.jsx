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
   let arr=['one','two','three','four','five'];
   let [Student1,newname]=useState("sam");
    function change(){
         newname("nikhil");
   } 
   return (
     
      <div>
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