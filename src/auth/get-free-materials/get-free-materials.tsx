import axios from "axios";


type Content = {
    id: number;
    title: string;
    file: string;
    adm_id: string;
    created_at: string;
    updated_at: string;
}

type FreeMaterialsResponse = {
    freeContents: Content[];
    totalPages: number;
    status: number;
}

const getFreeMaterials = async (currentPage: number): Promise<FreeMaterialsResponse> => {

    const route = axios.create({
        baseURL: "https://sistema-safevet-hom.codejr.com.br/api",
        params: {
            page: currentPage,
        },
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    });

    try{
        const response = await route.get("/freeContents");
        return response.data;
    } catch(err: any){
        if(err.response){
            return err.response ;
        } else{
            return {
                freeContents: [],
                totalPages: 1,
                status: 500,
            } ;
        }
    }

}

export default getFreeMaterials