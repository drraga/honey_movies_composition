import getConvertRating from '@/utils/ConvertRating';

const genres = movie => (typeof movie.genres[0] === 'undefined' ? '' : movie.genres[0].genre);
const countries = movie => (typeof movie.countries[0] === 'undefined' ? '' : movie.countries[0].country);
const checkRating = movie => (movie.ratingKinopoisk ? movie.ratingKinopoisk : movie.ratingAwait);
const checkPoster = movie => (movie.coverUrl == null ? movie.posterUrl : movie.coverUrl);
const displayCriticsAwait = (ratingKinopoisk, convertedRating) =>
  ratingKinopoisk == null ? `${convertedRating} await rating` : `${convertedRating} critic's rating`;

export default function mapSingleFilmRequest(movie) {
  const convertedRating = getConvertRating(checkRating(movie));

  return {
    id: movie.kinopoiskId,
    nameRu: movie.nameRu,
    rating: convertedRating,
    ratingAwait: movie.ratingAwait,
    ratingText: displayCriticsAwait(movie.ratingKinopoisk, convertedRating),
    year: movie.year,
    genre: genres(movie),
    country: countries(movie),
    posterUrl: checkPoster(movie),
    posterUrlPreview: movie.posterUrlPreview,
    description: movie.description,
  };
}
