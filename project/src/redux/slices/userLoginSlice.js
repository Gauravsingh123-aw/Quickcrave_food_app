import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const userLoginLifeCycle = createAsyncThunk('user-login', async (user, thunkApi) => {
    try {
        let res;
        if (user.user_type === "user") {
            res = await axios.post('https://quickcrave-food-app.vercel.app/user-api/user-login', user)
            // return res.data;
            

            if (res.data.message === "Login success") {
                //save token in local/session storage
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('user',JSON.stringify(res.data.user));
            
            }
            else {
                return thunkApi.rejectWithValue(res.data.message);
            }
            return res.data;
        }
        else if(user.user_type==="seller"){
            res = await axios.post('http://localhost:4000/seller-api/seller-login', user)
            // return res.data;
            console.log(res.data)
            if (res.data.message === "Login success") {
                //save token in local/session storage
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('user',JSON.stringify(res.data.user));
            }
            else {
                return thunkApi.rejectWithValue(res.data.message);
            }
            return res.data;
        }
        
    }
    catch (err) {
        return thunkApi.rejectWithValue(err)
    }
})

export const refreshCurrentUser = createAsyncThunk('user', async (userObj, thunkApi) => {
    try {
    // const res = await axios.post('http://localhost:1234/user-api/user', userObj);
        return userObj;
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
});

export const userLoginSlice = createSlice({
    name: 'user-login',
    initialState: { currentUser: {}, loginStatus: false, errorMessage: '', isPending: false },
    reducers: {
        clearState: (state, action) => {
            state.currentUser = {};
            state.loginStatus = false;
            state.errorMessage = ''
            state.isPending = false;
        }
    },
    extraReducers: builder => builder
        .addCase(userLoginLifeCycle.pending, (state, action) => {
            //action.payload.message
            state.isPending = true;
        })
        .addCase(userLoginLifeCycle.fulfilled, (state, action) => {
            state.currentUser = action.payload.user;
            state.loginStatus = true;
            state.errorMessage = ''
            state.isPending = false
        })
        .addCase(userLoginLifeCycle.rejected, (state, action) => {
            //action.payload
            state.currentUser = {}
            state.loginStatus = false
            state.errorMessage = action.payload
            state.isPending = false
        })
        .addCase(refreshCurrentUser.pending, (state, action) => {
            state.isPending = true;
        })
        .addCase(refreshCurrentUser.fulfilled, (state, action) => {
            state.currentUser = action.payload.user;
            state.loginStatus = true;
            state.errorMessage = '';
            state.isPending = false;
        })
        .addCase(refreshCurrentUser.rejected, (state, action) => {
            state.currentUser = {};
            state.loginStatus = false;
            state.errorMessage = action.payload;
            state.isPending = false;
        }),

})

//export actions
export const { clearState } = userLoginSlice.actions;
//export root reducer 
export default userLoginSlice.reducer; 
