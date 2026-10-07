import { site } from './site'

// Descriptions only use facts from PORTFOLIO_DESIGN.md.
// TODO: replace `github` with each project's real repository URL, add `demo` and `image` when available.
export const projects = [
  {
    id: 1,
    title: 'AI Story Adventure',
    subtitle: 'RAG-powered interactive storytelling platform',
    description:
      'An interactive storytelling platform where a retrieval-augmented pipeline grounds Gemini-generated narrative in a Qdrant vector store, served through a FastAPI backend.',
    image: null,
    tags: ['FastAPI', 'Gemini', 'Qdrant', 'RAG', 'React'],
    github: site.github,
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: 'Vietnamese Medical NLP',
    subtitle: 'Biomedical retrieval for Vietnamese text',
    description:
      'Information retrieval and medical entity processing for Vietnamese biomedical content — bringing NLP techniques to a low-resource, domain-specific language setting.',
    image: null,
    tags: ['Vietnamese NLP', 'Biomedical IR', 'Entity Processing', 'Retrieval'],
    github: site.github,
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Football Computer Vision',
    subtitle: 'Detection & multi-object tracking on match footage',
    description:
      'A computer vision pipeline that detects players with YOLO, tracks them across frames with ByteTrack and uses SigLIP visual embeddings for downstream analysis.',
    image: null,
    tags: ['YOLO', 'ByteTrack', 'SigLIP', 'Tracking'],
    github: site.github,
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: 'Financial & Tax AI Agent',
    subtitle: 'Agent architecture for Vietnamese tax compliance',
    description:
      'An AI agent that reasons over structured financial data and defers to a deterministic rule engine for Vietnamese tax compliance checks.',
    image: null,
    tags: ['AI Agent', 'Rule Engine', 'Structured Data', 'Tax Compliance'],
    github: site.github,
    demo: null,
    featured: true,
  },
]
