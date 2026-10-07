// Danh mục kỹ năng phân nhóm theo lĩnh vực thực tế — không dùng % ảo
export const skillCategories = [
  {
    category: 'AI / Machine Learning',
    skills: ['Python', 'PyTorch', 'Scikit-learn', 'NumPy', 'Pandas', 'YOLO', 'CNN', 'CLIP', 'SigLIP'],
  },
  {
    category: 'LLM / RAG & Agentic Systems',
    skills: ['LangChain', 'LangGraph', 'RAG Architecture', 'Qdrant', 'ChromaDB', 'FAISS', 'BM25', 'Gemini API', 'OpenAI API'],
  },
  {
    category: 'Backend & Hệ thống',
    skills: ['FastAPI', 'RESTful API', 'Firebase', 'SQL', 'PostgreSQL'],
  },
  {
    category: 'Frontend & Giao diện tương tác',
    skills: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Three.js / WebGL', 'HTML5 / CSS3'],
  },
  {
    category: 'Công cụ & Hạ tầng triển khai',
    skills: ['Git & GitHub', 'Docker', 'Coolify', 'Cloudflare', 'Linux / WSL', 'CI/CD Workflows'],
  },
]

export const allSkills = skillCategories.flatMap((g) => g.skills)
