import getConvertRating from '@/utils/ConvertRating';

const genres = movie => movie.genres[0].genre ?? '';
const countries = movie => movie.countries[0].country ?? '';

export default function mapGenresAndCountriesFilms(movies) {
  return movies.map(movie => ({
    id: movie.kinopoiskId,
    nameRu: movie.nameRu,
    rating: getConvertRating(movie.ratingKinopoisk),
    year: movie.year,
    genre: genres(movie),
    country: countries(movie),
    posterUrl: movie.posterUrl,
    posterUrlPreview: movie.posterUrlPreview,
  }));
}
