import { useEffect } from 'react';
import './App.scss';
import Header from './components/Header/header.js'
import Container from 'react-bootstrap/esm/Container';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/approute.js';
import { useSelector, useDispatch } from 'react-redux';
import { handleUserRefresh } from './redux/action/useraction'
function App() {
  ;
  const dataSelecter = useSelector(state => state.accout.user);
  const dispath = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispath(handleUserRefresh());
    }
  }, [])
  return (
    <>
      <div className="App">
        <Header></Header>
        <Container>
          <AppRoutes></AppRoutes>
        </Container>
      </div>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        // transition: Bounce
        />
      </div>
    </>

  );
}

export default App;
