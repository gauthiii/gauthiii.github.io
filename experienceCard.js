/* experienceCards.js */

/** Data: edit freely */
const experiences = [
    {
      company: "Reveille Technologies, Inc.",
      role: "AI Engineer",
      dates: "Jul 2025 – Present",
      image: "experience/reveille.png",
      alt: "Reveille Technologies",
      bullets: [
        "Built end-to-end AI solutions with LLMs & LangChain; improved delivery speed by ~30%.",
        "Developed multi-agent workflows & custom tools; reduced manual effort by ~40%.",
        "Partnered with VP to design an internal AI platform for rapid prototyping & adoption.",
        "Integrated generative pipelines for higher accuracy and operational efficiency."
      ]
    },
    {
      company: "HCLTech",
      role: "Software Developer Intern",
      dates: "May 2024 – Aug 2024",
      image: "experience/hcl.jpg",
      alt: "HCLTech",
      bullets: [
        "Built user workflows for a medical GenAI assistant (history, risk, diagnosis insights).",
        "Created microservices with React + Spring Boot + MongoDB; NLP-based interfaces.",
        "Engineered a RAG pipeline to summarize complex patient case files.",
        "Fine-tuned LLM solutions to boost domain-specific accuracy & reliability."
      ]
    },
    {
      company: "Arizona State University",
      role: "AI Engineering Lead (GSA)",
      dates: "Sep 2023 – Dec 2023",
      image: "experience/asu.png",
      alt: "Arizona State University",
      bullets: [
        "Worked with Dr. Stephen S. Yau on fine-tuning LLMs for specialized applications.",
        "Built AI pipelines across OpenAI, Hugging Face, and Gemini for better reasoning & context.",
        "Contributed model inference endpoints for a research prototype; did literature reviews."
      ]
    },
    {
      company: "Tata Consultancy Services",
      role: "Assistant System Engineer",
      dates: "Jun 2021 – Nov 2022",
      image: "experience/tcs.jpg",
      alt: "Tata Consultancy Services",
      bullets: [
        "Built financial analytics dashboards (React, TypeScript, Spring Boot, SQL).",
        "Shipped ML/NLP modules for anomaly detection, fraud scoring, and forecasting with Azure AI.",
        "Exposed ML predictions via APIs into interactive dashboards; optimized data pipelines."
      ]
    }
  ];
  
  /** Render */
  (function renderExperienceCards() {
    const grid = document.getElementById("experienceGrid");
    if (!grid) return;
  
    const cardHTML = (exp) => `
      <details class="group rounded-2xl border border-ink-200 bg-white shadow-soft open:shadow-elev dark:border-white/10 dark:bg-ink-800/70">
        <summary class="list-none cursor-pointer">
          <div class="aspect-video w-full overflow-hidden rounded-t-2xl">
            <img src="${exp.image}" alt="${exp.alt}" class="h-full w-full object-cover" />
          </div>
          <div class="p-5">
            <p class="font-medium">${exp.role} — ${exp.company}</p>
            <p class="text-sm text-ink-500 dark:text-ink-300">${exp.dates}</p>
            <button type="button" data-exp-toggle
              class="mt-4 inline-flex items-center gap-2 rounded-xl border border-ink-200 px-3 py-1.5 text-sm hover:bg-ink-100/70 dark:border-white/10 dark:hover:bg-white/10"
              aria-expanded="false" aria-controls="">
              <span class="exp-label-closed group-open:hidden">View details</span>
              <span class="exp-label-open hidden group-open:inline">Hide details</span>
              <svg class="h-4 w-4 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </summary>
        <div class="px-5 pb-5">
          <ul class="mt-2 list-disc space-y-2 pl-6 text-sm text-ink-700 dark:text-ink-200/90">
            ${exp.bullets.map(b => `<li>${b}</li>`).join("")}
          </ul>
        </div>
      </details>
    `;
  
    grid.innerHTML = experiences.map(cardHTML).join("");
  
    // Wire up the toggle buttons so only the button controls <details>
    grid.querySelectorAll('details [data-exp-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // prevent <summary> default toggle
        const details = btn.closest('details');
        details.open = !details.open;
        btn.setAttribute('aria-expanded', String(details.open));
      });
    });
  })();
  