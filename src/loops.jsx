import { User } from "./item.jsx";
function Loops() {
  const arr = ["raju", "kaju", "hiru"];

  const userdata = [
    {
      Name: "Nikhil",
      Age: 34,
      Email: "np@gmail.com",
      id: 1,
    },
    {
      Name: "Patil",
      Age: 21,
      Email: "patil@gmail.com",
      id: 2,
    },
  ];

  return (
    <div>

    {
    userdata.map((item)=>(
          <div key={item.id}>
            <User data={item} />
          </div>
       ))
    } 
     {/* <h1>using loops and maps</h1>
       <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>ID</th>
        </tr>
      </thead>

      <tbody>

        {userdata.map((item) => (
          <tr key={item.id}>
            <td>{item.Name}</td>
            <td>{item.Age}</td>
            <td>{item.Email}</td>
            <td>{item.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
      <h1>using default values</h1>
      <table border="1">
        <thead>
         
          <tr>
            <td>Name</td>
            <td>Age</td>
            <td>Email</td>
            <td>ID</td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Nikhil</td>
            <td>21</td>
            <td>np927@gmail.com</td>
            <td>1</td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default Loops;