import React from 'react';
import { Accounts } from 'meteor/accounts-base';

// export default class Logout extends React.Component {
//
//   onLogout() {
//     Accounts.logout();
//   }
//
//   render() {
//     return (
//       <div>
//         <button onClick={this.onLogout.bind(this)}>
//           log out
//         </button>
//       </div>
//     )
//   }
// }

export default () => {
  return (
      <button
        className="button button--link-text"
        onClick={() => Accounts.logout()}>
        Logout
      </button>
  );
}
