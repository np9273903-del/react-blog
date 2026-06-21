//props in react

// function User(data,age){
//     console.log(data);
//     console.log(age);
    
//     return(
//         <div>
//             <h2>Name:{.name}</h2>
//             <h2>age:{data.age}</h2>
//         </div>
//     )
    
// }

//---using object
function User({User}){
 
    return(
        <div>
            <h2>Name{User.name}</h2>
            <h2>age:{User.age}</h2>
            <hr></hr>
        </div>
    )
    
}

export default User