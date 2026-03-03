const cards = [
    { "title": "Generative AI & ML", "icon": "fa-robot", "items": ["LLMs", "Prompt Engineering", "RAG", "Vector DBs (FAISS)", "LangChain", "Fine-Tuning", "Streamlit", "Ollama", "Hugging Face"] },
    { "title": "Data Science", "icon": "fa-book-open", "items": ["Probability & Statistics", "Machine Learning", "Experimentation", "Causal Inference"] },
    { "title": "Data Analysis", "icon": "fa-chart-column", "items": ["Pipelines", "Excel", "SQL", "Python", "R"] },
    { "title": "Visualization", "icon": "fa-chart-pie", "items": ["Tableau", "Power BI", "Matplotlib", "Seaborn"] },
    { "title": "Product Development", "icon": "fa-folder-open", "items": ["Design", "Analytics", "Agile", "JIRA"] },
    { "title": "Industry Experience", "icon": "fa-briefcase", "items": ["Consulting", "Healthcare", "People Analytics"] },
    { "title": "Leadership", "icon": "fa-layer-group", "items": ["Stakeholder Comm", "Mentorship", "Collaboration"] },
    { "title": "Backend Engineering", "icon": "fa-server", "items": ["Flask", "FastAPI", "Node.js", "REST", "MongoDB", "Redis", "Spring Boot", "Java"] },
    { "title": "Frontend & UI", "icon": "fa-code", "items": ["React.js", "JS", "Tailwind", "Flutter"] }
];

(function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    grid.innerHTML = cards.map(card => `
        <div class="p-8 mcp-border bg-black group">
            <div class="text-brand/50 group-hover:text-brand mb-4 text-xl"><i class="fa-solid ${card.icon}"></i></div>
            <h3 class="text-xs font-bold uppercase tracking-widest mb-4">${card.title}</h3>
            <p class="text-[10px] text-slate-500 font-mono leading-relaxed">${card.items.join(' // ')}</p>
        </div>
    `).join('');
})();