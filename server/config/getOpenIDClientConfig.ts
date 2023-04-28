import { getKeycloakCredentials } from "~/server/config/getKeycloadCredentials";

export const getOpenIDClientConfig = () => {
  const config = getKeycloakCredentials();

  return {
    issuer: config.issuer,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
  };
};
