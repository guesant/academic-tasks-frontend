import { withHttps, withoutTrailingSlash } from "ufo";

const PRODUCTION_URL = process.env.PRODUCTION_URL;

const getVercelURL = () => {
  const vercelEnv = process.env.VERCEL_ENV;

  if (vercelEnv === "production") {
    return PRODUCTION_URL;
  }

  const vercelCommitURLRaw = process.env.VERCEL_URL;

  const vercelCommitURL = vercelCommitURLRaw ? withHttps(vercelCommitURLRaw) : null;

  return vercelCommitURL;
};

const getNetlifyURL = () => {
  if (process.env.NETLIFY) {
    if (process.env.CONTEXT === "production") {
      return process.env.URL ?? PRODUCTION_URL;
    }

    return process.env.DEPLOY_URL;
  }

  return null;
};

const getRuntimeURL = () => {
  const runtimeURLRaw = process.env.RUNTIME_URL ?? getVercelURL() ?? getNetlifyURL();

  const runtimeURL = runtimeURLRaw && withoutTrailingSlash(runtimeURLRaw);

  return runtimeURL;
};

const getAuthBaseURL = () => {
  const url = getRuntimeURL();

  const AUTH_ORIGIN = url ?? process.env.AUTH_ORIGIN;

  return AUTH_ORIGIN;
};

export const getRuntimeConfigs = () => {
  const url = getRuntimeURL();

  const authBaseURL = getAuthBaseURL();

  return {
    url,

    authBaseURL,
  };
};
