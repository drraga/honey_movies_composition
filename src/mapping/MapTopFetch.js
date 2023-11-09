import getConvertRating from '../utils/ConvertRating';

const genres = (value) => (typeof value.genres[0] === 'undefined' ? '' : value.genres[0].genre)
const countries = (value) => (typeof value.countries[0] === 'undefined' ? '' : value.countries[0].country)

export default function mapTopFilms(value) {
  return value.map((item) => ({
    id: item.filmId,
    nameRu: item.nameRu,
    rating: getConvertRating(item.rating),
    year: item.year,
    genre: genres(item),
    country: countries(item),
    posterUrl: item.posterUrl,
    posterUrlPreview: item.posterUrlPreview,
  }))
}
