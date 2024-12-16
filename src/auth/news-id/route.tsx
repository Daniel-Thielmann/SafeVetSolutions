import axios from "axios";

type PostProps = {
    id: number ;
    title: string;
    image: string;
    content: string;
    created_at: string;
    updated_at: string;
    adm_id: number | null;
};

type ApiResponseSchema = {
    news: PostProps,
    status: number
}

export default async function fetchSingleNews(id : number){

    try {
        const response = await axios.get<ApiResponseSchema>(
          `https://sistema-safevet-hom.codejr.com.br/api/news/${id}`

        );


       if (response.status !== 200) {
          console.error('Invalid API response:', response.status);
          return null;
        }

        return response.data
      } catch (error) {
        console.error('Error fetching single article:', error);
        return null;
      }

}