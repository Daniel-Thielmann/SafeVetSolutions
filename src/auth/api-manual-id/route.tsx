import axios from "axios";


type SingleProductSchema = {
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

  type SingleProductApiResponseSchema = {
    manual: SingleProductSchema,
    status: number,
  };

export default async function fetchSingleManual(id: number){

    try {
        const response = await axios.get<SingleProductApiResponseSchema>(
          `https://sistema-safevet-hom.codejr.com.br/api/shop/manuals/${id}`

        );


        if (response.status !== 200) {
          console.error('Invalid API response:', response.statusText);
          return;
        }

        return response.data
      } catch (error) {
        console.error('Error fetching single article:', error);
      }
}