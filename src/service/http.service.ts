import axios, { Axios, AxiosResponse } from "axios";
import { appConfig } from "../config/app.config";


class HttpService {
    private axios: Axios;
    constructor(){
        this.axios = axios.create({
            baseURL: appConfig.apiUrl 
        });
    }

    public async get<T>(endpoint: string, accessToken: string): Promise<T[] | T> {
        var res = await this.axios.get(endpoint, {
            headers: {
                "Authorization": accessToken
            }
        });

        return res.data;
    }

    public async post<T>(endpoint: string, accessToken: string, data: T): Promise<AxiosResponse> {
        var res = await this.axios.post(endpoint, data, {
            headers: {
                "Authorization": accessToken
            }
        })

        return res;
    };

    public put() {
    }

    public delete() {

    }
}


const httpService = new HttpService();
export {httpService};