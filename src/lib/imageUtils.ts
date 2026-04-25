/**
 * Image utility functions for content pages
 */

/**
 * Get hero image path for job category
 */
export function getJobCategoryImage(category: string): string {
  const categoryMap: Record<string, string> = {
    'upsc': '/images/content/jobs/upsc.png',
    'banking': '/images/content/jobs/banking.png',
    'ssc': '/images/content/jobs/ssc.png',
    'railway': '/images/content/jobs/railway.png',
    'defence': '/images/content/jobs/defence.png',
    'state': '/images/content/jobs/upsc.png', // fallback to upsc for state
  };

  return categoryMap[category.toLowerCase()] || '/images/content/jobs/upsc.png';
}

/**
 * Get OG image path for job category
 */
export function getJobOGImage(category: string): string {
  const categoryMap: Record<string, string> = {
    'upsc': '/images/content/og/upsc.png',
    'banking': '/images/content/og/banking.png',
    'ssc': '/images/content/og/ssc.png',
    'railway': '/images/content/og/railway.png',
    'defence': '/images/content/og/defence.png',
    'state': '/images/content/og/upsc.png',
  };

  return categoryMap[category.toLowerCase()] || '/images/content/og/upsc.png';
}

/**
 * Get blog featured image
 */
export function getBlogFeaturedImage(slug: string): string {
  // Map specific blog posts to images
  const blogImageMap: Record<string, string> = {
    'salary-breakdown': '/images/content/blog/salary.png',
    'success-stories': '/images/content/blog/success.png',
    'banking-career': '/images/content/blog/salary.png',
    'government-job-benefits': '/images/content/blog/salary.png',
  };

  return blogImageMap[slug] || '/images/content/blog/success.png';
}

/**
 * Get blog OG image
 */
export function getBlogOGImage(slug: string): string {
  const blogImageMap: Record<string, string> = {
    'salary-breakdown': '/images/content/og/salary.png',
    'success-stories': '/images/content/og/success.png',
    'banking-career': '/images/content/og/salary.png',
    'government-job-benefits': '/images/content/og/salary.png',
  };

  return blogImageMap[slug] || '/images/content/og/success.png';
}

/**
 * Get comparison VS illustration
 */
export function getComparisonImage(): string {
  return '/images/content/compare/vs-illustration.png';
}

/**
 * Get comparison OG image
 */
export function getComparisonOGImage(): string {
  return '/images/content/og/vs-illustration.png';
}

/**
 * Get inline blog images (cycling through available images)
 */
export function getInlineBlogImage(index: number): string {
  const images = [
    '/images/content/blog/success.png',
    '/images/content/blog/salary.png',
  ];
  
  return images[index % images.length];
}
