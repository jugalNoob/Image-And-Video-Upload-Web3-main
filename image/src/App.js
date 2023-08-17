import React, { createContext, useReducer, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Upload from './page/Upload';
import Form from './page/Form';
import Login from './page/Login';
import Logout from './page/Logout';
import Image from './page/Image';
import Video from './page/Video';
import Chat from './page/Chat';

import { initialState, reducer } from '../src/reducer/UserReducer';

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <UserContext.Provider value={{state , dispatch}}>
      <Routes>
        <Fragment>
     
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/form" element={<Form />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/image" element={<Image></Image>}/>
            <Route path="/video" element={<Video></Video>}/>
            <Route path="/chat" element={<Chat></Chat>}/>
        </Fragment>
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
