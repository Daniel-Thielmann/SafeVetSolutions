import axios from 'axios';

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
    news: PostProps[],
    totalPages: number,
    status: number
}

const getArticles = async (currentPage : number): Promise<ApiResponseSchema> => {

    try {
        const response = await axios.get('https://sistema-safevet-hom.codejr.com.br/api/news', {
            params: {
                page: currentPage,
            }
        }
        );

        if (response.status === 200) {

            const data = response.data;
            return data;

        } else if (response.status === 204) {
            return {news:[], totalPages: 0, status: 204};
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return {news:[], totalPages: 0, status: 500};
    }
};

export default getArticles;