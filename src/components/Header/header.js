import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaHome } from "react-icons/fa";
import logo from '../../assets/image/logo192.png';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogoutRedux } from '../../redux/action/useraction';
function Header(props) {

  // const { user, logout } = useContext(UserContext);
  const user = useSelector(state => state.accout.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // navigate('/login');
    if (user && user.auth === false && window.location.pathname !== '/login') {
      toast.success('success logout');
      navigate('/');
    }
  }, [user])
  const handleLogout = () => {
    dispatch(handleLogoutRedux());
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <span> Bao's MiniApp</span>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(user && user.auth || window.location.pathname !== '/login') &&
            <>
              <Nav className="me-auto" activeKey={location.pathname}>
                <NavLink to='/' className='nav-link'>
                  <FaHome style={{ bottom: '2px', position: 'relative' }}>
                  </FaHome> Home
                </NavLink>
                <NavLink to='/users' className='nav-link'>Manage Users</NavLink>
              </Nav>
              <Nav>
                {user && user.email &&
                  <span className='nav-link'>Welcome, {user.email}</span>
                }
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  {user && user.auth ?
                    <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                    : <NavLink to='/login' className='dropdown-item'>Log in</NavLink>}
                </NavDropdown>
              </Nav>
            </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;