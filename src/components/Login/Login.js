import { useContext, useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { loginApi } from "../../service/Userservice";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { handleLoginRedux } from "../../redux/action/useraction";
import { useDispatch, useSelector } from "react-redux";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPasswork] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const isLoading = useSelector(state => state.accout?.isLoading);
    const accout = useSelector(state => state.accout);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleeys = (event) => {
        let eyes = document.querySelectorAll('.eye');
        // console.log(eyes);
        eyes.forEach((e) => {
            if (e.classList.contains('active'))
                e.classList.remove('active');
            else e.classList.add('active');
        })
        setIsShowPassword(!isShowPassword);
    }
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Passwork is require");
            return;
        }

        dispatch(handleLoginRedux(email.trim(), password));
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleGoBack = () => {
        navigate('/');
    }
    const handlePressEnter = (e) => {
        if (e?.key + '' === 'Enter') {
            handleLogin();
        }
    }
    useEffect(() => {
        console.log(accout);
        if (accout && accout.user.auth === true) {
            navigate('/');
        }
    }, [accout])
    return (<>
        <div className="login-container col-12 col-sm-4">
            <div className="title">Login</div>
            <div className="title-email">Email or user name (eve.holt@reqres.in )</div>
            <input
                type='text'
                className='form-control'
                placeholder="Username or Email"
                value={email}
                onChange={(e) => { handleEmailChange(e) }} />
            <div className="password-input">
                <input
                    type={isShowPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onKeyDown={handlePressEnter}
                    onChange={(e) => setPasswork(e.target.value)}
                />

                <FaRegEye className="eye" onClick={(e) => handleeys(e)} />
                <FaRegEyeSlash className="eye active" onClick={(e) => handleeys(e)} />
            </div>

            <button
                type="submit"
                className={`${email && password ? 'btn-active' : ''}`}
                disabled={email && password && !isLoading ? false : true}
                onClick={() => handleLogin()}>
                {isLoading && <div className={"spinner-border spinner-border-sm"} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}
                <span>  </span>
                Login
            </button>
            <div>Login with gg</div>
            <div className="back" onClick={handleGoBack}>Go back</div>
        </div>
    </>);
}

export default Login;