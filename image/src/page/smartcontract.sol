// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Upload{

    

 struct Object {
            string image;
            string name;
    string country;
    // address _add;
    }

      mapping (address=>Object[]) NFTOwners;
   Object[] public objects;


      function getObjects() public view returns(Object[] memory){
        return objects;
    }

    
  function UploadInformation(string memory _image,string memory _name , string memory _country)public{


// require(_age > 18 , "enter your greater the 18");

// require(_add != address(0) , "enter your address");

Object memory Pushing=Object( _image  , _name , _country );

objects.push(Pushing);
NFTOwners[msg.sender].push(Pushing);


}
 

    function getOwnerObjects() public view returns(Object[] memory){
        return NFTOwners[msg.sender];
    }


    //Video upload part /////////////////////////////////////////////
struct Videos{

    string video;

string name;
    string country;
}

mapping (address=> Videos[]) private AllVideo;

Videos[] public  videos;


function CheckVideoUpload()public view returns(Videos[] memory){

  return videos;
}

function UploadVideo(  string memory _video,string memory _name , string memory _country)public{

Videos memory senders=Videos(_video ,_name, _country);
videos.push(senders);
AllVideo[msg.sender].push(senders);
}

function CheckUploadVideo()public view returns(Videos[]memory){

    return AllVideo[msg.sender];
}

}



