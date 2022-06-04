import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice(
    {
        name: 'user',
        initialState: {
            loggedIn: false,
            id: "",
            login: "",
            name: ""
        },
        reducers: {
            login: (state, user) => {
                console.log(user.payload)
                state.id = user.payload.id;
                state.login = user.payload.login;
                state.name = user.payload.name;
                state.loggedIn = true;
            },
            isLoggedIn : (state) =>{ return state.loggedIn },
            logout: (state) =>{
                
                state.loggedIn = false;
                state.id = "";
                state.login = "";
                state.name = "";
            }
        }
    }
)

export const {login, isLoggedIn, logout} = UserSlice.actions
export default UserSlice.reducer