import React from 'react';
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Orders  from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Payments from './Pages/Payment/Payment';
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe('pk_test_51PORQ0CdGbCUnbXQQ3T9Zd1rAtev0eB9rQWbObGnbVWE5qegqa6U8XJ5MDUKuzJg7E83gGci1J47nwlfMYC9lhWr00FzfvQr7L');

function Routing() {
    return (
    <Router>
    <Routes>
        <Route path="/"element= {<Landing/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/category/:categoryName" element={<Results/>} />
        <Route path="/orders" 
        element={ 
        <ProtectedRoute msg={"you must log in to  access your order"} 
        redirect={"/orders"}>
        <Orders/>
        </ProtectedRoute>   
    }
    />
        <Route path="/payments"
        element={<ProtectedRoute msg={"you must log in to pay"} redirect={"/payments"}>
            <Elements stripe={stripePromise}>  
                <Payments />
            </Elements>
        
        </ProtectedRoute>
    }
    />


        <Route path="/products/:productId" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart/>} />
    </Routes>
    </Router>
)
}

export default Routing;
