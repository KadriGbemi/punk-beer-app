import React from 'react';

import LeftDetailSection from '../../component/section/detail/Left';
import RightDetailSection from '../../component/section/detail/Right';

import './detail.scss';

function DetailsPage() {
  return (
    <div className="beer-detail">
      <div>
        <LeftDetailSection />
      </div>
      <div>
        <RightDetailSection />
      </div>
    </div>
  );
}

export default DetailsPage;
