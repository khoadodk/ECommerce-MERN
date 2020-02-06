import React from 'react';
import GoogleLogin from 'react-google-login';
import { googleLogin } from '../../helpers/authFetch';

const Google = ({ informParent = func => func }) => {
  const responseGoogle = response => {
    // console.log(response);
    googleLogin({ idToken: response.tokenId })
      .then(res => {
        // console.log('GOOGLE SIGNIN SUCCESS', res);
        // inform parent component/Signin to save the user into the localstorage
        informParent(res);
      })
      .catch(error => {
        // console.log('GOOGLE SIGNIN ERROR', error);
      });
  };
  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
};

export default Google;
