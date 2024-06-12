import React, { useContext } from 'react'
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import classes from "./Header.module.css";
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from "../../Utility/firebase"


const  Header = ()=> {

const[{ user, basket}, dispatch]=useContext(DataContext)
const totalItem = basket?.reduce((amount,item)=>{
        return item.amount + amount
},0)

return (
<section className={classes.fixed}>
<section>
        <div className={classes.header_container}>
{/* logo section */}
        <div className={classes.logo_container}>
        <Link to="/">
        <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt=""/>
        </Link>
{/* delivery */}  
        <div className= {classes.delivery}>
        <span> 
        <SlLocationPin />
        </span>
        <div>
        <p>Deliverd to</p>
        <span>Ethiopia</span>
        </div>
        </div> 
        </div>
{/* Search Section */}
        <div className={classes.search}>
        <select name="" id="">
        <option value=''>All</option>
        </select>
        <input type="text" />
        <BsSearch size={43}/> 
        </div>
{/* right side section */}
        <div className= {classes.order_container}>
        <Link to="/" className={classes.language}>
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
        alt=""/> 
        <select name="" id="">
        <option value="">EN</option>
        </select>
        </Link>
{/* the three components */}
        <Link to={!user && "/auth"}>
                <div>
                {user ?(
                <>
                <p>Hello {user?.email?.split("@")[0] } </p>
                <span onClick ={()=>auth.signOut()}>Sign Out</span>
                </>
                ):(
                <>
                <p>Hello, Sign In</p>
                <span>Account & Lists</span>
                </>
                )}
                </div>
        </Link>
{/* Orders */}
        <Link to="/Orders">
        <p>Returns</p>
        <span>& Orders</span>
        </Link>
  {/* carts */}
        <Link to="/Cart" className={classes.cart}>
        <BiCart size= {35}/>
        <span>{totalItem}</span>
        </Link>
        </div>
        </div>
</section>
<LowerHeader/>
</section>
)
}

export default Header;








