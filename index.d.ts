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
    decode?: string;
    timeout?: number;
    descriptionLength?: number;
    ensureSecureImageRequest?: boolean;
    includeResponseBody?: boolean;
    parseResponseObject?: globalThis.Response | import('node-fetch').Response;
  }
  type Result = Record<string, string | boolean | undefined | any | any[]>;
}
