import React from 'react';

import CallToActionAlert from '../../CallToActionAlert';
import { verify } from 'platform/user/authentication/utilities';

const verifyHandler = () => {
  verify(this.props.useSSOe ? 'v1' : 'v0');
};

function NotAuthorized({ useSSOe }) {
  const content = {
    heading: 'Verify your identity to access more VA.gov tools and features',
    alertText: (
      <>
        <p>
          When you verify your identity, you can use VA.gov to do things like
          track your claims, refill your prescriptions, and download your VA
          benefit letters.
        </p>
        <button
          className="usa-button-primary"
          onClick={() => verifyHandler(useSSOe)}
        >
          Verify Your Identity
        </button>
        <p>
          <a href="/sign-in-faq/#how-to-verify">
            Learn about how to verify your identity
          </a>
        </p>
      </>
    ),
    status: 'info',
  };

  return <CallToActionAlert {...content} />;
}

export default NotAuthorized;
