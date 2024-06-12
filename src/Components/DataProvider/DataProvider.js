

import React, {createContext,useReducer} from 'react'

export const DataContext = createContext()

export const DataProvider = ({children, Reducer,initialState})=>{
    return (
        <DataContext.Provider value={useReducer(Reducer,initialState)}>
            {children}
        </DataContext.Provider>
    )
}