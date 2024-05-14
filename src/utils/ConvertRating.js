/* eslint-disable radix */
export default function getConvertRating(rating) {
  let result = 0;

  if (rating === null) {
    result = 'TBA';
  } else if ((typeof rating === 'string' && rating.includes('%')) || rating > 10) {
    result = Math.round(parseInt(rating) / 10) / 2;
  } else {
    result = Math.round(rating) / 2;
  }
  return result;
}
