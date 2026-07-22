import { Schema, model, Document } from 'mongoose';

// Category
export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  iconName: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  iconName: { type: String, required: true },
}, { timestamps: true });

// Organization
export interface IOrganization extends Document {
  name: string;
  logo: string;
  category: string;
  location: string;
  impactSummary: string;
  description: string;
}

const OrganizationSchema = new Schema<IOrganization>({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  impactSummary: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

// Story
export interface IStory extends Document {
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredImage: string;
  publishedDate: string;
  readingTime: string;
  isFeatured: boolean;
  isEditorsPick: boolean;
  organizationId?: string;
}

const StorySchema = new Schema<IStory>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    role: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  featuredImage: { type: String, required: true },
  publishedDate: { type: String, required: true },
  readingTime: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  isEditorsPick: { type: Boolean, default: false },
  organizationId: { type: String },
}, { timestamps: true });

// Magazine Issue
export interface IMagazineIssue extends Document {
  issueNumber: string;
  title: string;
  month: string;
  year: string;
  coverImage: string;
  editorsNote: string;
  featuredArticles: string[];
}

const MagazineIssueSchema = new Schema<IMagazineIssue>({
  issueNumber: { type: String, required: true },
  title: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: String, required: true },
  coverImage: { type: String, required: true },
  editorsNote: { type: String, required: true },
  featuredArticles: [{ type: String }],
}, { timestamps: true });

// Interview
export interface IInterview extends Document {
  title: string;
  interviewee: string;
  position: string;
  organization: string;
  photo: string;
  quote: string;
  highlights: string[];
  questions: { q: string; a: string }[];
}

const InterviewSchema = new Schema<IInterview>({
  title: { type: String, required: true },
  interviewee: { type: String, required: true },
  position: { type: String, required: true },
  organization: { type: String, required: true },
  photo: { type: String, required: true },
  quote: { type: String, required: true },
  highlights: [{ type: String }],
  questions: [{
    q: { type: String, required: true },
    a: { type: String, required: true }
  }]
}, { timestamps: true });

// Testimonial
export interface ITestimonial extends Document {
  quote: string;
  author: string;
  role: string;
  organization: string;
}

const TestimonialSchema = new Schema<ITestimonial>({
  quote: { type: String, required: true },
  author: { type: String, required: true },
  role: { type: String, required: true },
  organization: { type: String, required: true },
}, { timestamps: true });

// FAQ Item
export interface IFAQItem extends Document {
  question: string;
  answer: string;
}

const FAQSchema = new Schema<IFAQItem>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { timestamps: true });

// Story Submission
export interface ISubmission extends Document {
  organization: string;
  contactPerson: string;
  email: string;
  storyTitle: string;
  category: string;
  summary: string;
  impactMetrics: string;
  status: 'pending' | 'approved' | 'rejected';
}

const SubmissionSchema = new Schema<ISubmission>({
  organization: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  storyTitle: { type: String, required: true },
  category: { type: String, required: true },
  summary: { type: String, required: true },
  impactMetrics: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

// Contact Inquiries
export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'general' | 'advertising' | 'partnership';
}

const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['general', 'advertising', 'partnership'], default: 'general' }
}, { timestamps: true });

// Exports
export const Category = model<ICategory>('Category', CategorySchema);
export const Organization = model<IOrganization>('Organization', OrganizationSchema);
export const Story = model<IStory>('Story', StorySchema);
export const MagazineIssue = model<IMagazineIssue>('MagazineIssue', MagazineIssueSchema);
export const Interview = model<IInterview>('Interview', InterviewSchema);
export const Testimonial = model<ITestimonial>('Testimonial', TestimonialSchema);
export const FAQ = model<IFAQItem>('FAQ', FAQSchema);
export const Submission = model<ISubmission>('Submission', SubmissionSchema);
export const Contact = model<IContact>('Contact', ContactSchema);
