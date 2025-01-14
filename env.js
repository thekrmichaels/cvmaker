const { VITE_CLIENT_ID, VITE_DOMAIN, VITE_CVMAKER_API } = import.meta.env;

const Auth0 = {
  clientId: VITE_CLIENT_ID,
  domain: VITE_DOMAIN,
};

const CVMaker_API = VITE_CVMAKER_API;

export { Auth0, CVMaker_API };
