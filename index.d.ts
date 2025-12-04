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

  interface UrlMetadataError extends Error {
    statusCode?: number;
    paymentRequired?: boolean;
    x402?: Record<string, any>;
  }
}
