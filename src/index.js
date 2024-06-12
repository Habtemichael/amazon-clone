
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataProvider } from './Components/DataProvider/DataProvider';
import { initialState, Reducer } from './Utility/Reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
  <React.StrictMode>
    <DataProvider Reducer={Reducer} initialState={initialState}>
    <App />
    </DataProvider>
    
  </React.StrictMode>
)