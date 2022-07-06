import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice(
    {
        name: 'user',
        initialState: {
            loggedIn: false,
            id: "",
            login: "",
            name: "",
            role: "",
            cartId: "",
        },
        reducers: {
            login: (state, user) => {
                console.log(user.payload)
                state.id = user.payload.id;
                state.login = user.payload.userName;
                state.name = user.payload.legalName;
                state.role = user.payload.type;
                state.loggedIn = true;
                state.cartId = user.payload.shoppingCartDto?.id;
                setTimeout(()=>{window.location.href = '/'}, 1000);
            },
            isLoggedIn : (state) =>{ return state.loggedIn },
            logout: (state) =>{
                
                state.loggedIn = false;
                state.id = "";
                state.login = "";
                state.name = "";
                state.role = "";
                state.cartId = "";
            }
        }
    }
)

export const {login, isLoggedIn, logout} = UserSlice.actions
export default UserSlice.reducer
