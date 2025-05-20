export = urlMetadata

declare function urlMetadata(
  url: string | null,
  options?: urlMetadata.Options,
): Promise<urlMetadata.Result>

declare namespace urlMetadata {
  interface Options {
    requestHeaders?: Record<string, string>;
    requestFilteringAgentOptions?: import('request-filtering-agent').RequestFilteringAgentOptions;
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
  type Result = Record<string, string | boolean | undefined | any | any[]>;
}
