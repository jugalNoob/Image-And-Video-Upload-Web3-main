import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from './ABI.json';
import "./styles/video.css"

import { Web3Storage } from 'web3.storage';

function Video() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    address: null,
  });

  // Address
  const [address, setAddress] = useState();

  const contractAddress = '0xED8EcAd5D0e9c8c6BcC651A4197FC1ffE226Ba8f';

  useEffect(() => {
    const connectWallet = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setAddress(address);
      setState({ provider, signer, address });
    };

    connectWallet();
  }, []);

  const { provider } = state;
  const contract = new ethers.Contract(contractAddress, abi, provider);
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    displayMedia();
  }, [state]);

  const displayMedia = async () => {
    if (!provider) return; // Check if provider is available

    try {
      const mediaInformation = await contract.CheckVideoUpload();
      console.log(mediaInformation);

      setDisplay(mediaInformation);
    } catch (error) {
      console.error('Error retrieving media information:', error);
      console.log(error);
    }
  };



 
  return (
    <div>
  


<div className="videoallbackground"> 

<div className="flex-video">


 

   {display.length > 0 ? (
     display.map((item, index) => (

            
   
      <div key={index} className="videos">
              <video
                src={item.video}
                style={{ width: '250px', height: '250px', margin: 'auto' }}
                controls
              >
                  
              </video>
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
            
  );
}

export default Video;





