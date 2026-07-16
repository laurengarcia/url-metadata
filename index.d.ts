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

  /**
   * Design decision (do not "fix"): error fields are attached only when
   * they carry information & are absent otherwise (see lib/http-error.js).
   * Keeps serialized errors sparse & log-friendly.
   */
  interface UrlMetadataError extends Error {
    requestUrl?: string; // the url the user passed in; absent if falsy (parseResponseObject mode)
    redirects?: { // included in all errors where applicable (some do not reach this point tho)
      count: number;
      chain: RedirectHop[];
    };
    url?: string; // final destination url in request chain
    statusCode?: number;
    paymentRequired?: boolean;
    x402?: Record<string, any>; // x402 payment requirements - https://www.x402.org/
    // errors that *may* fall thru from `node-fetch` dependency in Node.js v18+:
    type?: string;
    errno?: string;
    code?: string;
  }

  /**
   * Intentionally loose (collapses to `any`) for maximum compatibility.
   * For a documented shape, opt in with:
   *   const metadata = await urlMetadata(url) as urlMetadata.KnownFields;
   */
  type Result = Record<string, string | boolean | number | undefined | any | any[]>;

  /**
   * Opt-in documented result shape:
   *   const metadata = await urlMetadata(url) as urlMetadata.KnownFields;
   * Known fields are fully typed; any additional meta tags found on the
   * page are appended as new fields, as strings — except tags starting
   * with `citation_`, which are string[] (per Google Scholar spec, see README).
   */
  interface KnownFields extends KnownFieldsStrict {
    [metaTagName: string]: any;
  }

  /**
   * The complete catalog of fields always present on a successful result
   * (see lib/metadata-fields.js). Closed: no index signature, so `keyof`
   * yields the literal field-name union. Most users want `KnownFields`
   * instead, which allows arbitrary meta tags to be included in definition.
   */
  interface KnownFieldsStrict {
    requestUrl: string | null; // the url the user passed in; null in parseResponseObject mode
    redirects: {
      count: number;
      chain: RedirectHop[];
    };
    url: string; // final destination url in request chain
    responseStatusCode: number;
    responseHeaders: Record<string, string>; // whitelisted set, see lib/extract-headers.js
    performance: {
      ttfbMs?: number; // cumulative: first request start -> final hop's headers arriving
      responseTimeMs?: number; // cumulative: first request start -> body read complete
      redirectTimeMs?: number; // only set when redirects occurred
    };
    canonical: string; // first <link rel="canonical"> found, '' if none
    canonicalUrls: string[]; // raw href of every canonical tag, in document order, if more than 1 found
    lang: string;
    hreflang: HreflangTag[];
    charset: string;
    viewport: string;
    title: string;
    'application-name': string;
    favicons: FaviconTag[];
    image: string;
    description: string;
    keywords: string;
    referrer: string;
    author: string;
    publisher: string;
    creator: string;
    source: string;
    robots: string;
    googlebot: string;
    generator: string;
    'color-scheme': string;
    'theme-color': string;
    price: string;
    priceCurrency: string;
    availability: string;
    jsonld: Record<string, any>[]; // arbitrary schema.org shapes, per-site

    // http://ogp.me/
    'og:url': string;
    'og:locale': string;
    'og:locale:alternate': string;
    'og:title': string;
    'og:type': string;
    'og:description': string;
    'og:determiner': string;
    'og:site_name': string;
    'og:image': string;
    'og:image:alt': string;
    'og:image:secure_url': string;
    'og:image:type': string;
    'og:image:width': string;
    'og:image:height': string;
    'product:brand': string;
    'product:availability': string;
    'product:condition': string;
    'product:price:amount': string;
    'product:price:currency': string;
    'product:retailer_item_id': string;
    'product:item_group_id': string;

    // https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
    'twitter:title': string;
    'twitter:description': string;
    'twitter:image': string;
    'twitter:image:alt': string;
    'twitter:card': string;
    'twitter:site': string;
    'twitter:site:id': string;
    'twitter:url': string;
    'twitter:account_id': string;
    'twitter:creator': string;
    'twitter:creator:id': string;
    'twitter:player': string;
    'twitter:player:width': string;
    'twitter:player:height': string;
    'twitter:player:stream': string;
    'twitter:app:name:iphone': string;
    'twitter:app:id:iphone': string;
    'twitter:app:url:iphone': string;
    'twitter:app:name:ipad': string;
    'twitter:app:id:ipad': string;
    'twitter:app:url:ipad': string;
    'twitter:app:name:googleplay': string;
    'twitter:app:id:googleplay': string;
    'twitter:app:url:googleplay': string;

    headings: Heading[];
    imgTags: ImgTag[];
    responseBody: string; // '' unless options.includeResponseBody is true
  }

  interface HreflangTag {
    hreflang: string;
    href?: string;
  }

  interface FaviconTag {
    rel: string;
    type?: string;
    href?: string;
    sizes?: string;
    color?: string; // only set when rel is 'mask-icon'
  }

  interface Heading {
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    text: string;
  }

  interface ImgTag {
    src?: string;
    alt?: string;
    title?: string;
    width?: string;
    height?: string;
  }

  interface RedirectHop {
    order: number; // 1-based position in the chain (first hop is order: 1)
    url: string; // the url requested at this hop
    statusCode: number; // the 3xx status returned by this hop
  }

}
