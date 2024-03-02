import getConvertRating from '../utils/ConvertRating';

const genres = value => (typeof value.genres[0] === 'undefined' ? '' : value.genres[0].genre);
const countries = value => (typeof value.countries[0] === 'undefined' ? '' : value.countries[0].country);

export default function mapGenresAndCountriesFilms(value) {
  return value.map(item => ({
    id: item.kinopoiskId,
    nameRu: item.nameRu,
    rating: getConvertRating(item.ratingKinopoisk),
    year: item.year,
    genre: genres(item),
    country: countries(item),
    posterUrl: item.posterUrl,
    posterUrlPreview: item.posterUrlPreview,
  }));
}
