import { BLOG_POSTS } from '@/lib/blogData';
import dayInLifeData from '@/data/day-in-life.json';
import { CURRENT_AFFAIRS } from '@/components/data';

export type SavedArticleType = 'blog' | 'life' | 'current-affairs';

export type SavedArticleMeta = {
  id: string;
  type: SavedArticleType;
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  href: string;
  icon: string;
  accent: string;
};

type DayInLifeArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  readTime: string;
};

function makeSavedArticleId(type: SavedArticleType, slug: string): string {
  return `${type}:${slug}`;
}

function slugifyCurrentAffairs(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function makeCurrentAffairsSlug(date: string, topic: string, fact: string): string {
  return `${date}-${topic}-${slugifyCurrentAffairs(fact)}`;
}

function getCurrentAffairsAccent(topic: string): string {
  const accents: Record<string, string> = {
    Polity: '#7C3AED',
    Economy: '#16A34A',
    Science: '#2563EB',
    International: '#0D9488',
    Sports: '#DC2626',
    Awards: '#D97706',
    Defence: '#134E4A',
    Banking: '#0C7C59',
    Environment: '#059669',
  };

  return accents[topic] || '#2563EB';
}

function getCurrentAffairsIcon(topic: string): string {
  const icons: Record<string, string> = {
    Polity: '🏛️',
    Economy: '💹',
    Science: '🧪',
    International: '🌍',
    Sports: '🏅',
    Awards: '🏆',
    Defence: '🛡️',
    Banking: '🏦',
    Environment: '🌿',
  };

  return icons[topic] || '📰';
}

const LIFE_ARTICLES: SavedArticleMeta[] = (dayInLifeData.articles as DayInLifeArticle[]).map((article) => ({
  id: makeSavedArticleId('life', article.slug),
  type: 'life',
  slug: article.slug,
  title: article.title,
  description: article.description,
  category: article.category,
  readTime: article.readTime,
  href: `/life/${article.slug}`,
  icon: article.icon,
  accent: '#7C3AED',
}));

const BLOG_ARTICLES: SavedArticleMeta[] = BLOG_POSTS.map((post) => ({
  id: makeSavedArticleId('blog', post.slug),
  type: 'blog',
  slug: post.slug,
  title: post.title,
  description: post.excerpt,
  category: post.category,
  readTime: post.readTime,
  href: `/blog/${post.slug}`,
  icon: post.coverIcon,
  accent: '#2563EB',
}));

const CURRENT_AFFAIRS_ARTICLES: SavedArticleMeta[] = CURRENT_AFFAIRS.map((entry) => {
  const slug = makeCurrentAffairsSlug(entry.date, entry.topic, entry.fact);

  return {
    id: makeSavedArticleId('current-affairs', slug),
    type: 'current-affairs',
    slug,
    title: entry.fact,
    description: `${entry.topic} · ${entry.importance} importance · Source: ${entry.source}`,
    category: entry.topic,
    readTime: 'Quick fact',
    href: `/current-affairs#${slug}`,
    icon: getCurrentAffairsIcon(entry.topic),
    accent: getCurrentAffairsAccent(entry.topic),
  };
});

export const ALL_SAVED_ARTICLES: SavedArticleMeta[] = [...BLOG_ARTICLES, ...LIFE_ARTICLES, ...CURRENT_AFFAIRS_ARTICLES];

export const SAVED_ARTICLE_MAP = new Map(ALL_SAVED_ARTICLES.map((article) => [article.id, article]));

export { makeSavedArticleId };
