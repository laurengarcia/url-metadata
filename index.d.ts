// Type definitions for url-metadata
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

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
    timeout?: number
    descriptionLength?: number
    ensureSecureImageRequest?: boolean
    includeResponseBody?: boolean
  }
  type Result = Record<string, string | boolean | Record<string, string> | Array<Record<string, string>>>;
}
