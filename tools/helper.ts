export const sanitizeImageUrl = (url: string | undefined): string => {
    if (!url) return "/placeholder.jpg";
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.origin + parsedUrl.pathname;
    } catch {
      return "/placeholder.jpg";
    }
  };
  
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}