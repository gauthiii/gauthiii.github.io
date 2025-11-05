projects = [

  {
    "title": "Currency and Stocks Pair Analysis with A2A and MCP Orchestration",
    "repo": "https://github.com/gauthiii/a2aProjects",
    "image": "p13.png",
    "alt": "Diagram illustrating the connection between Forex Analyst Agent and Market Analyst Agent via A2A, and their respective connections to Currency and Stock MCP Servers.",
    "description": "Demonstrates Agent-to-Agent (A2A) communication and Model Context Protocol (MCP) server integration for a complex financial analysis task. A Forex Analyst Agent connects to a Currency MCP Server (Exchange Rate API) while a Market Analyst Agent connects to a Stock MCP Server (Yahoo Finance API). The system uses an orchestrator to coordinate both agents, enabling comprehensive analysis of currency and stock pairs (A2A + MCP Demo).",
    "details": "A2A Communication • MCP Servers • Forex Analysis • Stock Market Data • Exchange Rate API • Yahoo Finance API • Multi-Agent Orchestration",
    "tags": ["A2A", "MCP", "Agents", "Finance", "Groq", "OpenAI", "Python", "Yahoo Finance", "API Integration"]
  },

  {
    "title": "Autonomous Amazon Product Search and Analysis Agent System",
    "repo": "https://github.com/gauthiii/mcpServer",
    "image": "p12.png",
    "alt": "Diagram showing the workflow of the Planner, Retriever, Analyzer, and Finalizer agents with the MCP server and Amazon API.",
    "description": "Automated Amazon product search and analysis system leveraging an MCP server connected to the Amazon search request and web scrapers. The system processes user queries, retrieves search results, compares alternatives, and generates detailed product analysis reports using four coordinated, specialized agents: Planner, Retriever, Analyzer, and Finalizer to simulate a complete, intelligent decision-making workflow.",
    "details": "MCP Server • Amazon Search URL • Web Scraping • Agent Orchestration • Product Comparison • Multi-Model Integration",
    "tags": ["MCP", "Agents", "Groq", "OpenAI", "Claude", "Ollama", "Python", "Amazon MCP", "Web Scraping"]
  },

  {
    "title": "Multi-Server MCP Orchestration with External and Custom Tools",
    "repo": "https://github.com/gauthiii/mcpServer",
    "image": "p11.png",
    "alt": "MCP Multi-Server Automation",
    "description": "Developed a unified Model Context Protocol (MCP) client orchestration system integrating multiple external and custom MCP servers — Playwright, Airbnb, DuckDuckGo Search, OpenWeather, and Gmail — to automate browsing, booking, search, weather retrieval, and email reading through intelligent LLM-driven tool invocation.",
    "details": "MCP Servers • External Integrations • OpenWeather API • Gmail MCP • Tool Orchestration • Automated Task Execution",
    "tags": ["MCP", "Groq", "OpenAI", "LangChain", "Playwright", "DuckDuckGo", "Airbnb", "OpenWeather", "Gmail"]
  },
  

  {
    "title": "Agentic Research Workflow with Reflective AI Agents",
    "repo": "https://github.com/gauthiii/agenticAIProjects",
    "image": "p10.png",
    "alt": "Multi-Agent Reflective Research System",
    "description": "Developed an Agentic AI framework integrating OpenAI and Claude models, where autonomous agents conduct research using custom tools (arxiv search, Tavily web search), generate structured reports, reflect on outputs, and iteratively refine results through self-critique.",
    "details": "Multi-Agent System • Tool Use • Reflection Loop • OpenAI & Claude Integration • Automated Research Reports",
    "tags": ["Agentic AI", "OpenAI", "Claude", "Tavily", "Arxiv API", "Reflection", "LLM Orchestration"]
  },  

  {
    "title": "Foundation Model Powered Document Intelligence with AWS Bedrock",
    "repo": "https://github.com/gauthiii/screenplaySearch",
    "image": "p8.png",
    "alt": "Chat with Screenplays",
    "description": "Built a RAG-based application using AWS Bedrock, Titan Embeddings, FAISS, and LangChain to enable interactive Q&A and summarization over PDFs such as movie screenplays (Lion King, Memento).",
    "details": "PDF Ingestion • Foundation Models • FAISS Indexing • RetrievalQA • Streamlit UI",
    "tags": ["AWS Bedrock", "LangChain", "FAISS", "Streamlit", "Titan Embeddings", "Llama 3"]
  },
  
  {
    "title": "Serverless Blog Generator with AWS Bedrock & Lambda",
    "repo": "https://github.com/gauthiii/blogGeneratorAWS",
    "image": "p9.png",
    "alt": "AI Blog Generator",
    "description": "Developed a serverless application using AWS Lambda, API Gateway, and Bedrock (Meta Llama3-70B Instruct) to generate short blogs and store outputs in Amazon S3.",
    "details": "AWS Lambda • API Gateway • Bedrock Integration • IAM Roles • S3 Storage • Serverless Architecture",
    "tags": ["AWS Lambda", "Bedrock", "API Gateway", "S3", "IAM", "Serverless"]
  },
  

  {
    "title": "Content Summarization Tool with LangChain + Gemma",
    "repo": "https://github.com/gauthiii/websiteYTSummarizer",
    "demo": "https://websiteytsummarizer-3bq4w47p9bqmhn6bunhkvw.streamlit.app/",
    "image": "p7.png",
    "alt": "Content Summarization Tool",
    "description": "Developed a Streamlit-based application that integrates Groq’s Gemma LLM, YouTube Transcript API, and LangChain summarization chains to summarize YouTube videos and websites in 300 words.",
    "details": "Streamlit App • Gemma LLM • LangChain • YouTube Transcript API",
    "tags": ["LangChain", "Groq", "Gemma", "Streamlit", "Python"]
  },
  {
    "title": "Customer Purchase Prediction",
    "repo": "https://github.com/gauthiii/ANN-Customer-Purchase-Prediction",
    "demo": "https://ann-customer-purchase-prediction-lsgqda2wvirgoqfylpra83.streamlit.app/",
    "image": "p1.png",
    "alt": "Customer Purchase Prediction",
    "description": "This project builds and deploys an Artificial Neural Network (ANN) to predict whether a customer is likely to make a purchase, based on demographic and behavioral features.",
    "details": "500k+ records • 15k trainable parameters • 92.5% validation accuracy • Stable loss & accuracy curves",
    "tags": ["TensorFlow", "Keras", "Deep Learning"]
  },
  {
    "title": "Multi-Agent AI System",
    "repo": "https://github.com/gauthiii/findMyStartup",
    "image": "p2.png",
    "alt": "Startup Copilot",
    "description": "Implemented dual LLM integration with Azure OpenAI and Google Gemini APIs and built a multi-agent AI system that converts startup ideas into MVPs with structured JSON outputs for startup advisory tasks.",
    "details": "Idea Parsing • Risk Analysis • Tech Stack • GTM Plan • Funding • Compliance",
    "tags": ["Node.js", "Azure OpenAI", "Google Gemini"]
  },
  {
    "title": "Automated Image Captioning",
    "repo": "https://github.com/gauthiii/fineTunedBLIP",
    "image": "p3.png",
    "alt": "Automated Image Captioning",
    "description": "Fine-tuned the Hugging Face BLIP model on a custom Tom & Jerry dataset to generate context-aware captions that uses a PyTorch training pipeline with preprocessing, augmentation, and teacher forcing.",
    "details": "50+ annotated images • AdamW Optimizer • 5e-5 Learning Rate",
    "tags": ["PyTorch", "Hugging Face", "BLIP"]
  },
  {
    "title": "Interactive Data Visualization of Formula 1 Safety Evolution",
    "repo": "https://github.com/gauthiii/f1-safety-visualization",
    "image": "p4.png",
    "alt": "F1 Safety Visualization",
    "description": "Built an interactive data visualization platform with D3.js and React to showcase the evolution of Formula 1 safety from 1950 to 2020, integrating advanced charts and user interactions.",
    "details": "Data preprocessing • Real-time Data • Accident trend analysis • Responsive Website",
    "tags": ["React", "D3.js", "Python", "Data Visualization"]
  },
  {
    "title": "Twitter Sentiment Analysis (ML Pipeline)",
    "repo": "https://github.com/gauthiii/smlTwitSenti",
    "video": "https://youtu.be/xfFOYLqIwmY?si=ZhcoXXR1Hqxsy2EB",
    "image": "p5.png",
    "alt": "Twitter Sentiment Analysis",
    "description": "Developed an end-to-end machine learning pipeline to classify sentiment on 400k+ tweets, comparing ML and deep learning models for robust inference.",
    "details": "400k+ tweets • SVM, Logistic Regression, CNN, BiLSTM • 98% accuracy (SVM) • Macro-F1 tuning & deployment-ready pipeline",
    "tags": ["Python", "Scikit-learn", "NLP", "Deep Learning"]
  },
  {
    "title": "Music Recommendation System (Spotify API & Random Forest)",
    "repo": "https://github.com/gauthiii/spotifyExtractor",
    "image": "p6.png",
    "alt": "Music Recommendation System",
    "description": "Created a dataset of songs and playlist information using the Spotify API and built a user-friendly music recommendation engine using 100k+ Spotify tracks and a Random Forest model to generate playlist predictions from audio features.",
    "details": "100k+ tracks • Random Forest model • 82% accuracy • Recommendation System",
    "tags": ["Spotify API", "Flutter","Kaggle", "Machine Learning"]
  },

  
  
]



      const container = document.getElementById("projects");
      projects.forEach(p => {
        const tags = p.tags.map(tag =>
          `<span class="rounded-full bg-ink-100 px-2 py-1 dark:bg-white/10">${tag}</span>`
        ).join("");

        const demoLink = p.demo ? `
    <a href="${p.demo}" target="_blank" class="hover:text-ink-900 dark:hover:text-white" aria-label="Live Demo">
      <i class="fa-solid fa-link text-[22px]"></i>
    </a>
  ` : "";

  const videoLink = p.video ? `
    <a href="${p.video}" target="_blank" class="hover:text-ink-900 dark:hover:text-white" aria-label="Live Demo">
      <i class="fa-brands fa-youtube text-[22px]"></i>
    </a>
  ` : "";

        container.innerHTML += `
          <article id="project" class="group rounded-2xl border border-ink-200 bg-white p-3 shadow-soft transition hover:shadow-elev dark:border-white/10 dark:bg-ink-800/70">

            <div class="relative overflow-hidden rounded-xl">
              <div class="aspect-[16/10] w-full">
                <img src="${p.image}" alt="${p.alt}" class="block h-full w-full object-cover"/>
              </div>
            </div>

            <div class="p-3">
              <h3 class="text-lg font-medium break-words">${p.title}</h3>
              <p class="mt-1 text-sm text-ink-600 dark:text-ink-300 break-words">${p.description}</p>

              ${p.details ? `<p class="mt-1 text-sm text-ink-600 dark:text-ink-300" style="margin-top: 10px;">${p.details}</p>` : ""}
              <div class="mt-3 flex flex-wrap items-center gap-2 text-xs text-ink-500 dark:text-ink-300">

                ${tags}
              </div>

              <div class="mt-8 flex items-center gap-3 text-ink-500 dark:text-ink-300">
                <a href="${p.repo}" target="_blank" class="hover:text-ink-900 dark:hover:text-white" aria-label="GitHub">
                   <i class="fa-brands fa-github text-[22px] leading-none"></i>
                </a>

                ${demoLink}


                ${videoLink}
              </div>

            </div>
          </article>
        `;
      });


