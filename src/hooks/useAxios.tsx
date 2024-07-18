import api from "@/lib/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function useAxios() {
  const { data } = useSession();

  useEffect(() => {
    // Interceptor to add Authorization header
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if ((data as any)?.accessToken) {
          config.headers.Authorization = `Bearer ${(data as any).accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [data]);

  useEffect(() => {
    return () => {
      api.interceptors.request.clear();
    };
  }, []);

  return api;
}
