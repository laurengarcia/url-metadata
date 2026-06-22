export = urlMetadata

declare function urlMetadata(
  url: string | null,
  options?: urlMetadata.Options,
): Promise<urlMetadata.Result>

declare namespace urlMetadata {
  interface Options {
    requestHeaders?: Record<string, string>;
    requestFilteringAgentOptions?: import('request-filtering-agent').RequestFilteringAgentOptions;
    agent?: any; // Suggest: Node.js http.Agent | https.Agent
    cache?: string;
    mode?: string;
    maxRedirects?: number;
    timeout?: number;
    size?: number;
    compress?: boolean;
    decode?: string;
    descriptionLength?: number;
    ensureSecureImageRequest?: boolean;
    includeResponseBody?: boolean;
    parseResponseObject?: globalThis.Response | import('node-fetch').Response;
  }

  type Result = Record<string, string | boolean | number | undefined | any | any[]>;

  interface RedirectHop {
    order: number; // 1-based position in the chain (first hop is order: 1)
    url: string; // the url requested at this hop
    statusCode: number; // the 3xx status returned by this hop
  }

  interface UrlMetadataError extends Error {
    requestUrl?: string; // the url the user passed in
    redirects?: { // included in all errors where applicable (some do not reach this point tho)
      count: number;
      chain: RedirectHop[]
    };
    url?: string; // final destination url in request chain
    statusCode?: number;
    paymentRequired?: boolean;
    x402?: Record<string, any>; // x402 payment requirements - https://www.x402.org/
    // errors that *may* fall thru from `node-fetch` dependency in Node.js v6+:
    type?: string;
    errno?: string;
    code?: string;
  }
}
