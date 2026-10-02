import {
  mockStories,
  mockCategories,
  mockMagazineIssues,
  mockOrganizations,
  mockInterviews,
  mockTestimonials,
  mockFAQs
} from './data/mockData';

import type {
  Story,
  Category,
  MagazineIssue,
  Organization,
  Interview,
  Testimonial,
  FAQItem
} from './data/mockData';

import { supabase } from './lib/supabase';

export type {
  Story,
  Category,
  MagazineIssue,
  Organization,
  Interview,
  Testimonial,
  FAQItem
};

export interface SubmissionData {
  organization: string;
  contactPerson: string;
  email: string;
  storyTitle: string;
  category: string;
  summary: string;
  impactMetrics: string;
}

export interface ContactData {
  name: string;
  email: string;
  organization?: string;
  subject: string;
  message: string;
  type: 'general' | 'advertising' | 'partnership';
}

// ---------------------------------------------------------------------
// Row → site shape. The database uses snake_case columns; the pages were
// written against the camelCase sample data, so we translate here once.
// ---------------------------------------------------------------------

/** "2026-06-18" → "June 18, 2026", matching how dates were written in the sample data. */
const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** "Women Empowerment" → "women-empowerment" */
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const toStory = (r: any): Story => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  summary: r.summary,
  content: r.content,
  category: r.category,
  author: { name: r.author_name, role: r.author_role, avatar: r.author_avatar },
  featuredImage: r.featured_image,
  publishedDate: formatDate(r.published_date),
  readingTime: r.reading_time,
  isFeatured: r.is_featured,
  isEditorsPick: r.is_editors_pick,
});

const toCategory = (r: any): Category => ({
  id: r.id, name: r.name, slug: r.slug, description: r.description, iconName: r.icon_name,
});

const toIssue = (r: any): MagazineIssue => ({
  id: r.id,
  issueNumber: r.issue_number,
  title: r.title,
  month: r.month,
  year: r.year,
  coverImage: r.cover_image,
  editorsNote: r.editors_note,
  featuredArticles: r.featured_articles ?? [],
  pdfUrl: r.pdf_url ?? undefined,
  pagesBaseUrl: r.pages_base_url ?? undefined,
  pageCount: r.page_count ?? undefined,
  isTrending: r.is_trending,
  isMostRead: r.is_most_read,
});

const toInterview = (r: any): Interview => ({
  id: r.id,
  title: r.title,
  interviewee: r.interviewee,
  position: r.position,
  organization: r.organization,
  photo: r.photo,
  quote: r.quote,
  highlights: r.highlights ?? [],
  questions: r.questions ?? [],
});

/** Throw Supabase errors so React Query shows its error state instead of silently rendering nothing. */
function unwrap<T>({ data, error }: { data: T | null; error: { message: string } | null }): T {
  if (error) throw new Error(error.message);
  return data as T;
}

// Sample-data mode (no Supabase configured): simulate a little network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getStories: async (category?: string, search?: string): Promise<Story[]> => {
    const term = search?.trim().replace(/[,()%*\\]/g, ' ').trim();

    if (!supabase) {
      await delay(300);
      let result = [...mockStories];
      if (category && category !== 'all') {
        result = result.filter(s => slugify(s.category) === slugify(category));
      }
      if (term) {
        const q = term.toLowerCase();
        result = result.filter(s => s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q));
      }
      return result;
    }

    let query = supabase.from('stories').select('*').eq('status', 'published').order('published_date', { ascending: false });
    if (category && category !== 'all') {
      // The URL carries the category slug; stories store the category's display name
      const { data: cat } = await supabase.from('categories').select('name').eq('slug', category).maybeSingle();
      query = query.ilike('category', cat?.name ?? category);
    }
    if (term) {
      query = query.or(`title.ilike.%${term}%,summary.ilike.%${term}%`);
    }
    return unwrap(await query).map(toStory);
  },

  getStoryBySlug: async (slug: string): Promise<Story> => {
    if (!supabase) {
      await delay(200);
      const story = mockStories.find(s => s.slug === slug);
      if (!story) throw new Error('Story not found');
      return story;
    }
    const row = unwrap(await supabase.from('stories').select('*').eq('slug', slug).eq('status', 'published').maybeSingle());
    if (!row) throw new Error('Story not found');
    return toStory(row);
  },

  getCategories: async (): Promise<Category[]> => {
    if (!supabase) {
      await delay(100);
      return mockCategories;
    }
    return unwrap(await supabase.from('categories').select('*').order('sort_order')).map(toCategory);
  },

  getMagazineIssues: async (): Promise<MagazineIssue[]> => {
    if (!supabase) {
      await delay(300);
      return mockMagazineIssues;
    }
    return unwrap(
      await supabase.from('magazine_issues').select('*').eq('status', 'published').order('release_date', { ascending: false }),
    ).map(toIssue);
  },

  getMagazineIssue: async (id: string): Promise<MagazineIssue> => {
    if (!supabase) {
      await delay(150);
      const issue = mockMagazineIssues.find(m => m.id === id);
      if (!issue) throw new Error('Issue not found');
      return issue;
    }
    const row = unwrap(await supabase.from('magazine_issues').select('*').eq('id', id).eq('status', 'published').maybeSingle());
    if (!row) throw new Error('Issue not found');
    return toIssue(row);
  },

  getOrganizations: async (): Promise<Organization[]> => {
    await delay(200);
    return mockOrganizations;
  },

  getInterviews: async (): Promise<Interview[]> => {
    if (!supabase) {
      await delay(200);
      return mockInterviews;
    }
    return unwrap(
      await supabase.from('interviews').select('*').eq('status', 'published').order('created_at', { ascending: false }),
    ).map(toInterview);
  },

  getTestimonials: async (): Promise<Testimonial[]> => {
    if (!supabase) {
      await delay(100);
      return mockTestimonials;
    }
    return unwrap(await supabase.from('testimonials').select('id, quote, author, role, organization').order('sort_order'));
  },

  getFAQs: async (): Promise<FAQItem[]> => {
    if (!supabase) {
      await delay(100);
      return mockFAQs;
    }
    return unwrap(await supabase.from('faqs').select('id, question, answer').order('sort_order'));
  },

  submitStory: async (data: SubmissionData): Promise<{ success: true }> => {
    if (!supabase) {
      await delay(800);
      console.log("Mock Submit Story:", data);
      return { success: true };
    }
    unwrap(await supabase.from('submissions').insert({
      organization: data.organization,
      contact_person: data.contactPerson,
      email: data.email,
      story_title: data.storyTitle,
      category: data.category,
      summary: data.summary,
      impact_metrics: data.impactMetrics,
    }));
    return { success: true };
  },

  submitContact: async (data: ContactData): Promise<{ success: true }> => {
    if (!supabase) {
      await delay(800);
      console.log("Mock Submit Contact:", data);
      return { success: true };
    }
    unwrap(await supabase.from('contact_messages').insert({
      name: data.name,
      email: data.email,
      organization: data.organization || null,
      subject: data.subject,
      message: data.message,
    }));
    return { success: true };
  },
};
