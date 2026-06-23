function Wrapper1({children,color="green"}){
    return(
        <div style={{
    color:color,
    border:"5px solid green",
    width:"300px",
    margin:"10px",
    }}>
          {children}
            {/* <h1>HELLO EVERYONE</h1> */}
        </div>
    )
}

export default Wrapper1;