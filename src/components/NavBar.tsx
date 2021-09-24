import React, { useState,useEffect} from 'react'
import { Button, Dropdown, Form, FormControl, Modal, Nav, Navbar, NavDropdown, Toast} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt,faUserPlus,faAddressBook,faFile,faToolbox} from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ILogin from '../data/user/userModel'
import { useActions } from '../hooks/useActions'
import { useTypeSelector } from '../hooks/userTyprSelector'


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
    const {login} = useActions();
    const {data,error,loading}=useTypeSelector((state)=>state.userState)
    //#endregion

    //#region set const or var
    const hrNavTitle = (<span>HR<FontAwesomeIcon className="ml-2" icon={faAddressBook}/></span>)
    const orderNavTitle = (<span>Order<FontAwesomeIcon className="ml-2" icon={faFile}/></span>)
    const toBeAddingNavTitle = (<span>To Be Adding<FontAwesomeIcon className="ml-2" icon={faToolbox}/></span>)
    //#endregion
   
    //TODO: 判断用户是否登录,如果登录显示用户信息在NavBar,否则显示登录,注册选项在NavBar
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
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Order Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-5 mr-auto">
                        <NavDropdown className="ml-3 mr-auto" title={hrNavTitle} id="basic-nav-dropdown">
                            
                            <NavDropdown.Item href="#action/3.1">Department</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Employee</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown className="ml-3 mr-auto" title={orderNavTitle} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Order</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Add Sale Order</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown className="ml-3 mr-auto" title={toBeAddingNavTitle} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline className="mr-5">
                        <DropdownButton
                        className="mr-2"
                        as={InputGroup.Prepend}
                        variant="outline-secondary"
                        title={searchTitle}
                        id="input-group-dropdown-1"
                        >
                            <Dropdown.Item onSelect={e=>{setSearchTitle(e)}} eventKey="Invoice">Invoice</Dropdown.Item>
                            <Dropdown.Item onSelect={e=>{setSearchTitle(e)}} eventKey="Order Numner">Order Numner</Dropdown.Item>
                            <Dropdown.Item onSelect={e=>{setSearchTitle(e)}} eventKey="User Name">User Name</Dropdown.Item>
                        </DropdownButton>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    {data?(
                        <span className="text-light align-middle mr-5">
                            Welcom <a href="/user" className="text-light text-decoration-none">{data.username.toUpperCase()}</a>
                        </span>
                    ):(
                        <>
                            <Button className="mx-2" onClick={()=>setLoginModal(true)}>Login<FontAwesomeIcon className="ml-2" icon={faSignInAlt}/></Button>
                            <Button>Sign Up<FontAwesomeIcon className="ml-2" icon={faUserPlus}/></Button> 
                        </>
                        
                    )}
                    
                </Navbar.Collapse>
            </Navbar>
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
            <div className="d-flex justify-content-center ">
                <Toast delay={2000} autohide onClose={() => setShowToast(false)} show={showToast} className="bg-success">
                    <Toast.Header closeButton={false}>
                    <strong className="mr-auto">Login Success</strong>
                    </Toast.Header>
                    <Toast.Body>Welcome,{data?.username}</Toast.Body>
                </Toast>
            </div>
            
            <div className="d-flex justify-content-center ">
                <Toast delay={2000} autohide onClose={() => setShowErrorToast(false)} show={showErrorToast} className="bg-danger">
                    <Toast.Header closeButton={false}>
                    <strong className="mr-auto">Login Failure</strong>
                    </Toast.Header>
                    <Toast.Body>{error}</Toast.Body>
                </Toast> 
            </div>                
             

        </div>
    )
}

export default NavBar
