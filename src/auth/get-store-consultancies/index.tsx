import axios from "axios";

type ConsultancieSchema = {
    id: number,
    product: {
      id: number,
      image: string,
      title: string,
      description: string,
      price: string,
      created_at: string,
      updated_at: string,
     }
  };
  
  type ApiResponseSchema = {
    consultancies: ConsultancieSchema[],
    totalPages: number,
    status: number,
  };

export default async function fetchStoreConsultancies(currentPage: number): Promise<ApiResponseSchema>{

    try {
        const response = await axios.get('https://sistema-safevet-hom.codejr.com.br/api/shop/consultancies', {
            params: {
                page: currentPage,
            },
        });


        if (response.status !== 200) {
          console.error('Invalid API response:', response.statusText);
          return {consultancies: [], totalPages: 0, status: response.status};
        }

        return response.data
      } catch (error) {
        console.error('Error fetching single article:', error);
        return {consultancies: [], totalPages: 0, status: 500};
      }
}