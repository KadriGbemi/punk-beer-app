import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBeers, setPage } from '../../../redux/_actions';
import Beer from './Beer';

import './list.scss';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
function BeersList({ beers, beerDetails, isNextPage, dispatch, pageNumber }) {
  const [page, setPageNumber] = useState(pageNumber);

  const prevPage = usePrevious(page);

  function handlePageDisplay() {
    if (prevPage === page || beers.length < 1) {
      dispatch(getBeers(pageNumber));
    }
  }
  function handleScroll() {
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
        }, 2000);
        setPageNumber(pageNumber);
        return () =>
          clearTimeout(
            moveToFirstPage,
          ); /* Added delay before moving to first page for visibility purpose */
      }
    }
    return undefined;
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  });
/*eslint-disable */
  useEffect(() => handlePageDisplay(), [pageNumber]);
  /* eslint-enable */
  useEffect(() => {
    if (beerDetails && beerDetails.position && isNextPage !== true) {
      return window.scrollTo(
        beerDetails.position.left,
        beerDetails.position.top,
      );
    }
    return undefined;
  });
  return (
    <section className="beer-list" id="beer-list">
      {beers.map((item) => (
        <Beer
          key={item.id}
          name={item.name}
          imgUrl={item.image_url}
          foodPairing={item.food_pairing}
          firstBrewed={item.first_brewed}
          description={item.description}
        />
      ))}
    </section>
  );
}

BeersList.propTypes = {
  beers: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func.isRequired,
  beerDetails: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
  isNextPage: PropTypes.bool,
  pageNumber: PropTypes.number,
};

BeersList.defaultProps = {
  beers: [],
  pageNumber: 1,
  isNextPage: undefined,
  beerDetails: {},
};

function mapStateToProps(state) {
  return {
    beers: state.beers,
    beerDetails: state.beerDetails,
    isNextPage: state.isNextPage,
    pageNumber: state.pageNumber,
  };
}
export default connect(mapStateToProps)(BeersList);
