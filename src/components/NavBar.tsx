import React, { useState,useEffect} from 'react'
import { Button, Dropdown, DropdownButton, Form, FormControl, Modal, Nav, Navbar, NavDropdown, Toast} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt,faUserPlus,faAddressBook,faFile,faToolbox, faUser} from '@fortawesome/free-solid-svg-icons'
import ILogin from '../data/user/userModel'
import { useActions } from '../hooks/useActions'
import { useTypeSelector } from '../hooks/userTyprSelector'
import ToastContainer from 'react-bootstrap/ToastContainer'

const NavBar = () => {
    //#region set state
    const [searchTitle,setSearchTitle]=useState<string|null>("Search Type");
    const [loginModal,setLoginModal] = useState(false);
    const [username,setUsername] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [showToast,setShowToast] = useState(false);
    const [showErrorToast,setShowErrorToast] = useState(false);
    //#endregion

    //#region set redux hooks
    const {login,logout} = useActions();
    const {data,error,loading}=useTypeSelector((state)=>state.userState)
    //#endregion

    //#region set const or var
    const hrNavTitle = (<span>HR<FontAwesomeIcon className="ms-2" icon={faAddressBook}/></span>)
    const orderNavTitle = (<span>Order<FontAwesomeIcon className="ms-2" icon={faFile}/></span>)
    const toBeAddingNavTitle = (<span>To Be Adding<FontAwesomeIcon className="ms-2" icon={faToolbox}/></span>)
    const userIcon = (<FontAwesomeIcon className="ms-2" icon={faToolbox}/>)
    //#endregion
   
    //#region set functions
    const LoginSubmit=()=>{
        localStorage.removeItem('token')
        const loginUser: ILogin = {username,password}
        login(loginUser);
        setLoginModal(false);
    }
    //#endregion

    //#region set lifecycle
    useEffect(()=>{
        if(!loading&&data&&data!==null){
            localStorage.setItem('token',data.token);
            setShowToast(true)
        }
        if(!loading&&error&&error.length>0){
            setShowErrorToast(true)
        }
    },[data,error,loading])
    //#endregion
    
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" >
                <Navbar.Brand href="#home" className="ms-5">Order Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* start of dropdown select on the Navbar */}
                    <Nav className="ms-5 me-auto">
                        <NavDropdown className="ms-3 me-auto" title={hrNavTitle} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Department</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Employee</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown className="ms-3 me-auto" title={orderNavTitle} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Order</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Add Sale Order</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown className="ms-3 me-auto" title={toBeAddingNavTitle} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {/* end of dropdown select on the Navbar */}

                    {/* start of Search from */}
                    <Form  className="d-flex me-5 ms-5">
                        <Dropdown className="me-2">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {searchTitle}
                            </Dropdown.Toggle>
                            <Dropdown.Menu onSelect={()=>{console.log()}}>
                                <Dropdown.Item onClick={()=>{setSearchTitle("Invoice")}}>Invoice</Dropdown.Item>
                                <Dropdown.Item  onClick={()=>{setSearchTitle("Order Numner")}}>Order Numner</Dropdown.Item>
                                <Dropdown.Item  onClick={()=>{setSearchTitle("User Name")}}>User Name</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <FormControl type="text" placeholder="Search" className="me-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    {/* End of dropdown select on the Navbar */}


                    {data?(
                        <span className="text-light align-middle me-5">
                            Welcom 
                            
                            <DropdownButton 
                            id="dropdown-item-button" 
                            title={<span>{data.username}<FontAwesomeIcon className="ms-2" icon={faUser}/></span>}
                            className="ms-2 me-5 rounded-circle "
                            as='image'
                            >

                                <Dropdown.Item >Info</Dropdown.Item>
                                <Dropdown.Item >Account</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item 
                                className="bg-secondary text-light"
                                onClick={() =>logout()}
                                >Logout</Dropdown.Item>
                            </DropdownButton> 
                        </span>
                    ):(
                        <>
                            <Button className="mx-2" onClick={()=>setLoginModal(true)}>Login<FontAwesomeIcon className="ms-2" icon={faSignInAlt}/></Button>
                            <Button>Sign Up<FontAwesomeIcon className="ms-2" icon={faUserPlus}/></Button> 
                        </>
                        
                    )}
                    
                </Navbar.Collapse>
            </Navbar>
            {/* start of Login Modal */}
            <Modal show={loginModal} onHide={()=>setLoginModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" value={username} onChange={(e)=>setUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>
                    </Form>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setLoginModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={LoginSubmit}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* End of Login Modal */}

            {/* start of Login Result Toast */}
            <ToastContainer position="bottom-center">
                <Toast delay={2000} autohide onClose={() => setShowToast(false)} show={showToast} className="bg-success">
                    <Toast.Header closeButton={false}>
                    <strong className="me-auto">Login Success</strong>
                    </Toast.Header>
                    <Toast.Body>Welcome,{data?.username}</Toast.Body>
                </Toast>
            </ToastContainer>
            
            <ToastContainer position="bottom-center">
                <Toast delay={2000} autohide onClose={() => setShowErrorToast(false)} show={showErrorToast} className="bg-danger">
                    <Toast.Header closeButton={false}>
                    <strong className="me-auto">Login Failure</strong>
                    </Toast.Header>
                    <Toast.Body>{error}</Toast.Body>
                </Toast> 
            </ToastContainer>                
            {/* End of Login Result Toast */} 

        </div>
    )
}

export default NavBar
