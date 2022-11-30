import { updateUserAvatar } from '../data/users';

export function sanitizeExcerpt(excerpt: any) {
  if (typeof excerpt !== "string") {
    throw new Error(
      `Failed to sanitize excerpt: invalid type ${typeof excerpt}`
    );
  }

  let sanitized = excerpt;

  // If the theme includes [...] as the more indication, clean it up to just ...

  sanitized = sanitized.replace(/\s?\[&hellip;\]/, "&hellip;");

  // If after the above replacement, the ellipsis includes 4 dots, it's
  // the end of a setence

  sanitized = sanitized.replace("....", ".");
  sanitized = sanitized.replace(".&hellip;", ".");

  // If the theme is including a "Continue..." link, remove it

  sanitized = sanitized.replace(/\w*<a class="more-link".*<\/a>/, "");

  return sanitized;
}

export function mapPostData(post = {}) {
  const data: any = { ...post };

  // Clean up the author object to avoid someone having to look an extra
  // level deeper into the node

  if (data.author) {
    data.author = {
      ...data.author.node,
    };
  }

  // The URL by default that comes from Gravatar / WordPress is not a secure
  // URL. This ends up redirecting to https, but it gives mixed content warnings
  // as the HTML shows it as http. Replace the url to avoid those warnings
  // and provide a secure URL by default

  if (data.author?.avatar) {
    data.author.avatar = updateUserAvatar(data.author.avatar);
  }

  // Clean up the categories to make them more easy to access

  // if (data.categories) {
  //   data.categories = data.categories.nodes.map(({ node }: any) => {
  //     return {
  //       ...node,
  //     };
  //   });
  // }

  // Clean up the featured image to make them more easy to access

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  return data;
}

export function removeLastTrailingSlash(url: string) {
  if (typeof url !== "string") return url;
  return url.replace(/\/$/, "");
}

export function removeExtraSpaces(text: string) {
  if (typeof text !== "string") return;
  return text.replace(/\s+/g, " ").trim();
}

export function decodeHtmlEntities(text: string) {
  if (typeof text !== "string") {
    throw new Error(
      `Failed to decode HTML entity: invalid type ${typeof text}`
    );
  }

  let decoded = text;

  const entities: any = {
    "&amp;": "\u0026",
    "&quot;": "\u0022",
    "&#039;": "\u0027",
  };

  return decoded.replace(/&amp;|&quot;|&#039;/g, (char: any) => entities[char]);
}
