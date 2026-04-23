import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blogData";

const baseUrl = "https://prepkar.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl,                              lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${baseUrl}/jobs`,                    lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/current-affairs`,         lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${baseUrl}/blog`,                    lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/prepare`,                 lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/ai-practice`,             lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/compare`,                 lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/pricing`,                 lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/stories`,                 lastModified: now, changeFrequency: "weekly",  priority: 0.5 },
    { url: `${baseUrl}/about`,                   lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`,                 lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy`,                 lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    ...blogEntries,
  ];
}

