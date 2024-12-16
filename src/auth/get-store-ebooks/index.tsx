import axios from "axios";

type EbookSchema = {
    id: number,
    file: string,
    created_at: string,
    updated_at: string,
    product: {
      id: number,
      image: string,
      title: string,
      description: string,
      price: string,
     }
  };
  
  type ApiResponseSchema = {
    ebooks: EbookSchema[],
    totalPages: number,
    status: number,
  };

export default async function fetchStoreEbooks(currentPage: number): Promise<ApiResponseSchema>{

    try {
        const response = await axios.get('https://sistema-safevet-hom.codejr.com.br/api/shop/ebooks', {
            params: {
                page: currentPage,
            },
        });


        if (response.status !== 200) {
          console.error('Invalid API response:', response.statusText);
          return {ebooks: [], totalPages: 0, status: response.status};
        }

        return response.data
      } catch (error) {
        console.error('Error fetching single article:', error);
        return {ebooks: [], totalPages: 0, status: 500};
      }
}