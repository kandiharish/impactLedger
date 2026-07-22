import { 
  mockStories as stories, 
  mockCategories as categories, 
  mockMagazineIssues as magazineIssues, 
  mockOrganizations as organizations, 
  mockInterviews as interviews, 
  mockTestimonials as testimonials, 
  mockFAQs as faqs 
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
  subject: string;
  message: string;
  type: 'general' | 'advertising' | 'partnership';
}

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getStories: async (category?: string, search?: string): Promise<Story[]> => {
    await delay(300);
    let result = [...stories];
    if (category && category !== 'all') {
      result = result.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s => s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q));
    }
    return result;
  },

  getStoryBySlug: async (slug: string): Promise<Story> => {
    await delay(200);
    const story = stories.find(s => s.slug === slug);
    if (!story) throw new Error('Story not found');
    return story;
  },

  getCategories: async (): Promise<Category[]> => {
    await delay(100);
    return categories;
  },

  getMagazineIssues: async (): Promise<MagazineIssue[]> => {
    await delay(300);
    return magazineIssues;
  },

  getOrganizations: async (): Promise<Organization[]> => {
    await delay(200);
    return organizations;
  },

  getInterviews: async (): Promise<Interview[]> => {
    await delay(200);
    return interviews;
  },

  getTestimonials: async (): Promise<Testimonial[]> => {
    await delay(100);
    return testimonials;
  },

  getFAQs: async (): Promise<FAQItem[]> => {
    await delay(100);
    return faqs;
  },

  submitStory: async (data: SubmissionData): Promise<any> => {
    await delay(800);
    console.log("Mock Submit Story:", data);
    return { success: true, message: "Story submitted successfully" };
  },

  submitContact: async (data: ContactData): Promise<any> => {
    await delay(800);
    console.log("Mock Submit Contact:", data);
    return { success: true, message: "Message sent successfully" };
  },
};
