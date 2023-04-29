import isHttps from "is-https";

export const useRequestURL = () => {
  let requestHost: string | undefined = undefined;
  let requestProtocol: string | undefined = undefined;

  if (process.server) {
    const headers = useRequestHeaders();
    requestHost = headers.host;

    const nuxtApp = useNuxtApp();
    const req = nuxtApp.ssrContext?.event.node.req;
    requestProtocol = req && isHttps(req) ? "https" : "http";
  } else {
    requestHost = window.location.host;
    requestProtocol = window.location.protocol.slice(0, -1);
  }

  const origin = `${requestProtocol}://${requestHost}`;

  return {
    origin,
    host: requestHost,
    protocol: requestProtocol,
  };
};
