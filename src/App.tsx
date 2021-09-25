import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import GetUser from './components/GetUser';
import NavBar from './components/NavBar';
import { IResponseUser } from './data/user/userModel';
import { useActions } from './hooks/useActions';
import { useTypeSelector } from './hooks/userTyprSelector';


function App() {
  //#region set State hook
  const [user,setUser] = useState<IResponseUser>();
  const [spinnerShow,setSpinnerShow] = useState(false);
  //#endregion

  //#region set redux hooks
  const {getCurrentUserWithJWT} = useActions();
  const {data,loading,error} = useTypeSelector((state)=>state.userState)
  //#endregion

  //#region method
  // using the JWT get user info
  const getUserForCurrent= async ()=>{
    const token = localStorage.getItem('token');
    if(token){
      getCurrentUserWithJWT()
    }
    if(error){
      console.log(error)
    }
    if(data){
      setUser(data)
    }
  }
  //#endregion

  //#region set life cycle hooks 
  useEffect(()=>{
    getUserForCurrent();
    if(loading){
      setSpinnerShow(true);
    }
    if(!loading){
      setSpinnerShow(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loading,user])
  //#endregion

  return (
      <div className="App">
        <NavBar/>
        {spinnerShow&&(
          <Spinner animation="border" className="align-middle"/>
        )}
        <GetUser/>
       </div>
  );
}

export default App;
