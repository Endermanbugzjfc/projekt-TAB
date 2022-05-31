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
                state.id = user.id;
                state.login = user.login;
                state.name = user.name;
                state.loggedIn = true;
            },
            isLoggedIn : (state) =>{ console.log("YAY"); return state.loggedIn },
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