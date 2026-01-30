import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL ,
    withCredentials: true,
});

// Interceptor para agregar el token de Clerk a cada petición
//axiosInstance.interceptors.request.use(async (config) => {
    // Clerk Frontend API para obtener el token fuera de componentes
  //  const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
    //await clerk.load();
    //const token = await clerk.session?.getToken();
    //if (token) {
     //   config.headers.Authorization = `Bearer ${token}`;
   // }
    //return config;
//});


export default axiosInstance;