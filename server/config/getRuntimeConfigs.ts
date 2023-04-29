import { joinURL, parseURL, stringifyParsedURL, withoutTrailingSlash } from "ufo";

const PRODUCTION_URL = process.env.PRODUCTION_URL;

const loadUrl = (url: string) => stringifyParsedURL(parseURL(url, "https://"));

const getVercelURL = () => {
  const vercelEnv = process.env.VERCEL_ENV;

  if (typeof vercelEnv === "string" && vercelEnv.length > 0) {
    if (vercelEnv === "production" && PRODUCTION_URL) {
      return PRODUCTION_URL;
    }

    const vercelCommitURLRaw = process.env.VERCEL_URL;

    const vercelCommitURL = vercelCommitURLRaw ? loadUrl(vercelCommitURLRaw) : null;

    return vercelCommitURL;
  }

  return null;
};

const getNetlifyURL = () => {
  if (process.env.NETLIFY) {
    const netlifyCommitURLRaw = process.env.DEPLOY_URL;

    const netlifyCommitURL = netlifyCommitURLRaw ? loadUrl(netlifyCommitURLRaw) : null;

    return netlifyCommitURL;
  }

  return null;
};

const getRuntimeURL = () => {
  const runtimeURLRaw = PRODUCTION_URL ?? getNetlifyURL() ?? getVercelURL();

  const runtimeURL = runtimeURLRaw && withoutTrailingSlash(runtimeURLRaw);

  return runtimeURL;
};

const getAuthOrigin = () => {
  const url = getRuntimeURL();
  const origin = process.env.AUTH_ORIGIN ?? url;
  return origin;
};

const getAuthBaseURL = () => {
  const origin = getAuthOrigin();

  const baseUrl = origin ? joinURL(origin, "/api/auth") : undefined;

  return baseUrl;
};

const getGQLHost = () => {
  const gqlHost = process.env.GQL_HOST!;
  return gqlHost;
};

export const getRuntimeConfigs = () => {
  const gqlHost = getGQLHost();

  const url = getRuntimeURL();

  const authBaseURL = getAuthBaseURL();

  return {
    url,
    gqlHost,
    authBaseURL,
  };
};
