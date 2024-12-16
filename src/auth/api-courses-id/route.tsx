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
    course: SingleProductSchema,
    status: number,
  };

export default async function fetchSingleCourses(id: number){

    try {
        const response = await axios.get<SingleProductApiResponseSchema>(
          `https://sistema-safevet-hom.codejr.com.br/api/shop/courses/${id}`

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