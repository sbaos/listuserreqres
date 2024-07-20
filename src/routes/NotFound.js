import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
function NotFound() {
    const navigate = useNavigate();
    navigate('/');
    return (<>
        <Alert variant="danger" className="mt-3">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
                This page is not founded.
            </p>
        </Alert>
    </>);
}

export default NotFound;