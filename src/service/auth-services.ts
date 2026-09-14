import { POST_LOGIN_URL, GET_ME_URL, POST_LOGOUT_URL } from "./api-constants";
import { apiPost, apiGet } from "./axios-instance";

class AuthService {
  login = async (request: { mail: string; password: string }): Promise<any> => {
    return await apiPost(POST_LOGIN_URL, request);
  };

  getMe = async (opts?: { silent?: boolean }): Promise<any> => {
    return await apiGet(GET_ME_URL, {
      silentError: opts?.silent ?? false,
      skipAuthRedirect: opts?.silent ?? false,
    });
  };

  logout = async (): Promise<any> => {
    return await apiPost(POST_LOGOUT_URL, undefined, {
      silentError: true,
      skipAuthRedirect: true,
    });
  };
}

export default new AuthService();
