import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dayInLifeData from "@/data/day-in-life.json";
import ArticleContent from "./ArticleContent";

// Pre-render all article slugs at build time
export function generateStaticParams() {
  return dayInLifeData.articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = dayInLifeData.articles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} | NaukriYatra`,
    description: article.description,
    keywords: `${article.title.toLowerCase()}, government job, ${article.category}, career`,
    alternates: { canonical: `/life/${params.slug}` },
    openGraph: {
      title: `${article.title} | NaukriYatra`,
      description: article.description,
      url: `https://prepkar.vercel.app/life/${params.slug}`,
      type: "article",
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = dayInLifeData.articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const currentIndex = dayInLifeData.articles.findIndex((a) => a.slug === params.slug);
  const previousArticle = currentIndex > 0 ? dayInLifeData.articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < dayInLifeData.articles.length - 1 ? dayInLifeData.articles[currentIndex + 1] : null;

  return (
    <ArticleContent
      article={article}
      previousArticle={previousArticle ? { slug: previousArticle.slug, title: previousArticle.title } : null}
      nextArticle={nextArticle ? { slug: nextArticle.slug, title: nextArticle.title } : null}
    />
  );
}
