import React from 'react';
import PropTypes from 'prop-types';

import Logout from './Logout';

// export default class PrivateHeader extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <Logout/>
//       </div>
//     );
//   }
// }

const PrivateHeader = (props) => {
    return (
      <div className="header">
        <div className="header--content">
          <h1 className="header--title">{props.title}</h1>
          <Logout/>
        </div>
      </div>
    );
}

PrivateHeader.proptypes = {
  title: PropTypes.string.isRequired
};

PrivateHeader.defaultProp = {
  title: 'Default Title'
};

export default PrivateHeader;
