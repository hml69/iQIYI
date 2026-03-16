import axios from 'axios';

const BASE_URL = 'https://ophim1.com';

const api = axios.create({
  baseURL: BASE_URL,
});

export const ophimService = {
  getNewMovies: async (page: number = 1) => {
    const response = await api.get(`/danh-sach/phim-moi-cap-nhat?page=${page}`);
    return response.data;
  },
  getMoviesList: async (type: string, page: number = 1) => {
    const response = await api.get(`/v1/api/danh-sach/${type}?page=${page}`);
    return response.data;
  },
  getMoviesByCategory: async (slug: string, page: number = 1) => {
    const response = await api.get(`/v1/api/the-loai/${slug}?page=${page}`);
    return response.data;
  },
  getMoviesByCountry: async (slug: string, page: number = 1) => {
    const response = await api.get(`/v1/api/quoc-gia/${slug}?page=${page}`);
    return response.data;
  },
  getMovieDetail: async (slug: string) => {
    const response = await api.get(`/phim/${slug}`);
    return response.data;
  },
  searchMovies: async (keyword: string, page: number = 1) => {
    const response = await api.get(`/v1/api/tim-kiem?keyword=${keyword}&page=${page}`);
    return response.data;
  },
};
