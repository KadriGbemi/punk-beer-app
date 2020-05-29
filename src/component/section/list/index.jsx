import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBeers, setPage } from '../../../redux/_actions';
import { handleScroll } from '../helper';
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
  function scrollFunc() {
    return handleScroll(
      dispatch,
      setPage,
      pageNumber,
      isNextPage,
      setPageNumber,
    );
  }
  useEffect(() => {
    window.addEventListener('scroll', scrollFunc, true);

    return () => {
      window.removeEventListener('scroll', scrollFunc, true);
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
