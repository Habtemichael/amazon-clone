import React, {useContext, useState} from  'react'
import LayOut from "../../Components/LayOut/LayOut"
import classes from  "./Payment.module.css"
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from "../../Components/Product/ProductCard"
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
// import { Button } from '@mui/material';
import { axiosInstance } from '../../Api/axios'
import {ClipLoader} from "react-spinners";
import { db } from '../../Utility/firebase'
import { useNavigate } from 'react-router-dom'
import { Type } from '../../Utility/action.type'

function Payment() {
const [{user, basket} , dispatch] = useContext(DataContext);
console.log(user);

const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount
},0)

const total = basket.reduce((amount,item)=>{
  return item.price * item.amount + amount
},0)


const [cardError, setCardError] = useState(null)
const [processing, setProcessing] = useState(false) 

const stripe = useStripe();
const elements = useElements();
const navigate = useNavigate()


const handleChange = (e)=>{
e?.error?.message? setCardError(e?.error?.message): setCardError("")
}
const handlePayment =async(e)=>{
  e.preventDefault();

  try{
    setProcessing(true)
    // 1, backend || function ----> contacting to the client secret
    const response = await axiosInstance({
        method:"POST",
        url:`/payment/create?total=${total * 100}`,
    })
    const clientSecret = response.data?.clientSecret;
    // 2,client side (react side confirmation)#

const {paymentIntent}= await stripe.confirmCardPayment(
  clientSecret,
  // confirmation
  {
    payment_method:{
      card:elements.getElement(CardElement)
    }
  }
)
console.log(paymentIntent);

// 3, after the confirmation --->order fire store database save, clear the basket......#
await db.collection("users")
.doc(user.uid)
.collection("orders")
.doc(paymentIntent.id)
.set({
  basket:basket,
  amount:paymentIntent.amount,
  created:paymentIntent.created
});
// empty basket #
dispatch({ type:Type.EMPTY_BASKET});

setProcessing(false)
navigate ("/orders", {state:{msg:"you have placed a new order"}})

  } catch(error){
console.log(error)
setProcessing(false)

  };
}

  return (
    <LayOut>
      {/* header */}
    <div className={classes.payment_header}>
      Checkout ({totalItem}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* Address */}
        <div className={classes.flex}>  
          <h3>Delivery Address</h3>
        <div>
          {/* <div>abe@email.com</div> */}
        <div>{user?.email}</div>
        <div>1020 Amazon rd </div>
        <div>Arizona, USA</div>
        </div>
        </div>
      <br/>
      {/* product */}
      <div className={classes.flex}>
        <h3>Review items and Delivery</h3>
        <div>
          { 
          basket?.map((item)=>(<ProductCard product={item} flex={true}/>)
          )}
        </div>
        </div>
      <hr/>
              {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
        <div className={classes.payment_card_container}>
        <div className={classes.payment_details}>
          <form onSubmit= {handlePayment}>
            {cardError && <small style={{color:"red"}}>{cardError}</small>}
            {/* card element */}
            <CardElement onChange={handleChange}/>
            
            <div className={classes.payment__price}>
              <div>
                <span style={{display:"flex", gap:"10px"}}>
                <p> Total Order = </p> <CurrencyFormat amount={total}/>
                </span>
              </div>
              <button type="submit">
                {
                  processing?(
                    <div className= {classes.loading}>
                      <ClipLoader color = "gray" size ={12}/> 
                      <p>Please wait ...</p>
                    </div>
                  ):(
                    "Pay Now"
                  )
                } 
                </button>
            </div>
            </form>
        </div>
        </div>
      </div>
      <hr/>
      </section>

    </LayOut>

  )
}

export default Payment




// http://127.0.0.1:5001/clone-7c63d/us-central1/api