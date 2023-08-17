import React,{useState , useEffect} from 'react'
import { ethers } from "ethers";
import abi from "./ABI.json"
import "./styles/image.css"

function Image() {

    const [state , setState]=useState({
        provider:null,
        signer:null,
        address:null
    })

//address
const [Addresss, setAddresss]=useState();

const contractAddress="0xED8EcAd5D0e9c8c6BcC651A4197FC1ffE226Ba8f";


useEffect(()=>{
  const Checker=async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const account=await provider.send("eth_requestAccounts", []);
    const signer=provider.getSigner()
    const address = await signer.getAddress()
    // console.log("this is account " + account)
    // console.log("this is signer " + signer.toString())
    // console.log(address)
    setAddresss(address)
    setState({provider , signer , address})   


  }

  Checker()
},[])



const { provider } = state;
const contract = new ethers.Contract(contractAddress, abi, provider);
const [display, setDisplay] = useState([]);

useEffect(() => {
  displayImage();
}, [state]);

const displayImage = async () => {

    if (!provider) return; // Check if provider is available
  try {

    const userInformation = await contract.getObjects();
    console.log(userInformation);

    

    setDisplay(userInformation);
  } catch (error) {
    console.error('Error retrieving user information:', error);
    console.log(error)
  }
};

  
  return (
    <div>

<div className="allbackground"> 

<div className="flex-image">


 

   {display.length > 0 ? (
     display.map((item, index) => (

            
       <div key={index} className='images'>
         <img src={item.image}  style={{width:"300px" , height:"200px" , margin:"auto"  , borderRadius:"20px"}} alt="Image"  />
         <h1><p>name || {item.name}</p></h1>
         <h2>country || {item.country}</h2>
         </div>
  
     ))
   ) : (
     <p>No image information available.</p>
   )}
{/* <h1>{display > 0 ? display : "not"}</h1> */}
</div>
</div>
 </div>

  )
}

export default Image