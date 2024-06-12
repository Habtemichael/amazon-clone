

import axios from "axios";
const axiosInstance = axios.create({

// Local instance of firebase functions----#


    // baseURL:"http://127.0.0.1:5001/clone-7c63d/us-central1/api",


    // Deployed version of Amazon Server on render.com -----#

    // baseURL:"http://localhost:5000"
    baseURL:"https://amazon-api-deploy-2-ejml.onrender.com"
    // baseURL:"https://amazon-api-deploy-yb5b.onrender.com"




})
export {axiosInstance};