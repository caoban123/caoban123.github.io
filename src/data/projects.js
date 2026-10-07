import { site } from './site'

// Danh sách các danh mục phân loại dự án
export const projectCategories = ['Tất cả', 'RAG & LLM', 'Computer Vision', 'AI Agents']

// Mô tả dự án dựa trên thông tin kỹ thuật thực tế từ các repositories
export const projects = [
  {
    id: 1,
    title: 'HCMUS Smart Campus',
    subtitle: 'Hệ thống Multi-Agent AI cho đại học thông minh (Wesome AI)',
    category: 'AI Agents',
    description:
      'Nguyên mẫu không gian AI Agent thông minh phát triển cho 2026 Global AI Agent Competition (Track A). Kiến trúc phân cấp gồm Campus Router/Aggregator điều phối hơn 14 Agent chuyên biệt qua 5 phân hệ dịch vụ học đường.',
    image: '/images/projects/hcmus-campus.webp',
    tags: ['Multi-Agent System', 'Wesome AI', 'Agent Orchestration', 'Smart Campus', 'Global AI Contest'],
    github: 'https://github.com/caoban123/HCMUS-Smart-Campus',
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: 'Multi-modal AIC Video Retrieval',
    subtitle: 'Hệ thống truy xuất video đa phương thức cho cuộc thi AI Challenge (AIC)',
    category: 'Computer Vision',
    description:
      'Hệ thống truy xuất video quy mô lớn cho cuộc thi AIC. Kết hợp tìm kiếm thị giác CLIP, ngữ nghĩa văn bản BGE-M3 / FAISS, từ vựng BM25, intent-aware routing (RRF) và Gemini VLM phục vụ các bài toán KIS, Q&A và TRAKE temporal alignment.',
    image: '/images/projects/multi-modal-aic.webp',
    tags: ['CLIP', 'BGE-M3', 'FAISS', 'BM25', 'Gemini VLM', 'Video Retrieval'],
    github: 'https://github.com/caoban123/Multi-model-for-contest',
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: 'AI Story Adventure',
    subtitle: 'Nền tảng tương tác cốt truyện thông minh ứng dụng RAG',
    category: 'RAG & LLM',
    description:
      'Nền tảng phân nhánh cốt truyện tương tác kết hợp mô hình sinh nội dung Gemini và cơ sở dữ liệu vector Qdrant để duy trì tính nhất quán của bối cảnh (lore), vận hành trên backend FastAPI.',
    image: '/images/projects/ai-adventure.webp',
    tags: ['FastAPI', 'Gemini', 'Qdrant', 'RAG', 'React'],
    github: site.github,
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: 'Vietnamese Medical NLP',
    subtitle: 'Truy xuất thông tin y sinh học cho ngôn ngữ tiếng Việt',
    category: 'RAG & LLM',
    description:
      'Hệ thống truy xuất ngữ nghĩa và xử lý thực thể y tế chuyên biệt cho từ vựng lâm sàng tiếng Việt — kết hợp tìm kiếm kết hợp dense-sparse và trích xuất thực thể y sinh.',
    image: '/images/projects/medical-nlp.webp',
    tags: ['Vietnamese NLP', 'Biomedical IR', 'Entity Processing', 'Retrieval'],
    github: site.github,
    demo: null,
    featured: true,
  },
  {
    id: 5,
    title: 'Football Computer Vision',
    subtitle: 'Nhận diện & theo dõi đa đối tượng trên video trận đấu',
    category: 'Computer Vision',
    description:
      'Pipeline thị giác máy tính tích hợp phát hiện cầu thủ với YOLO, gán không gian liên khung hình với ByteTrack và trích xuất đặc trưng hình ảnh với SigLIP cho phân tích chiến thuật.',
    image: '/images/projects/football-cv.webp',
    tags: ['YOLO', 'ByteTrack', 'SigLIP', 'Tracking', 'OpenCV'],
    github: site.github,
    demo: null,
    featured: true,
  },
  {
    id: 6,
    title: 'Financial & Tax AI Agent',
    subtitle: 'Kiến trúc AI Agent hỗ trợ tuân thủ và tư vấn thuế',
    category: 'AI Agents',
    description:
      'Trợ lý Agent doanh nghiệp kết hợp suy luận trên dữ liệu tài chính có cấu trúc và engine luật xác định (rule engine) nhằm đảm bảo tính chuẩn xác theo quy định thuế Việt Nam.',
    image: null,
    tags: ['AI Agent', 'Rule Engine', 'Structured Data', 'Tax Compliance', 'FastAPI'],
    github: site.github,
    demo: null,
    featured: true,
  },
]
