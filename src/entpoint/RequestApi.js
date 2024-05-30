import axios from 'axios';





export const ReqApiStudy = async (url, param) => {
    const headers_config = {'Content-Type': 'application/json'};
    try {
        const response = await axios.post(url, param, headers_config);
        return response;
    } catch (error) {
        throw error;
    }
}

export const base_url = "https://study.cobaktesbrow.com/api/";
export const study_get_all = "getAll";
export const study_saved = "saved";
export const study_getId = "getById";
export const study_delete = "delete";