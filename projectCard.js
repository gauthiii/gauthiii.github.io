/** * GAUTHAM_VIJAYARAJ // PROJECT_MODULE_LOADER
 * Full JSON Dataset Implementation
 */

const projects = [
  {
    "title": "Reddit Insights Report Generator (A2A + MCP Workflow)",
    "repo": "https://github.com/gauthiii/a2aProjects",
    "image": "p15.png",
    "description": "Dual-agent A2A system combining Reddit content analysis with automated Google Docs report generation via MCP servers.",
    "details": "Dual A2A Agents • MCP Reddit/Docs • LLM Reasoning • Async Flow",
    "tags": ["A2A", "MCP", "Reddit", "Automation", "Python"]
  },
  {
    "title": "Vacation Planner (A2A and MCP Orchestration)",
    "repo": "https://github.com/gauthiii/a2aProjects",
    "image": "p14.png",
    "description": "Complete travel planning orchestration using Flight and Airbnb A2A agents powered by LLM routing.",
    "details": "Google Flights MCP • Airbnb MCP • Multi-Agent Coordination",
    "tags": ["A2A", "MCP", "Travel", "LLM", "Orchestration"]
  },
  {
    "title": "Currency and Stocks Pair Analysis",
    "repo": "https://github.com/gauthiii/a2aProjects",
    "image": "p13.png",
    "description": "A Forex Analyst and Market Analyst agent duo collaborating via A2A to provide comprehensive financial insights.",
    "details": "Exchange Rate API • Yahoo Finance API • Multi-Agent Orchestration",
    "tags": ["A2A", "MCP", "Finance", "Python", "API"]
  },
  {
    "title": "Autonomous Amazon Product Analysis System",
    "repo": "https://github.com/gauthiii/mcpServer",
    "image": "p12.png",
    "description": "Four coordinated agents (Planner, Retriever, Analyzer, Finalizer) simulating an intelligent decision-making workflow.",
    "details": "MCP Server • Web Scraping • Agent Orchestration • Product Comparison",
    "tags": ["MCP", "Agents", "Scraping", "Claude", "Ollama"]
  },
  {
    "title": "Multi-Server MCP Orchestration",
    "repo": "https://github.com/gauthiii/mcpServer",
    "image": "p11.png",
    "description": "Unified client integrating Playwright, Airbnb, DuckDuckGo, OpenWeather, and Gmail MCP servers.",
    "details": "External Integrations • Gmail MCP • Tool Orchestration • Automation",
    "tags": ["MCP", "LangChain", "Playwright", "OpenWeather", "Gmail"]
  },
  {
    "title": "Agentic Research Workflow (Reflective AI)",
    "repo": "https://github.com/gauthiii/agenticAIProjects",
    "image": "p10.png",
    "description": "Framework where autonomous agents conduct research, reflect on outputs, and iteratively refine results.",
    "details": "Multi-Agent System • Reflection Loop • OpenAI & Claude Integration",
    "tags": ["Agentic AI", "Reflection", "Arxiv API", "Tavily", "LLM"]
  },
  {
    "title": "Document Intelligence with AWS Bedrock",
    "repo": "https://github.com/gauthiii/screenplaySearch",
    "image": "p8.png",
    "description": "RAG-based application enabling interactive Q&A over PDF movie screenplays using Titan Embeddings.",
    "details": "AWS Bedrock • FAISS Indexing • RetrievalQA • Streamlit UI",
    "tags": ["AWS Bedrock", "LangChain", "FAISS", "Llama 3"]
  },
  {
    "title": "Serverless Blog Generator (AWS Bedrock)",
    "repo": "https://github.com/gauthiii/blogGeneratorAWS",
    "image": "p9.png",
    "description": "Serverless application using Lambda and API Gateway to generate blogs stored in Amazon S3.",
    "details": "AWS Lambda • API Gateway • S3 Storage • Llama3-70B",
    "tags": ["AWS Lambda", "Bedrock", "S3", "Serverless"]
  },
  {
    "title": "Content Summarization Tool (LangChain + Gemma)",
    "repo": "https://github.com/gauthiii/websiteYTSummarizer",
    "demo": "https://websiteytsummarizer-3bq4w47p9bqmhn6bunhkvw.streamlit.app/",
    "image": "p7.png",
    "description": "Summarizes YouTube videos and websites into concise reports using Groq’s Gemma LLM.",
    "details": "Streamlit App • YouTube Transcript API • Summarization Chains",
    "tags": ["LangChain", "Groq", "Gemma", "Streamlit", "Python"]
  },
  {
    "title": "Customer Purchase Prediction (ANN)",
    "repo": "https://github.com/gauthiii/ANN-Customer-Purchase-Prediction",
    "demo": "https://ann-customer-purchase-prediction-lsgqda2wvirgoqfylpra83.streamlit.app/",
    "image": "p1.png",
    "description": "Deployed Artificial Neural Network predicting purchase likelihood based on behavioral features.",
    "details": "500k+ Records • 92.5% Accuracy • TensorFlow Pipeline",
    "tags": ["TensorFlow", "Keras", "Deep Learning", "ANN"]
  },
  {
    "title": "Multi-Agent Startup Copilot",
    "repo": "https://github.com/gauthiii/findMyStartup",
    "image": "p2.png",
    "description": "AI system converting startup ideas into structured MVPs with risk analysis and GTM plans.",
    "details": "Azure OpenAI • Google Gemini • Idea Parsing • JSON Structuring",
    "tags": ["Node.js", "Azure", "Gemini", "Product Strategy"]
  },
  {
    "title": "Automated Image Captioning (BLIP)",
    "repo": "https://github.com/gauthiii/fineTunedBLIP",
    "image": "p3.png",
    "description": "Fine-tuned BLIP model on custom datasets using a PyTorch pipeline with teacher forcing.",
    "details": "50+ Annotated Images • AdamW Optimizer • Hugging Face",
    "tags": ["PyTorch", "Hugging Face", "BLIP", "Computer Vision"]
  },
  {
    "title": "F1 Safety Evolution Visualization",
    "repo": "https://github.com/gauthiii/f1-safety-visualization",
    "image": "p4.png",
    "description": "Interactive D3.js platform showcasing Formula 1 safety evolution and accident trends from 1950-2020.",
    "details": "D3.js • React • Data Preprocessing • Responsive Analytics",
    "tags": ["React", "D3.js", "Data Viz", "F1", "Python"]
  },
  {
    "title": "Twitter Sentiment Analysis Pipeline",
    "repo": "https://github.com/gauthiii/smlTwitSenti",
    "video": "https://youtu.be/xfFOYLqIwmY?si=ZhcoXXR1Hqxsy2EB",
    "image": "p5.png",
    "description": "End-to-end ML pipeline classifying sentiment on 400k+ tweets comparing SVM and BiLSTM models.",
    "details": "400k+ Tweets • 98% Accuracy • NLP Deployment",
    "tags": ["Scikit-learn", "NLP", "SVM", "Deep Learning"]
  },
  {
    "title": "Music Recommendation System",
    "repo": "https://github.com/gauthiii/spotifyExtractor",
    "image": "p6.png",
    "description": "Recommendation engine using 100k+ Spotify tracks and Random Forest models to predict playlist audio features.",
    "details": "Spotify API • 82% Accuracy • Random Forest • Feature Extraction",
    "tags": ["Spotify API", "Flutter", "Kaggle", "Machine Learning"]
  }
];

(function renderProjects() {
    const container = document.getElementById("projects");
    if (!container) return;

    container.innerHTML = projects.map((p, index) => `
        <article class="group relative overflow-hidden bg-black mcp-border reveal" style="transition-delay: ${index * 50}ms">
            <div class="aspect-video w-full overflow-hidden opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-700">
                <img src="${p.image}" alt="${p.title}" class="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
            </div>

            <div class="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent">
                <div class="flex flex-wrap gap-2 mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    ${p.tags.map(tag => `
                        <span class="text-[9px] font-bold uppercase tracking-widest border border-brand/30 px-2 py-0.5 rounded-sm bg-brand/5 text-brand">
                            ${tag}
                        </span>
                    `).join('')}
                </div>

                <h3 class="text-lg font-bold uppercase tracking-tighter leading-none mb-2 group-hover:text-brand transition-colors">
                    ${p.title}
                </h3>
                
                <div class="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500">
                    <p class="text-[10px] text-slate-400 font-mono mb-3 leading-relaxed">
                        > ${p.description}
                    </p>
                    <p class="text-[9px] text-brand/60 font-mono mb-4 italic">
                        SYSTEM_SPECS: ${p.details}
                    </p>
                    
                    <div class="flex items-center gap-4">
                        <a href="${p.repo}" target="_blank" class="text-white hover:text-brand transition-colors">
                            <i class="fa-brands fa-github text-lg"></i>
                        </a>
                        ${p.demo ? `
                            <a href="${p.demo}" target="_blank" class="text-white hover:text-brand transition-colors">
                                <i class="fa-solid fa-link text-sm"></i>
                            </a>
                        ` : ''}
                        ${p.video ? `
                            <a href="${p.video}" target="_blank" class="text-white hover:text-brand transition-colors">
                                <i class="fa-brands fa-youtube text-lg"></i>
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            <div class="absolute top-4 right-4 text-[8px] font-mono opacity-20 group-hover:opacity-100 text-brand transition-opacity">
                MOD_ID: 0x${(index + 10).toString(16).toUpperCase()}
            </div>
        </article>
    `).join('');
})();