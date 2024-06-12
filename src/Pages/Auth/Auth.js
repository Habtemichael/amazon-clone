import React, { useState, useContext} from 'react'
import classes from "./SignUp.module.css"
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {auth} from "../../Utility/firebase"
import {ClipLoader} from "react-spinners" 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { DataContext} from "../../Components/DataProvider/DataProvider"
import {Type} from "../../Utility/action.type"

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navStateData = useLocation()
console.log(navStateData);

const [loading, setLoading] = useState({
    signIn:false,
    signUp:false
});
const [{user}, dispatch] = useContext(DataContext);
const navigate = useNavigate()

const authHandler = async(e)=> {
    e.preventDefault();
    if(e.target.name === "Signin"){
        setLoading({...loading, signIn:true})
        // firebase auth
        signInWithEmailAndPassword (auth, email, password )
        .then((userInfo)=>{
            dispatch({
                type:Type.SET_USER,
                user:userInfo.user,
            })
        setLoading({...loading, signIn:false})
        navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err)=>{
            setError(err.message)
            setLoading({...loading, signIn:false})

        })
    }else{ 
        setLoading({...loading, signUp:true})
        createUserWithEmailAndPassword(auth, email, password).then((userInfo)=>{
            dispatch({
                type:Type.SET_USER,
                user:userInfo.user,
            })
            setLoading({...loading, signUp:false});
            navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err)=>{
            setError(err.message)
            setLoading({...loading, signUp:false})

        })

    }
};

return (
    <section className={classes.login}>
        {/* logo */}
<Link>
<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt=''/>
</Link>
        {/* form */}
        <div className={classes.login_container}>
            <h1>Sign In</h1>
{navStateData?.state?.msg && (
    <small 
    style={{
        padding: "5px",
        textAlign: "center",
        color: "red",
        fontWeight: "bold"
    }}>
{navStateData?.state?.msg}
    </small>
)
}
    <form action=""> 
        <div>
            <label htmlFor='email'>Email</label>
            <input value={email} 
            onChange ={(e)=>setEmail(e.target.value)} 
            type='email' id='email'/> 
        </div>
        <div>
            <label htmlFor='email'>Password</label>
            <input value={password} 
            onChange ={(e)=>setPassword(e.target.value)}  
            type='password' id='password'/>   
        </div> 

        <button type="submit" 
        onClick={authHandler}
        name="Signin"
        className={classes.login_signinButton}>
            {loading.signIn ? (<ClipLoader color="#000" size={15}></ClipLoader>):("Sign In")}
            
        </button>

        </form>
    {/* aggrement */}
    <p>
        By signing-in you agree to the Amazon Fake Clone Conditions of Use & Sale. Please see our Private Notice, our Cookies Notice and our Interest_Based Ads Notice.
    </p>
    {/* creating account btn */}
    <button type="submit"
    onClick={authHandler}
    name="Signup"
    className={classes.SignUpButton}>
        {loading.signUp ? (<ClipLoader color="#000" size={15}></ClipLoader>):("Create your Amazon Account")}</button>
    {error && (<small style={{paddingTop: "5px", color: "red"}}>{error}</small>)}
        </div>
    
    </section>



)
}

export default Auth;