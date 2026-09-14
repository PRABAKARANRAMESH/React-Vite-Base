import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { triggerUnauthorized, clearAuthSession, getAccessToken } from "@/utils/auth-session";

const baseURL = import.meta.env.VITE_REACT_CLIENT_URL;

type AppAxiosConfig = AxiosRequestConfig & {
  silentError?: boolean;
  skipAuthRedirect?: boolean;
};

const instance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type ToastHandler = (message: string, severity?: "success" | "error" | "info" | "warning") => void;
let toastHandler: ToastHandler | null = null;

export const setToastHandler = (handler: ToastHandler) => {
  toastHandler = handler;
};

const showToast = (message: string, severity: "success" | "error" | "info" | "warning" = "info") => {
  toastHandler?.(message, severity);
};

const handleSessionExpired = () => {
  clearAuthSession();
  triggerUnauthorized();
  if (!window.location.hash.includes("/auth/login")) {
    window.location.replace(`${import.meta.env.VITE_PUBLIC_PATH || "/"}#/auth/login`);
  }
};

instance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.config.responseType === "blob") return response;

    if (response.config.method !== "get") {
      const msg = response.data?.message;
      const severity = response.data?.success ? "success" : "error";
      if (msg && msg !== "Success") showToast(msg, severity);
    }

    const httpOk = response.status === 200 || response.status === 201;
    const apiOk = response.data?.success === true;
    if (httpOk || apiOk) return response.data;

    return Promise.reject(response.data);
  },
  async (error: AxiosError<any>) => {
    const status = error.response?.status;
    const data = error.response?.data as any;
    const message = data?.message || error.message || "Something went wrong";
    const config = (error.config || {}) as AppAxiosConfig;
    const url = config.url || "";
    const silent = !!config.silentError;
    const skipRedirect = !!config.skipAuthRedirect;
    const isLoginCall = url.includes("login");

    // bank-automation: only 401 means session expired (not 403)
    if (status === 401 && !isLoginCall && !skipRedirect) {
      handleSessionExpired();
      return Promise.reject(error);
    }

    if (!silent) showToast(message, "error");
    return Promise.reject(error);
  }
);

export const apiGet = <T = any>(url: string, config?: AppAxiosConfig) =>
  instance.get<T>(url, config);

export const apiPost = <T = any>(url: string, data?: any, config?: AppAxiosConfig) =>
  instance.post<T>(url, data, config);

export const apiUpdate = <T = any>(url: string, data?: any, config?: AppAxiosConfig) =>
  instance.put<T>(url, data, config);

export const apiDelete = <T = any>(url: string, config?: AppAxiosConfig) =>
  instance.delete<T>(url, config);

export const apiDownload = (url: string, config?: AppAxiosConfig) =>
  instance.get(url, { responseType: "blob", ...config });

export const apiUpload = <T = any>(url: string, data: FormData, config?: AppAxiosConfig) =>
  instance.post<T>(url, data, { headers: { "Content-Type": "multipart/form-data" }, ...config });

export default instance;
