function Checkboxes(){
   
    return(
        <div>
            <h3>select your skills</h3>
           <input  type="checkbox" id="php"/>
           <label htmlFor="php">php</label>
           <br />
           <input type="checkbox" id="java"/>
           <label htmlFor="java">java</label>
           <br />
           <input type="checkbox" id="c++"/>
           <label htmlFor="c++">c++</label>
            <br />
           <input type="checkbox" id="devops"/>
           <label htmlFor="devops">devops</label>

        </div>
    )
}

export default Checkboxes;
