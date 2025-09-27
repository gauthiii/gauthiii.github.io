projects = [
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
  {
    "title": "Content Summarization Tool with LangChain + Gemma",
    "repo": "https://github.com/gauthiii/websiteYTSummarizer",
    "demo": "https://websiteytsummarizer-3bq4w47p9bqmhn6bunhkvw.streamlit.app/",
    "image": "p7.png",
    "alt": "Content Summarization Tool",
    "description": "Developed a Streamlit-based application that integrates Groq’s Gemma LLM, YouTube Transcript API, and LangChain summarization chains to summarize YouTube videos and websites in 300 words.",
    "details": "Streamlit App • Gemma LLM • LangChain • YouTube Transcript API",
    "tags": ["LangChain", "Groq", "Gemma", "Streamlit", "Python"]
  }
  
  
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
              <img src="${p.image}" alt="${p.alt}" class="aspect-[16/10] w-full rounded-lg object-cover"/>
            </div>

            <div class="p-3">
              <h3 class="text-lg font-medium">${p.title}</h3>
              <p class="mt-1 text-sm text-ink-600 dark:text-ink-300">${p.description}</p>
              ${p.details ? `<p class="mt-1 text-sm text-ink-600 dark:text-ink-300" style="margin-top: 10px;">${p.details}</p>` : ""}
              <div class="mt-3 flex items-center gap-2 text-xs text-ink-500 dark:text-ink-300">
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


