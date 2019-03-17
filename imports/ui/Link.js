import React from 'react';

import AddLink from './AddLink';
import LinksList from './LinksList';
import LinksListFilters from './LinksListFilters';
import PrivateHeader from './PrivateHeader';


export default () => {
  return (
    <div>
      <PrivateHeader title="SRTLNK"/>
      <div className="page-contents">
        <LinksListFilters/>
        <AddLink/>
        <LinksList/>
      </div>
    </div>
  );
};


// export default class Link extends React.Component {
//
//   render() {
//     return (
//       <div>
//         <PrivateHeader title="Links"/>
//         <AddLink/>
//         <LinksList/>
//       </div>
//     );
//   }
// }
