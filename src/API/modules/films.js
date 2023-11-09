import axiosClient from '../apiClient';

export default async function getFilms(version, paramObject, searchType) {
  const data = await axiosClient({
    method: 'get',
    url: `/${version}/films${searchType}`,
    params: paramObject
  })
  return data
}
