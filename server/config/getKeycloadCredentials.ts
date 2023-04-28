export const getKeycloakCredentials = () => {
  const clientId = process.env.KEYCLOAK_ID;
  const clientSecret = process.env.KEYCLOAK_SECRET;
  const issuer = process.env.KEYCLOAK_ISSUER;

  if (!clientId || !clientSecret || !issuer) {
    throw new Error("Missing Keycloak credentials");
  }

  return { clientId, clientSecret, issuer };
};
