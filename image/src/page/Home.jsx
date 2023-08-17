import React,{useContext , useReducer} from 'react'
import { Link } from "react-router-dom";
import "./styles/home.css"
import five from "./styles/img/five.png"
import homes from "./styles/img/home.png"
import { UserContext } from '../App';
function Home() {

  
  const {state , dispatch}= useContext(UserContext);

  const Render=()=>{

    if(state){

      return(

<>

 <Link to="/">home</Link>
<br />

<Link to="/image">image</Link>
<br />
<Link to="/video">video</Link>
<br/>
<Link to="/chat">chat</Link>
<br />
<Link to="/logout">logout</Link>

{/* //Logout line last row class */}

</>

      )
    }else{

      return(
<>
<Link to="/">home</Link>
<br />

<Link to="/upload">upload</Link>
<br />

<Link to="/form">form</Link>
<br />

<Link to="/login">login</Link>
<br />


</>

      )
    }

  }




  return (
    <div>

      <div className='homebackgorund'>

<div className='flex-home'>

  <div div className='head-one'>
    <h1>welcome web3 ipsf</h1>
    </div>

    <div className='home-img'>
<img src={five} alt=''/>
    </div>

    <div className='nav'>
    {/* <Link to="/">home</Link>
      <br/>
      <Link to="upload">upload</Link>
      <br/>
      <Link to="form">form</Link>
      <br/>
      <Link to="login">login</Link>
      <br/>
      <Link to="/video">video</Link>
      <br/>
      <Link to="/image">image</Link> */}

      <Render/>
    </div>
</div>

<div className='flex-second'>

<div className=' head-second'>
<h1>upload image and video</h1>
<h2>use ipsf and decentralised</h2>

{/* <Link to="/">Home</Link> */}
</div>

<div className='img-scond'>
<img src={homes} alt=''></img>
</div>

</div>


      </div>
      

    </div>
  )
}

export default Home