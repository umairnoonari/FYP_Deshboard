import { Container,Form,Button,Col,Row } from "react-bootstrap";
import LoginIcon from '../assets/user.svg'
import './main.css';
import { useNavigate } from "react-router-dom";
const Login=()=>{
    const navigate=useNavigate()
    return<>
        <Container className="mt-5">
            <Row className="d-flex justify-content-end">
                <Col lg={4} md={6} sm={12} className="text-center">
                    <img className="icon-img" src={LoginIcon} alt="login" style={{width:'100px', height:'100px'}}></img>
                    <Form className="mt-4">
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Username" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" onClick={()=>{
                                navigate('/home')
                            }}>Login</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>
}
export default Login;