import { Router, Request, Response, NextFunction } from 'express';
import { 
  Category, 
  Organization, 
  Story, 
  MagazineIssue, 
  Interview, 
  Testimonial, 
  FAQ, 
  Submission, 
  Contact 
} from './models';

const router = Router();

// Wrap async routes to catch errors
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// 1. Stories
router.get('/stories', asyncHandler(async (req: Request, res: Response) => {
  const { category, search } = req.query;
  let query: any = {};

  if (category && category !== 'all') {
    query.category = new RegExp(`^${category}$`, 'i');
  }

  if (search) {
    const searchRegex = new RegExp(search as string, 'i');
    query.$or = [
      { title: searchRegex },
      { summary: searchRegex },
      { content: searchRegex }
    ];
  }

  const stories = await Story.find(query).sort({ createdAt: -1 });
  res.status(200).json(stories);
}));

router.get('/stories/:slug', asyncHandler(async (req: Request, res: Response) => {
  const story = await Story.findOne({ slug: req.params.slug });
  if (!story) {
    return res.status(404).json({ error: 'Story not found' });
  }
  res.status(200).json(story);
}));

// 2. Categories
router.get('/categories', asyncHandler(async (req: Request, res: Response) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
}));

// 3. Magazine Issues
router.get('/magazine-issues', asyncHandler(async (req: Request, res: Response) => {
  const issues = await MagazineIssue.find({}).sort({ year: -1, month: -1 });
  res.status(200).json(issues);
}));

// 4. Organizations
router.get('/organizations', asyncHandler(async (req: Request, res: Response) => {
  const orgs = await Organization.find({});
  res.status(200).json(orgs);
}));

// 5. Spotlight Interviews
router.get('/interviews', asyncHandler(async (req: Request, res: Response) => {
  const interviews = await Interview.find({}).sort({ createdAt: -1 });
  res.status(200).json(interviews);
}));

// 6. Testimonials
router.get('/testimonials', asyncHandler(async (req: Request, res: Response) => {
  const testimonials = await Testimonial.find({});
  res.status(200).json(testimonials);
}));

// 7. FAQs
router.get('/faqs', asyncHandler(async (req: Request, res: Response) => {
  const faqs = await FAQ.find({});
  res.status(200).json(faqs);
}));

// 8. Story Submissions (Draft logger)
router.post('/submissions', asyncHandler(async (req: Request, res: Response) => {
  const { organization, contactPerson, email, storyTitle, category, summary, impactMetrics } = req.body;

  if (!organization || !contactPerson || !email || !storyTitle || !category || !summary || !impactMetrics) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newSubmission = new Submission({
    organization,
    contactPerson,
    email,
    storyTitle,
    category,
    summary,
    impactMetrics,
    status: 'pending'
  });

  await newSubmission.save();
  res.status(201).json({ message: 'Submission logged successfully', submission: newSubmission });
}));

// 9. Contact / Advertise requests
router.post('/contact', asyncHandler(async (req: Request, res: Response) => {
  const { name, email, subject, message, type } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newContact = new Contact({
    name,
    email,
    subject,
    message,
    type: type || 'general'
  });

  await newContact.save();
  res.status(201).json({ message: 'Inquiry received successfully', inquiry: newContact });
}));

export default router;
