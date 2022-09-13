import { Container,Form,Button,Col,Row } from "react-bootstrap";
import LoginIcon from '../assets/user.svg'
import './main.css';
import Fitness from '../assets/fittness.jpeg'
import { useNavigate } from "react-router-dom";
const Login=()=>{
    const navigate=useNavigate()
    return<div>
        {/* <img style="background-image:url('../assets/fitness1.jpg')" /> */}
        <Container className="mt-5">
            <Row>
                <Col>
                    <img src={Fitness} alt="NA" style={{width:"700px",height:"700px"}}></img>
                </Col>
                <Col lg={4} md={6} sm={12} className="text-center bg-light p-5" style={{marginTop:"130px",border:"10px blue",borderRadius:"30px",boxShadow:"5px 5px lightblue",position:"relative",left:"-70px",top:"-80px"}}>
                    <img className="icon-img" src={LoginIcon} alt="login" style={{width:'100px', height:'100px'}}></img>
                    <Form className="mt-5">
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Username" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="success" size="lg" onClick={()=>{
                                navigate('/home')
                            }}>Login</Button>
                        </div>
                    </Form>
                </Col>
               

            </Row>
        </Container>
    </div>
}
export default Login;