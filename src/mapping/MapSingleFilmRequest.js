import getConvertRating from '../utils/ConvertRating';

const genres = value => (typeof value.genres[0] === 'undefined' ? '' : value.genres[0].genre);
const countries = value => (typeof value.countries[0] === 'undefined' ? '' : value.countries[0].country);
const checkRating = item => (item.ratingKinopoisk ? item.ratingKinopoisk : item.ratingAwait);
const checkPoster = item => (item.coverUrl == null ? item.posterUrl : item.coverUrl);
const displayCriticsAwait = (ratingKinopoisk, convertedRating) =>
  ratingKinopoisk == null ? `${convertedRating} await rating` : `${convertedRating} critic's rating`;

export default function mapSingleFilmRequest(item) {
  const convertedRating = getConvertRating(checkRating(item));
  return {
    id: item.kinopoiskId,
    nameRu: item.nameRu,
    rating: convertedRating,
    ratingAwait: item.ratingAwait,
    ratingText: displayCriticsAwait(item.ratingKinopoisk, convertedRating),
    year: item.year,
    genre: genres(item),
    country: countries(item),
    posterUrl: checkPoster(item),
    posterUrlPreview: item.posterUrlPreview,
    description: item.description,
  };
}
