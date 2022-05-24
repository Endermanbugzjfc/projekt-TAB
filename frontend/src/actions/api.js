import axios from "axios";

const baseURL = "localhost:8090/"

export default {
    User(url = baseURL + 'user/'){
        return {
            getUserById: (id) => axios.get(url + id),
            register: newUser => axios.post(url, newUser),
            delete: id => axios.delete(url + id),
            update: (id, updatedRecord) => axios.put(url+id, updatedRecord),

            //Login stuff -> It's wrong? TODO
            login: (username, pass) => axios.get(url + "login", {username: username, password: pass}),
            logout: (username) => axios.post(url + "logout/", {username: username}),

            //Order raports
            getOrders: (userId) => axios.get(url+userId + "/report"),
            getOrderById: (userId, orderId) => axios.get(url+userId+"/report/full/" + orderId) 
            
        }
    },

    Product(url = baseURL + 'product/'){
        return {
            getCategories: () => axios.get(url + "category"),

            getByCategory: (categoryid) => axios.get(url + categoryid),
            getProduct: (productId) => axios.get(url+ productId),

            filterByPrice: (min, max) => axios.post(url + "price", {min, max}),
            searchByName: (stringName) => axios.post(url + "name", stringName),

            //Management
            createProduct: (newProduct) => axios.post(url, newProduct),
            orderNew: (productId, amount) => axios.post(url + "order", {id: productId, addedAmount: amount}),
            changePrice: (productId, newPrice) => axios.put(url+"price", {id: productId, price: newPrice}),

            //Buissness reports
            getProductReport: (priductId) => axios.get(url + "report/" + priductId),
            getFullReport: () => axios.get(url + "report/all"),
        }
    },

    Cart(url = baseURL + 'cart/'){
        return{
            getUserCart: (userId) => axios.get(url + "user/" + userId),
            getNotLogCart: () => axios.get(url), //<-----change? TODO
            insert: (cartId, productId) => axios.put(url+cartId, productId),
            deleteProduct: (cartId, productId) => axios.delete(url+cartId, productId),

            BuyAll: (cartId, paymentMethod) => axios.post(url+cartId, paymentMethod)
        }
    }
}