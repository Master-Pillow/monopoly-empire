import stageData from './stages.json';
import endingData from './endings.json';
import sourceData from './sources.json';
import articleData from './articles.json';
import questionData from './questions.json';
import faqData from './faq.json';
import meta from './content-meta.json';
import type { Stage, Ending, Source, Article, Question, Faq } from '../domain/types';

export const stages = stageData as Stage[];
export const endings = endingData as Ending[];
export const sources = sourceData as Source[];
export const articles = articleData as Article[];
export const questions = questionData as Question[];
export const faqs = faqData as Faq[];
export { meta };
