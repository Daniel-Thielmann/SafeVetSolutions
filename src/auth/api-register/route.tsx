import axios, { AxiosResponse } from "axios";


interface RegisterResponse{
    message?: string;
    status: number;
}

const registerAPI = async (name:string, email: string, password: string, phone:string, cpf:string, birth_date:string): Promise<RegisterResponse> => {
    const route = axios.create({
        baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });

    try{
        const response: AxiosResponse<RegisterResponse> = await route.post("/register", {name, email, password, phone, cpf, birth_date});
        return {message: response.data.message, status: response.status};
        
    } catch(err: any){
        if(err.response){
            return {message: err.response.data.message, status: err.response.status};
        } else{
            return {message: "Unexpected error ocurred.", status: 500 };
        }
    }
};

export default registerAPI;