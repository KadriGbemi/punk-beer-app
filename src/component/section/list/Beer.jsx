import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { saveSelectedBeer } from '../../../redux/_actions';

import './list.scss';

function Beer({
  name,
  imgUrl,
  foodPairing,
  firstBrewed,
  description,
  dispatch,
}) {
  const history = useHistory();
  const beerItemRef = useRef(null);
  function handleClick(e) {
    e.preventDefault();
    dispatch(
      saveSelectedBeer({
        name,
        imgUrl,
        foodPairing,
        firstBrewed,
        description,
        position: {
          top:
            window.scrollY || window.pageYOffset /* Support older browsers */,
          left:
            window.scrollX || window.pageXOffset /* Support older browsers */,
        },
      }),
    );
    history.push('/detail');
  }
  return (
    <div className="beer-list__item" ref={beerItemRef}>
      <Link to="/detail">
        <img
          src={imgUrl}
          alt="Beer"
          height="250"
          className="beer-list__item__img"
        />
      </Link>
      <div className="beer-list__item_details">
        <p>{name}</p>
        <button type="button" className="main__button" onClick={handleClick}>
          Details
        </button>
      </div>
    </div>
  );
}

Beer.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  foodPairing: PropTypes.arrayOf(PropTypes.string).isRequired,
  firstBrewed: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default connect(null)(Beer);
