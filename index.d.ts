export = urlMetadata

declare function urlMetadata(
  url: string,
  options?: urlMetadata.Options,
): Promise<urlMetadata.Result>

declare namespace urlMetadata {
  interface Options {
    requestHeaders?: Record<string, string>
    cache?: string
    mode?: string
    decode?: string
    timeout?: number
    descriptionLength?: number
    ensureSecureImageRequest?: boolean
    includeResponseBody?: boolean
    parseResponseObject?: Response
  }
  type Result = Record<string, string | boolean | undefined | any>;
}
