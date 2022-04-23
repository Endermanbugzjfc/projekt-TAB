import axios from "axios";
import { dProduct } from "../reducers/dProduct";

const baseURL = "localhost:8080/" //TODO: discuss api with Michał

export default {
    dUser(url = baseURL + ''){ //Also here
        return {
            fetchAll : () => axios.get(url), 
            fetchById : id => axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url+id, updatedRecord),
            delete: id => axios.delete(url.id)
        }
    },

    dProduct(url = baseURL + ''){ //Aslo here
        return {
            fetchAll : () => axios.get(url), 
            fetchById : id => axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url+id, updatedRecord),
            delete: id => axios.delete(url.id)
        }
    }
}