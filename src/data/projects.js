import { site } from './site'

// Mô tả dự án dựa trên thông tin kỹ thuật trong PORTFOLIO_DESIGN.md.
// Giữ nguyên các thuật ngữ công nghệ quốc tế.
export const projects = [
  {
    id: 1,
    title: 'AI Story Adventure',
    subtitle: 'Nền tảng tương tác cốt truyện thông minh ứng dụng RAG',
    description:
      'Nền tảng phân nhánh cốt truyện tương tác kết hợp mô hình sinh nội dung Gemini và cơ sở dữ liệu vector Qdrant để duy trì tính nhất quán của bối cảnh (lore), vận hành trên backend FastAPI.',
    image: null,
    tags: ['FastAPI', 'Gemini', 'Qdrant', 'RAG', 'React'],
    github: site.github,
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: 'Vietnamese Medical NLP',
    subtitle: 'Truy xuất thông tin y sinh học cho ngôn ngữ tiếng Việt',
    description:
      'Hệ thống truy xuất ngữ nghĩa và xử lý thực thể y tế chuyên biệt cho từ vựng lâm sàng tiếng Việt — kết hợp tìm kiếm kết hợp dense-sparse và trích xuất thực thể y sinh.',
    image: null,
    tags: ['Vietnamese NLP', 'Biomedical IR', 'Entity Processing', 'Retrieval'],
    github: site.github,
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Football Computer Vision',
    subtitle: 'Nhận diện & theo dõi đa đối tượng trên video trận đấu',
    description:
      'Pipeline thị giác máy tính tích hợp phát hiện cầu thủ với YOLO, gán không gian liên khung hình với ByteTrack và trích xuất đặc trưng hình ảnh với SigLIP cho phân tích chiến thuật.',
    image: null,
    tags: ['YOLO', 'ByteTrack', 'SigLIP', 'Tracking', 'OpenCV'],
    github: site.github,
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: 'Financial & Tax AI Agent',
    subtitle: 'Kiến trúc AI Agent hỗ trợ tuân thủ và tư vấn thuế',
    description:
      'Trợ lý Agent doanh nghiệp kết hợp suy luận trên dữ liệu tài chính có cấu trúc và engine luật xác định (rule engine) nhằm đảm bảo tính chuẩn xác theo quy định thuế Việt Nam.',
    image: null,
    tags: ['AI Agent', 'Rule Engine', 'Structured Data', 'Tax Compliance', 'FastAPI'],
    github: site.github,
    demo: null,
    featured: true,
  },
]
