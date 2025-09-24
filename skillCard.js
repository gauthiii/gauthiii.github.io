cards = [
    {
      "title": "Data Science",
      "icon": "fa-solid fa-book-open",
      "items": [
        "Probability & Statistics",
        "Machine Learning",
        "Experimentation & Causal Inference"
      ]
    },
    {
      "title": "Data Analysis & Modeling",
      "icon": "fa-solid fa-chart-column",
      "items": ["Data Pipelines", "Advanced Excel", "SQL", "Python", "R"]
    },
    {
      "title": "Data Visualization & Storytelling",
      "icon": "fa-solid fa-chart-pie",
      "items": ["Tableau", "Power BI", "Python Visualization (Matplotlib, Seaborn)"]
    },
    {
      "title": "Product Development & Management",
      "icon": "fa-solid fa-folder-open",
      "items": ["Product Design", "Product Analytics", "Agile & Waterfall", "JIRA"]
    },
    {
      "title": "Industry Experience",
      "icon": "fa-solid fa-briefcase",
      "items": ["Management Consulting", "Product Development", "Healthcare Analytics", "People Analytics"]
    },
    {
      "title": "Collaboration & Leadership",
      "icon": "fa-solid fa-layer-group",
      "items": ["Stakeholder Communication", "Team Mentorship", "Cross-Functional Collaboration"]
    },
    {
      "title": "Generative AI & ML",
      "icon": "fa-solid fa-robot",
      "items": [
        "LLMs",
        "Prompt Engineering",
        "RAG",
        "Vector DBs (FAISS)",
        "LangChain",
        "Fine-Tuning & LoRA",
        "Streamlit",
        "Ollama Open-Source Models",
        "Hugging Face Transformers"
      ]
      /* , "classes": "md:col-span-2 lg:col-span-1"  // optional: control spans */
    },
    {
      "title": "Backend Engineering & APIs",
      "icon": "fa-solid fa-server",
      "items": ["Flask", "FastAPI", "Node.js", "REST APIs", "MongoDB", "Redis", "Spring Boot", "Java"]
    },
    {
      "title": "Frontend Engineering & UI",
      "icon": "fa-solid fa-code",
      "items": ["React.js", "JavaScript", "HTML/CSS", "Tailwind", "Flutter"]
    }
  ]


    const grid = document.getElementById('skillsGrid');
 


    const makeItems = (arr) => arr.map(s => s.replace(/&/g, '&amp;')).join(' | ');
    const html = cards.map(card => `
      <article class="rounded-2xl border border-ink-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-ink-800/70 ${card.classes || ''}">
        <div class="mb-3 text-ink-500 dark:text-ink-300">
          <i class="${card.icon} text-2xl"></i>
        </div>
        <h3 class="text-lg font-semibold">${card.title}</h3>
        <p class="mt-2 text-sm text-ink-600 dark:text-ink-200">${makeItems(card.items || [])}</p>
      </article>
    `).join('');

    grid.innerHTML = html;