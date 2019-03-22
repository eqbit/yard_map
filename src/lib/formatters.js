import wNumb from "wnumb";

export const costFormatter = wNumb({
  postfix: ' р.',
  thousand: ' ',
});

export const areaFormatter = wNumb({
  postfix: ' м²',
  thousand: ' ',
});