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

  const getFourNews = async (): Promise<PostProps[]> => {

    try {
        const response = await axios.get (
            'https://sistema-safevet-hom.codejr.com.br/api/lastFourNews'
        );

        if  (response.status === 200) {

            const data = response.data;

            if (Array.isArray(data.news)) {
                return data.news;
            } else {
                console.error('Unexpected response format:', data);
                return [];
            }
        } else if (response.status === 204) {
            return [];
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return [];
    }
};

export default getFourNews;