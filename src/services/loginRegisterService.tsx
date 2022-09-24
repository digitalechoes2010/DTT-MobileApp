import {apiClient} from '../config/api.config';
import {PathApi} from '../config/api.path.config';

export function LoginRegisterUser(request: any) {

  return apiClient
    .post(PathApi.login, request, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(request);
      return error.response;
    });

}
