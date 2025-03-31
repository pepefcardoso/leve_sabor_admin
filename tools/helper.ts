export const sanitizeImageUrl = (url: string | undefined): string => {
    if (!url) return "/placeholder.jpg";
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.origin + parsedUrl.pathname;
    } catch {
      return "/placeholder.jpg";
    }
  };
  