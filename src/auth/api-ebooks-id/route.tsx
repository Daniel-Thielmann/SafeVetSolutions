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
    },
};

  type SingleProductApiResponseSchema = {
    ebook: SingleProductSchema,
    message? : string,
    status: number,
  };

export default async function fetchSingleEbook(id : number){

    try {
        const response = await axios.get<SingleProductApiResponseSchema>(
          `https://sistema-safevet-hom.codejr.com.br/api/shop/ebooks/${id}`

        );


       /* if (response.status !== 200) {
          console.error('Invalid API response:', response.status);
          return {ebooks: [], status: response.data.message};
        }*/

        return response.data
      } catch (error) {
        console.error('Error fetching single article:', error);
        //return {ebooks: [], status: 500};
      }

}