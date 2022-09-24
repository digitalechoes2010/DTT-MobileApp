import {apiClient} from '../config/api.config';
import {PathApi} from '../config/api.path.config';

export default function getItemsApi(): any {

  return apiClient
    .get(PathApi.test)
    .then((data: any) => {
      return data;
    })
    .catch((error: any) => {
      return {
        error,
      };
    });
    
}
