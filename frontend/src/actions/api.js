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
            login: (userInfo) => axios.post(url + "login", userInfo),
            logout: (userID) => axios.post(url + "logout/"+ userID),

            //Order raports
            getOrders: (userId) => axios.get(url+userId + "/report"),
            getOrderById: (userId, orderId) => axios.get(url+userId+"/report/full/" + orderId),

            //Worker management
            searchUser: (userDTO, type) => axios.post(url + 'find/' + type, userDTO)
            
        }
    },

    Product(url = baseURL + 'product/'){
        return {
            getCategories: () => axios.get(url + "category"),

            getByCategory: (categoryid) => axios.get(url + 'list/' + categoryid),
            getProduct: (productId) => axios.get(url+ productId),
            getProductImages: (productId) => axios.get(url + productId + '/images'),
            sendProductImages: (productId, images) => axios.put(url + productId + '/images', images),

            filterByPrice: (min, max) => axios.post(url + "price", {min, max}),
            searchByName: (stringName) => axios.post(url + "name", stringName),
            getProductsByPriceAndCategory: (prices, category)  => axios.post(url + 'price/' + category, prices),

            //Management
            createProduct: (newProduct) => axios.post(url, newProduct),
            orderNew: (productId, amount) => axios.post(url + "order", {id: productId, addedAmount: amount}),
            changePrice: (productId, newPrice) => axios.put(url+"price", {id: productId, price: newPrice}),

            //Buissness reports
            getProductReport: (priductId, dates) => axios.get(url + "report/" + priductId, dates),
            getFullReport: (dates) => axios.get(url + "report/all", dates),
        }
    },

    Cart(url = baseURL + 'cart/'){
        return{
            getUserCart: (userId) => axios.get(url + "user/" + userId),
            getNotLogCart: () => axios.get(url), //<-----change? TODO
            insert: (cartId, productId, quantity) => axios.put(url+cartId, {productId: productId, quantity: quantity}),
            deleteProduct: (cartId, productId) => axios.delete(url+cartId, productId),

            BuyAll: (cartId, paymentMethod) => axios.post(url+cartId, paymentMethod)
        }
    }
}