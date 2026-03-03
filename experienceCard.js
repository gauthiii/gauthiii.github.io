const experiences = [
    { company: "Reveille Technologies", role: "AI Engineer", dates: "Jul 2025 – Present", desc: "Building LLM solutions with LangChain; reduced manual effort by 40%." },
    { company: "HCLTech", role: "Software Intern", dates: "May – Aug 2024", desc: "Built medical GenAI assistant and RAG pipelines for case files." },
    { company: "Arizona State University", role: "AI Lead (GSA)", dates: "Sep – Dec 2023", desc: "Fine-tuned LLMs with Dr. Yau for research prototypes." },
    { company: "Tata Consultancy Services", role: "Assistant System Engineer", dates: "2021 – 2022", desc: "Built financial analytics dashboards and fraud scoring APIs." }
];

(function renderExperience() {
    const grid = document.getElementById("experienceGrid");
    grid.innerHTML = experiences.map(exp => `
        <div class="p-6 mcp-border flex flex-col md:flex-row justify-between items-start md:items-center bg-black/50 group hover:bg-brand/5">
            <div>
                <h3 class="text-sm font-bold uppercase">${exp.role} <span class="text-brand/50">@ ${exp.company}</span></h3>
                <p class="text-[10px] text-slate-400 mt-1">${exp.desc}</p>
            </div>
            <div class="text-[10px] font-bold opacity-30 mt-4 md:mt-0">${exp.dates}</div>
        </div>
    `).join('');
})();