import getConvertRating from '@/utils/ConvertRating';

const genres = movie => movie.genres[0].genre ?? '';
const countries = movie => movie.countries[0].country ?? '';

export default function mapTopFilms(arrayOfMovies) {
  return arrayOfMovies.map(movie => ({
    id: movie.filmId,
    nameRu: movie.nameRu,
    rating: getConvertRating(movie.rating),
    year: movie.year,
    genre: genres(movie),
    country: countries(movie),
    posterUrl: movie.posterUrl,
    posterUrlPreview: movie.posterUrlPreview,
  }));
}
