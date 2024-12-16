import axios from "axios";

type AsaSchema = {
    id: number,
    product : {
      id: number,
      image: string,
      title: string,
      description: string,
      price: string,
      created_at: string,
      updated_at: string,
     }
  }
  
  type ApiResponseSchema = {
    asa: AsaSchema[],
    totalPages: number,
    status: number,
  }

export default async function fetchStoreAsa(currentPage: number): Promise<ApiResponseSchema>{

    try {
        const response = await axios.get('https://sistema-safevet-hom.codejr.com.br/api/shop/asa', {
            params: {
                page: currentPage,
            },
        });


        if (response.status !== 200) {
          console.error('Invalid API response:', response.statusText);
          return {asa: [], totalPages: 0, status: response.status};
        }

        return response.data
      } catch (error) {
        console.error('Error fetching single article:', error);
        return {asa: [], totalPages: 0, status: 500};
      }
}