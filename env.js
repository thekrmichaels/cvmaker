const { VITE_CLIENT_ID, VITE_DOMAIN, VITE_CVMAKER_API } = import.meta.env;

const Auth0 = {
  clientId: VITE_CLIENT_ID,
  domain: VITE_DOMAIN,
};

export { Auth0, VITE_CVMAKER_API as CVMaker_API };
