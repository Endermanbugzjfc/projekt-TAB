import axios from "axios";

const baseURL = "localhost:8080/"

export default {
    dUser(url = baseURL + ''){
        return {
            fetchAll : () => axios.get(url), 
            fetchById : id => axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url+id, updatedRecord),
            delete: id => axios.delete(url.id)
        }
    },

    dProduct(url = baseURL + ''){
        return {
            fetchAll : () => axios.get(url), 
            fetchById : id => axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url+id, updatedRecord),
            delete: id => axios.delete(url.id)
        }
    }
}