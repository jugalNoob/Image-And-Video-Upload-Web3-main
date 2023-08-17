import React,{useState,useEffect} from 'react'
import "./styles/upload.css"
import { ethers } from "ethers";
import abi from "./ABI.json"
import { Web3Storage } from 'web3.storage';
import { Link,useNavigate } from 'react-router-dom'

function Upload() {
  
  const [userData , setUserData]=useState()
  const navigate=useNavigate()
//   const callAbout=async()=>{

//     try {
//       const res=await fetch("/Cont",{
// method:"GET",
// headers:{
//   Accept:"application/json",
//   "Content-Type": "application/json",
// },
// credentials:"include"

//       })

//       const data=await res.json()
//       console.log(data)
//       setUserData(data)
//       if(!res.status===200){
//         const error=new Error(res.error)
//         throw error;
//       }
      

//     } catch (error) {

//       console.log(error)
//       navigate("/login")
     
      
//     }

//   }
//   useEffect(()=>{
//     callAbout()
//   },[])





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

//Image upload web3 ipsf

const client = new Web3Storage({
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERFNjRjODIwMGM4MzdlZWVlMDE0NWIwNWM1MTFiZUFCYjFjMThlODUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzY1NDQ2MDQyNzEsIm5hbWUiOiJJbWFnZVVwIn0.FSNy4TIrk24P_bG8vAnB2PTI3rMb8paCPVwiwv_mrvE',
})


const [file, setFile]=useState("")

const [name , setName]=useState("")
const [selectedCountry, setSelectedCountry] = useState('');

const UploadImage=async(e)=>{
  const {signer}=state;

  const fileInput = document.querySelector('#files')
  e.preventDefault()
     const rootCid = await client.put(fileInput.files)
 
     console.log(rootCid)
     const res = await client.get(rootCid)
     console.log(res)
     const  files  = await res.files()
 
 
     for(let fil of files){
 
    let uploadUrl=`https://${fil.cid}.ipfs.w3s.link/?filename=${fil.name}`
 
    console.log(uploadUrl)
  const contractss=new ethers.Contract(contractAddress, abi , signer)

  const imageUpload=await contractss.UploadInformation(uploadUrl, name , selectedCountry);

  console.log(imageUpload)
}

}



//Video upload ////////////////////////////!SECTION

const [videos , setVideos]=useState("")

const [videoname , setVideoName]=useState("")
const [countrys, setCountrys]=useState("")


const UploadVideo=async(e)=>{
  const {signer}=state;

  const fileInput = document.querySelector('#filess')
  e.preventDefault()
     const rootCid = await client.put(fileInput.files)
 
     console.log(rootCid)
     const res = await client.get(rootCid)
     console.log(res)
     const  files  = await res.files()
 
 
     for(let fil of files){
 
    let uploadUrl=`https://${fil.cid}.ipfs.w3s.link/?filename=${fil.name}`
 
    console.log(uploadUrl)
  const contractss=new ethers.Contract(contractAddress, abi , signer)


  const imageUpload=await contractss.UploadVideo(uploadUrl, videoname , countrys);

  console.log(imageUpload)
}
}






  return (
    <div>
<div className='upload-background'>
<div className='image-upload'>
  <div className='image'>
<h1>image upload in web3 and ipsf</h1>
<form>
<input type="file" name=""  id="files"  onChange={(e)=>setFile(e.target.files[0])} />

  <label for="files">
  <span class="material-icons">
image
</span>

    upload a photo
  </label>
  <input type="text" name="" id=""  onChange={(e)=>setName(e.target.value)} placeholder='enter a name'/>
  <br/>
  <select name="select-box" onChange={(e)=>setSelectedCountry(e.target.value)}>
    <option value="" >select a country</option>
  <option value="AF">india</option>
  <option value="AL">usa</option>
  <option value="DZ">Japan</option>
</select>
<br/>
<br/>
<button onClick={UploadImage}> upload-Image</button>

</form>

  </div>
</div>


{/* video upload web3 */}


<div className='video-upload'>

  <div className='video'>

<h1>video upload in web3 and ipsf</h1>
<form>

<input type="file" name=""  id="filess"  onChange={(e)=>setVideos(e.target.files[0])} />

  <label for="filess">
  <span class="material-icons">
play_circle
</span>

    upload a videos
  </label>
  <input type="text" name="" id="" placeholder='describe' onChange={(e)=>setVideoName(e.target.value)} />
  <br/>
  <select name="select-box" onChange={(e)=>setCountrys(e.target.value)} >
    <option value="" >select a country</option>
  <option value="AF">india</option>
  <option value="AL">usa</option>
  <option value="DZ">Japan</option>
</select>
<br/>
<br/>
<button onClick={UploadVideo}>upload-Video</button>
</form>

  </div>
</div>
</div>

    </div>
  )
}

export default Upload