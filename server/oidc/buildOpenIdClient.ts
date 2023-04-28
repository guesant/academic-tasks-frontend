import { Issuer } from "openid-client";
import { getOpenIDClientConfig } from "../config/getOpenIDClientConfig";

export const buildOpenIdClient = async () => {
  const config = getOpenIDClientConfig();

  const TrustIssuer = await Issuer.discover(config.issuer);

  const client = new TrustIssuer.Client({
    client_id: config.clientId,
    client_secret: config.clientSecret,
  });

  return client;
};
