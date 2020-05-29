export function handleScroll(
  dispatch,
  setPage,
  pageNumber,
  isNextPage,
  setPageNumber,
) {
  const windowHeight =
    'innerHeight' in window
      ? window.innerHeight
      : document.documentElement
          .offsetHeight; /* Support the use of older browsers */
  const beerListElement = document.getElementById('beer-list');
  const bottomPosition = beerListElement.getBoundingClientRect().bottom;
  if (Math.round(bottomPosition) <= windowHeight + windowHeight / 2) {
    dispatch(setPage(pageNumber + 1));
    window.removeEventListener('scroll', handleScroll);
    if (isNextPage === false) {
      const moveToFirstPage = setTimeout(() => {
        window.scroll(0, 0);
      }, 3000);
      setPageNumber(pageNumber);
      return () =>
        clearTimeout(
          moveToFirstPage,
        ); /* Added delay before moving to first page for visibility purpose */
    }
  }
  return undefined;
}

export function handleImageError(imgPath) {
  try {
    if (imgPath === null) {
      return require('../../assets/image-not-available.jpg'); // eslint-disable-line global-require
    }
    return imgPath;
  } catch (err) {
    return require('../../assets/image-not-available.jpg'); // eslint-disable-line global-require
  }
}
