import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import NavBar from './components/NavBar';
import { useTypeSelector } from './hooks/userTyprSelector';

function App() {
  const [spinnerShow,setSpinnerShow] = useState(false);
  const {loading}=useTypeSelector((state)=>state.userState)
  useEffect(()=>{
    if(loading){
      setSpinnerShow(true);
    }
    if(!loading){
      setSpinnerShow(false);
    }
  },[loading])
  return (
      <div className="App">
        <NavBar/>
        {spinnerShow&&(
          <Spinner animation="border" className="align-middle"/>
        )}
       </div>
  );
}

export default App;
