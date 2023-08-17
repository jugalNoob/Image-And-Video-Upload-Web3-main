import React,{useState} from 'react'
import "./styles/form.css"
import { Link,useNavigate } from 'react-router-dom'

function Form() {
  const navigate=useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };


  const handleValidation = () => {
    let errors = {};

    if (!user.name) {
      errors.name = "Please enter your name";
      alert("please enter your name")
    } else if (user.name.length < 3) {
      errors.name = "Name should be at least 3 characters long";
      alert("name should be al last 3 character long")
    } else if (!isNaN(user.name)) {
      errors.name = "Name should contain at least one character";
      alert("don't add numbers")
    }

    if (!user.password) {
      errors.password = "Please enter your password";
    } else if (user.password.length < 3) {
      errors.password = "Password should be at least 3 characters long";
      
    } 


    setErrors(errors);
  };

  const addUserdata = async (e) => {
    handleValidation();
    e.preventDefault();
 
 
    const {name, email, password } = user;
  
    if (!name || !email || !password) {

      // alert("missing required  fields")
      throw new Error('Missing required fields');
    }
  
    const data = await fetch("/Signup", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          name, email, password
      })
  });

  const res = await data.json();
  // console.log(res.status);

  if (res.status === 201) {
    alert("check your form ")
  
  }else{
    navigate("/")
  }
  
}
  return (
    <div>

<div className='background-form'>

    <div className='form-center'>

        <div className='form'>

    


        <center>

        <form>





<input type="text" name="name" value={user.name} onChange={handleChange} 
          style={{ borderColor: errors.name && "red" }} placeholder='name'/>
        {/* {errors.name && <p>{errors.name}</p>} */}
<br/>


<input type="email" name="email" value={user.email} onChange={handleChange} placeholder=" email" />
<br/>

<br/>
<br/>
<input type="password" name="password" value={user.password} onChange={handleChange} placeholder=" password"  
          style={{ borderColor: errors.password && "red" }}/>
       {/* // {errors.password && <p>{errors.password}</p>} */}
<br/>

<br/>
<br/>

<button onClick={addUserdata}>sigin</button>
  

        </form>
        </center>
      
    
        </div>
    </div>
</div>

    </div>
  )
}

export default Form