import API from "../API"
import axios from "axios"
import {githubAuthConst} from '../../components/AuthorizationComponent/AuthConstants'

class Requests {
    async getRequest(essenceName:string): Promise<any> {
        return await API.get(essenceName);
    }

    async postRequest(essenceName:string, data:object): Promise<any> {
        const jsonData = JSON.stringify(data);
        return await API.post(essenceName, jsonData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }

   async putRequest(essenceName:string, newData:object) : Promise<any>{
        const jsonData = JSON.stringify(newData);
        return await API.put(essenceName, jsonData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }

    async deleteRequest(essenceName:string): Promise<any> {
        return await API.delete(essenceName);
    }

    async getData(essenceName:string) : Promise<any>{
        try{
            const res = await this.getRequest(essenceName);
            return res.data;
        } catch(error) {
            console.log('Error when requesting the server');
            return null;
        }
    }

    postOAuthToken(code:string) {
        const url = `https://github.com/login/oauth/access_token?client_id=${githubAuthConst.client_id}&client_secret=${githubAuthConst.client_secret}&code=${code}`;
        return axios({
            method: 'post',
            url: githubAuthConst.proxyurl+url,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }

    getOAuthData(accessToken:string) {
        const url = `https://api.github.com/user?access_token=${accessToken}&client_id=${githubAuthConst.client_id}&client_secret=${githubAuthConst.client_secret}`;
        return axios({
            method: 'get',
            url: url,
            headers: {
                'accept': 'application/json',
                'Connection': 'close',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64)'
            }
        });
    }

    async getDataByParameter(essenceName:string, parameterName:string, parameterValue:string|number) : Promise<any>{
        try{
            const res = await this.getRequest(`${essenceName}?${parameterName}=${parameterValue}`);
            return res.data;
        } catch(error) {
            console.log('Error when requesting the server');
            return null;
        }
    }

    async addData(essenceName:string, data:object) : Promise<any>{
        try{
            const res = await this.postRequest(essenceName, data);
            return res;
        } catch(error) {
            console.log('Error when requesting the server');
            return null;
        }
    }

    async changeData(essenceName:string, id: string | number, data:object) : Promise<any>{
        try{
            const res = await this.putRequest(`${essenceName}/${id}`, data);
            return res;
        } catch(error) {
            console.log('Error when requesting the server');
            return null;
        }
    }

    async deleteData(essenceName:string, id:string | number) : Promise<any>{
        try{
            const res = await this.deleteRequest(`${essenceName}/${id}`);
            return res;
        } catch(error) {
            console.log('Error when requesting the server');
            return null;
        }
    }

    async addOAuthToken(code:string) : Promise<any>{
        try{
            const res = await this.postOAuthToken(code);
            return res.data.access_token;
        } catch(error) {
            console.log('Error when requesting the server');
            return null;
        }
    }

    async getOAuthToken(token:string ) : Promise<any>{
        try{
            const res = await this.getOAuthData(token);
            return res.data;
        } catch(error) {
            console.log('Error when requesting the server');
            return null;
        }
    }
}

export default Requests
