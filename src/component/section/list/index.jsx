import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBeers } from '../../../redux/_actions';
import Beer from './Beer';

import './list.scss';

function BeersList({ beers, beerDetails, dispatch }) {
  useEffect(() => {
    if (beers.length < 1) {
      dispatch(getBeers());
    }
    if (beerDetails && beerDetails.position) {
      // window.scroll for other browser
      window.scroll({
        top: beerDetails.position.top,
        left: beerDetails.position.left,
        behavior: 'smooth',
      });
      // // window.scroll for Internet Explorer and Safari browsers
      // window.scroll(beerDetails.position.left, beerDetails.position.top);
    }
  });

  return (
    <section className="beer-list">
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
  ]).isRequired,
};

BeersList.defaultProps = {
  beers: [],
};

function mapStateToProps(state) {
  return {
    beers: state.beers,
    beerDetails: state.beerDetails,
  };
}
export default connect(mapStateToProps)(BeersList);
