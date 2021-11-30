import axios, { Axios, AxiosResponse } from "axios";
import { appConfig } from "../config/app.config";


class HttpService {
    private axios: Axios;
    constructor(){
        this.axios = axios.create({
            baseURL: appConfig.apiUrl 
        });
    }

    public async get(endpoint: string, accessToken: string){
        return await this.axios.get(endpoint, {
            headers: {
                "Authorization": accessToken
            }
        })
    }

    public async post(endpoint: string, data: object, accessToken?: string): Promise<AxiosResponse> {
        return await this.axios.post(endpoint, data, {
            headers: accessToken ? {
                "Authorization": accessToken
            } : undefined
        })

    };

    public put() {
    }

    public delete() {

    }
}


const httpService = new HttpService();
export {httpService};