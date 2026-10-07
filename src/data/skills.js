// Skill groups from PORTFOLIO_DESIGN.md §21. No percentages by design.
export const skillCategories = [
  {
    category: 'AI / Machine Learning',
    skills: ['Python', 'PyTorch', 'Scikit-learn', 'NumPy', 'Pandas', 'YOLO', 'CNN', 'CLIP', 'SigLIP'],
  },
  {
    category: 'LLM / RAG',
    skills: ['LangChain', 'LangGraph', 'RAG', 'Qdrant', 'ChromaDB', 'FAISS', 'BM25', 'Gemini API', 'OpenAI API'],
  },
  {
    category: 'Backend',
    skills: ['FastAPI', 'REST API', 'Firebase', 'SQL'],
  },
  {
    category: 'Frontend',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    category: 'Tools / Deployment',
    skills: ['Git', 'GitHub', 'Docker', 'Coolify', 'Cloudflare', 'WSL', 'Linux'],
  },
]

export const allSkills = skillCategories.flatMap((g) => g.skills)
