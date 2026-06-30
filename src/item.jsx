import { Children } from "react";

export function User({data}){
  return(
    <div>
        <h2 style={{
         color:"blue",
         border:"1px solid red",
         height:"100px",
         width:"300px",
        }}>
          name:{data.Name}
          <br></br>
           age:{data.Age},
           <br></br>
           email:{data.Email}
           <br></br>
           id:{data.id}
        </h2>
        
    </div>
  )
}

