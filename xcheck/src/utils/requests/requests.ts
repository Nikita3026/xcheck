import API from "../API"

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
}

export default Requests
