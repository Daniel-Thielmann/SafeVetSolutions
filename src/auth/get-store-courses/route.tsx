import axios from "axios";

type CoursesSchema = {
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
    courses: CoursesSchema[],
    totalPages: number,
    status: number,
  };

export default async function fetchStoreCourses(currentPage: number): Promise<ApiResponseSchema>{

    try {
        const response = await axios.get('https://sistema-safevet-hom.codejr.com.br/api/shop/courses', {
            params: {
                page: currentPage,
            },
        });


        if (response.status !== 200) {
          console.error('Invalid API response:', response.statusText);
          return {courses: [], totalPages: 0, status: response.status};
        }

        return response.data
      } catch (error) {
        console.error('Error fetching single article:', error);
        return {courses: [], totalPages: 0, status: 500};
      }
}