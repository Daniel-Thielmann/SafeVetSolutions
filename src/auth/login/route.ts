import axios, { AxiosResponse } from "axios";

interface LoginResponse {
  token: string | null;
  id: number | null;
  name: string | null;
  phone: string | null;
  birth_date: string | null;
  cpf: string | null;
  status: number;
  error?: string;
}

const login = async (email: string, password: string): Promise<LoginResponse> => {
    const route = axios.create({
      baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    
      const response: AxiosResponse = await route.post("/login", { email, password });
      console.log(response.data.status)

      if (response.data.token){
        return { 
          token: response.data.token, status: 200, id: response.data.user.id, name: response.data.user.name, phone: response.data.user.phone, birth_date: response.data.user.birth_date, cpf: response.data.user.cpf
    }
      } else if (response.data.status === 205) {
        return { 
          token: null, 
          status: response.data.status, 
          id: null, 
          name: null, 
          phone: null, 
          birth_date: null, 
          cpf: null, 
          error: response.data.message 
        }
      } else if (response.data.status === 422) {
        return { 
          token: null, 
          status: response.data.status, 
          id: null, 
          name: null, 
          phone: null, 
          birth_date: null, 
          cpf: null, 
          error: response.data.message 
        }
      } else {
        return { 
          token: null, 
          status: 500, 
          id: null, 
          name: null, 
          phone: null, 
          birth_date: null, 
          cpf: null, 
          error: "Erro interno do servidor" 
        }
      }
  
          



   }        
    
    export default login;
  

