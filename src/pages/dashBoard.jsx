import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button,  Form, Modal, Nav, Navbar, NavDropdown, InputGroup,  } from "react-bootstrap";
import { useHistory } from 'react-router';
import { useWallet } from 'use-wallet';
import { bnToDec } from '../utils';

import ListedFormBG from "../assets/bg-listed.jpg";


import tickmarkIcon from "../assets/tickmarkIcon.svg";
import openIcon from "../assets/openIcon.svg";
import roundBallIcon from "../assets/roundBallIcon.svg";


import { formatAddress } from "../utils";

import FarmCard from "../components/farmCard";

import BigNumber from 'bignumber.js'
const DashBoard = () => {
    const { account, connect, reset, balance, chainId } = useWallet();
   
    const history = useHistory();
 

    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSuccessClose = () => { setShowSuccess(false) };
   
    const handleClose = () => setShow(false);
   
   
    const onDisconnectWallet = () => {
        reset();
      //  setUserAccount(null);
        localStorage.removeItem("account");
        localStorage.removeItem("walletProvider");
    
      }
    const onChangeWallet = (data) => {
        if (data === 'metamask') {
          connect("injected");
          localStorage.setItem("walletProvider", "metamask");
         
        } else if (data === 'walletconnect') {
          connect("walletconnect");
          localStorage.setItem("walletProvider", "walletconnect");
        }
      }
    useEffect(() => {
        if (account) {
          history.push('/dashboard');
        }
        else {
            history.push('/');
        }
        console.log("111=",chainId)
      }, [account, chainId, history]);

    const onFormSubmit = () => {
        setShow(false);
        setShowSuccess(true)
    }
    return (
        
        <Container fluid className="main_layout" style={{ backgroundColor: '#000000', marginInline: '0px' }}>
          
            <Container>
  
                <Navbar
                    fixed="top"
                    className="navbar"
                    style={{
                        background: '#FFFAFA',
                        borderBottom: "2px solid #F7FBFD",
                    }}
                >
                    <Navbar.Brand>
                        {/*<Image
                            src={Logo}
                            roundedCircle
                            style={{ maxWidth: "36px", maxHeight: "36px", marginRight: '12px' }}
                        />
                        /*<img alt="KawaFarm" src={logoKawafarm} className="svg-kawa" />*/}
                    </Navbar.Brand>
                    
                    <Navbar.Collapse id="basic-navbar-nav" style={{ marginRight: "24px" }}>
                        <Nav className="ml-auto" style={{ fontSize: "14px" }}>
                            <Form.Group className="headerdropdown">
                                <InputGroup className="headerdropdown" style={{ background: '#FFF', border: '1px solid #FCDFE9' }}>
                                    <InputGroup.Prepend className="prePended">
                                        <InputGroup.Text id="inputGroupPrepend" style={{ color: '#82172D', borderTopLeftRadius: 8 }}>{bnToDec(new BigNumber(balance))} ETH</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <NavDropdown
                                        className="header-pedding"
                                        title={<span style={{ background: '#FFF', borderRadius: 16, color: '#82172D', minWidth: '221px', fontSize: "16px", padding: 8 }}>{account?formatAddress(account):""} <img src={roundBallIcon} alt=""/></span>}

                                        id="basic-nav-dropdown"
                                    >
                                        <div style={{
                                            borderRadius: '8px', background: '#FFF !important', minWidth: '221px'
                                        }}>
                                            <p style={{ padding:'0 12px', fontFamily:'Visby 400', fontSize:'12px' }}>Connected with MetaMask</p>
                                            <div style={{
                                                margin: 8,
                                                borderRadius: '8px', border: '1px Solid #E5E5E5', padding: '4px 0'
                                            }}>
                                                <NavDropdown.Item href="#" style={{fontSize:'14px', color:'#82172D', marginBottom:0, paddingBottom:0, paddingLeft:'12px'}}>{account?formatAddress(account):""}<img src={roundBallIcon} alt="" style={{marginLeft:'8px'}} /></NavDropdown.Item>
                                                <small ><NavDropdown.Item href={"https://"+(chainId===4?"rinkeby":"mainnet")+".etherscan.io/address/" + account} target="_blank" style={{ color: '#109BDE', fontSize: '12px', paddingTop:0, paddingLeft:'12px' }}>VIEW IN EXPLORER <img src={openIcon} style={{ marginBottom: 4, marginLeft: 4 }} alt=""/></NavDropdown.Item></small>
                                            </div>
                                        </div>
                                        <div style={{ margin: 8 }}>
                                            <Button style={{ background: 'rgba(251, 0, 0, 0.1)', border: 'none', color: '#903434', fontSize:'12px', letterSpacing:'0.03em' }} onClick={onDisconnectWallet} variant="outline-success" size="lg" block >
                                                DISCONNECT
                                            </Button>
                                        </div>
                                    </NavDropdown>

                                </InputGroup>
                            </Form.Group>
                         
                            <Nav.Link className="header-pedding" href="#" style={{marginLeft:'12px'}}>
                               
                               
                                </Nav.Link> 
                        </Nav>
                    </Navbar.Collapse> 
                </Navbar>
            </Container> 
            <Container className="main-dash-container" style={{maxWidth:'1140px' }}>
                <Row>
                    <Col xl="12" className="p-2" style={{paddingTop: 0}}>
                        <div className="font-weight-bold farm-top-title text-white">Stake one or more lp tokens to earn CHIZ</div>
                        <hr />
                    </Col>
                </Row>
                <Row className="pb-2">
                    <Col style={{'color':'#ffffff' }}>
                    Showing <span style={{ 'font-size': '18px', 'color':'#ffffff' }}>3 staking pools</span>
                    </Col>
                </Row>
                <Row className="">
                    {/*dummyData.map(i => <Col lg={4} sm={12} md={6} style={{ 'marginTop': 16 }}>
                        
                                </Col>)}*/
                    <FarmCard
                    themeClass={true}
                    onChangeWallet={onChangeWallet}
                    account={account}
              />}
              
                   
                </Row>
                <Modal show={show} onHide={handleClose} animation={false} style={{ borderRadius: '24px' }}>
                    <Modal.Body className="p-0 form-listtoken">
                        <div className="gradient" style={{ backgroundSize: 'cover', backgroundImage: "url(" + ListedFormBG + ")"}}>

                            <Row className="p-4 pb-0">
                                <Col lg={12}>
                                    <h1 className="text-center">List your dog token</h1>
                                </Col>
                                <Col lg={12}>
                                    <div className="mx-auto" style={{ maxWidth: '400px' }}>
                                        <p className="text-center mb-0">Complete the form below if you’d like to discuss partnership opportunities.</p>
                                    </div>

                                </Col>
                            </Row>
                        </div>
                        <div className="mx-auto py-4" style={{ maxWidth: '360px', padding:'0 15px' }}>
                            <Row>
                                <Col lg={12}><p style={{ color: '#F51C66' }}><strong>KawaFarm application form</strong></p></Col>
                                <Col lg={12}>
                                    <Form onSubmit={onFormSubmit}>
                                        <Form.Group controlId="projectname">
                                            <Form.Label className="formlabel">PROJECT NAME</Form.Label>
                                            <Form.Control type="text" placeholder="e.g. Dogelon" />

                                        </Form.Group>
                                        <Form.Group controlId="ticker">
                                            <Form.Label className="formlabel">TICKER</Form.Label>
                                            <Form.Control type="text" placeholder="e.g. ELON" />
                                        </Form.Group>
                                        <Form.Group controlId="websiteurl">
                                            <Form.Label className="formlabel">WEBSITE URL</Form.Label>
                                            <Form.Control type="text" placeholder="www.dogelon.com" />
                                        </Form.Group>
                                        <Form.Group controlId="yourmessage">
                                            <Form.Label className="formlabel">YOUR MESSAGE</Form.Label>
                                            <Form.Control as="textarea" rows={3} placeholder="Start typing..." />
                                            <Form.Text className="text-muted">
                                                Max 200 characters.
                                            </Form.Text>
                                        </Form.Group>
                                        <Button type="submit" className="addMore" block style={{ borderRadius: "12px", border: 'none' }}>Submit form</Button>
                                    </Form>

                                </Col>
                            </Row>
                        </div>


                    </Modal.Body>

                </Modal>
                <Modal show={showSuccess} onHide={handleSuccessClose} animation={false} style={{ borderRadius: '24px' }}>
                    <Modal.Body className="p-4 modalSucces successModal">
                        <div>
                            <div className="mx-auto p-4" style={{ textAlign: "center" }}>
                                <Row><Col><img src={tickmarkIcon} alt="" /></Col></Row>
                                <Row><Col><h2>Application Sent</h2></Col></Row>
                                <Row><Col><p style={{ color: '#543939' }}>Thank you for expressing interest in partnering with Kawakami Inu! One of our team members will get back to you shortly.</p></Col></Row>
                                <Row>
                                    <Col>
                                        <div>
                                            <Button className="successModalButton" variant="outline-success" size="md" onClick={handleSuccessClose}>
                                                BACK TO KAWAFARM
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </Container>
        
        </Container>
    );
};

export default DashBoard;
