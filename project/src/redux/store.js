import {configureStore} from '@reduxjs/toolkit';
import userLoginReducer from './slices/userLoginSlice'

export const store=configureStore({
    reducer:{
        userLogin:userLoginReducer
    }
})