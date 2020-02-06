import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { facebookLogin } from '../../helpers/authFetch';

const Facebook = ({ informParent = func => func }) => {
  const responseFacebook = response => {
    // console.log(response);

    facebookLogin({
      userID: response.userID,
      accessToken: response.accessToken
    })
      .then(response => {
        // console.log('FACEBOOK SIGNIN SUCCESS', response);
        // inform parent component
        informParent(response);
      })
      .catch(error => {
        // console.log('FACEBOOK SIGNIN ERROR', error.response);
      });
  };
  return (
    <div>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        // render={renderProps => (
        //   <button
        //     onClick={renderProps.onClick}
        //     className="btn btn-primary btn-lg btn-block"
        //   >
        //     <i className="fab fa-facebook pr-2"></i> Sign In with FaceBook
        //   </button>
        // )}
        // icon="fa-facebook"
      />
    </div>
  );
};

export default Facebook;
