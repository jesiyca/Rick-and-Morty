/**
 * Generates a list of pages for pagination UI, with ellipsis (-1) placeholders.
 */
export function getPageRange(currentPage: number, totalPages: number, visiblePages = 5): number[] {
    const pages: number[] = [];
  
    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  
    const showLeftEllipsis = currentPage > 3;
    const showRightEllipsis = currentPage < totalPages - 2;
  
    pages.push(1);
  
    if (showLeftEllipsis) {
      pages.push(-1); // Left ellipsis
    }
  
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
  
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  
    if (showRightEllipsis) {
      pages.push(-1); // Right ellipsis
    }
  
    pages.push(totalPages);
  
    return pages;
  }