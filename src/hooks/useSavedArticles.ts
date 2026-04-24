'use client';

import { useEffect, useMemo, useState } from 'react';
import { ALL_SAVED_ARTICLES, SAVED_ARTICLE_MAP, type SavedArticleMeta } from '@/lib/savedArticles';

type SavedArticleRecord = {
  id: string;
  savedAt: string;
};

const STORAGE_KEY = 'ny_saved_articles';

function readSavedRecords(): SavedArticleRecord[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as SavedArticleRecord[]) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item) => typeof item?.id === 'string' && typeof item?.savedAt === 'string')
      : [];
  } catch {
    return [];
  }
}

function writeSavedRecords(records: SavedArticleRecord[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function useSavedArticles() {
  const [savedRecords, setSavedRecords] = useState<SavedArticleRecord[]>([]);

  useEffect(() => {
    setSavedRecords(readSavedRecords());

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setSavedRecords(readSavedRecords());
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const savedArticles = useMemo(() => {
    return savedRecords
      .map((record) => {
        const article = SAVED_ARTICLE_MAP.get(record.id);
        return article ? { ...article, savedAt: record.savedAt } : null;
      })
      .filter((article): article is SavedArticleMeta & { savedAt: string } => Boolean(article))
      .sort((left, right) => new Date(right.savedAt).getTime() - new Date(left.savedAt).getTime());
  }, [savedRecords]);

  const savedIds = useMemo(() => new Set(savedRecords.map((record) => record.id)), [savedRecords]);

  const toggleSavedArticle = (article: SavedArticleMeta) => {
    setSavedRecords((current) => {
      const exists = current.some((item) => item.id === article.id);
      const updated = exists
        ? current.filter((item) => item.id !== article.id)
        : [{ id: article.id, savedAt: new Date().toISOString() }, ...current];

      writeSavedRecords(updated);
      return updated;
    });
  };

  const clearSavedArticles = () => {
    writeSavedRecords([]);
    setSavedRecords([]);
  };

  return {
    allArticles: ALL_SAVED_ARTICLES,
    savedArticles,
    savedCount: savedArticles.length,
    isSaved: (id: string) => savedIds.has(id),
    toggleSavedArticle,
    clearSavedArticles,
  };
}
