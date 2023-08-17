import React,{useState,useContext} from 'react'
import "./styles/login.css"
import { Link,useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

function Login() {
  const {state , dispatch}= useContext(UserContext);
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    // if (!name) {
    //   errors.name = 'Name is required';
    // }else if(name.length<7){
    //   errors.name = 'add more word';
    // }

    if (!email) {
      errors.email = 'Email is required';
      alert("enter a email")
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      alert("Email is invalid")
    }

    if (!password) {
      errors.password = 'Password is required';
      alert("enter a password")
    }else if(password.length<7){

      errors.password = 'enter more word';
      alert("enter more word")
    }

    return errors;
  };

  const handleSubmit =async (event) => {
    event.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length === 0) {
      // Submit form
    } else {
      setErrors(errors);
    }

    console.log(errors)


    const users=await fetch("/signin",{
      method:"POST",
      headers:{
      "Content-Type": "application/json",
      },
      body:JSON.stringify({

      email,
      password,
      })
      })    
      const res=await users.json();

      if(users.status === 400 || !res){
        window.alert("please enter your Login")
  alert("please enter your Login")
  
    }else{
      // localStorage.setItem("usersdatatoken",res.result.token);
      dispatch({type:'user' , payload:true})
      alert("is complete")
     navigate("/")
     localStorage.setItem("usersdatatoken",res.result.token);
    }

  };

  return (
    <div>

<div className='background-form'>

    <div className='form-center'>

        <div className='form'>

        <h1>signup your account</h1>

<center>


<form onSubmit={handleSubmit}>



<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter a email" />
         {/* <p>  {errors.email && <span>{errors.email}</span>}</p> */}
<br/>
<br/>
<br/>
<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="enter a password" />
     {/* //  <p> {errors.password && <span>{errors.password}</span>}</p>  */}
<br/>
<br/>
<br/>
<button type="submit">Submit</button>

        </form>
        <h2>already signup <Link to="/">home</Link> </h2>
        </center>
        </div>
    </div>
</div>

    </div>
  )
}

export default Login