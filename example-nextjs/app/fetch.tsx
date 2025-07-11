"use server";

import urlMetadata from "url-metadata";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";

const option: urlMetadata.Options = {
  requestHeaders: {
    "User-Agent": USER_AGENT,
  },
  cache: "no-cache",
  timeout: 15000, // 15 seconds timeout
};

export async function fetchMetadata(url: string) {
  try {
    const metadata = await urlMetadata(url, option);
    console.log(`Fetched metadata from ${url}:`, metadata);
    return metadata || null;
  } catch (error) {
    console.error(`Failed to fetch metadata for ${url}:`, error);
  }
}
