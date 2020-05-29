import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleImageError } from '../helper';

function LeftDetailSection({ beerDetails }) {
  return (
    <div className="left-details-section">
      <div>
        <img
          src={handleImageError(beerDetails.imgUrl)}
          alt={beerDetails.name}
          height="250"
        />
        <p>{beerDetails.name}</p>
      </div>
    </div>
  );
}

LeftDetailSection.propTypes = {
  beerDetails: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

function mapStateToProps(state) {
  return {
    beerDetails: state.beerDetails,
  };
}
export default connect(mapStateToProps, null)(LeftDetailSection);
