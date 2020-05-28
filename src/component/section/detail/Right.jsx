import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import './detail.scss';

function RightDetailSection({
  beerDetails: { firstBrewed, description, foodPairing },
}) {
  const foodPairingToString = (foodPairing || []).join();
  const history = useHistory();
  return (
    <div className="right-details-section">
      <strong>Brewed:</strong>
      <p>{firstBrewed}</p>
      <strong> Description:</strong>
      <p>{description}</p>
      <strong>Food Paring:</strong>
      <p>{`${foodPairingToString.replace(/,/g, ', ')}.`}</p>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <button
          type="button"
          className="main__button"
          style={{
            width: '200px',
            padding: '8px',
          }}
          onClick={(e) => {
            e.preventDefault();
            history.push('/');
          }}
        >
          Beer list
        </button>
      </div>
    </div>
  );
}

RightDetailSection.propTypes = {
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
export default connect(mapStateToProps, null)(RightDetailSection);
