// ── All Prompts Data ──────────────────────────────────────────────────────
const PROMPTS = [
  {
    id: 1,
    title: "Ultimate Daily Planner",
    cat: "Productivity", catIcon: "📈",
    ai: "chatgpt", aiName: "ChatGPT", aiColor: "#10a37f",
    emoji: "📅", gradient: "g1",
    rating: 4.9, uses: "3.2k",
    author: "Rahul S.", authorColor: "#10a37f",
    desc: "Plan your entire day, set goals, manage tasks, and stay laser-focused with this proven productivity system.",
    outcome: `• 3 SMART goals broken down into bite-sized actionable tasks
• A morning, afternoon & evening time-blocked schedule
• Proactive distraction prevention plan
• End-of-day accomplishment review checklist`,
    tags: ["planning", "goals", "time-management", "productivity"],
    prompt: `Act as a professional productivity coach with 10+ years of experience. Help me plan my day effectively by:

1) Setting 3 SMART goals for today
2) Breaking each goal into specific, actionable tasks
3) Time-blocking my schedule (morning, afternoon, evening)
4) Identifying potential distractions and how to avoid them
5) Creating an end-of-day review checklist

My goals today: [YOUR GOALS]
My working hours: [e.g. 9am - 6pm]
Fixed meetings/appointments: [LIST THEM OR WRITE "NONE"]
Current energy level (1-10): [YOUR ENERGY LEVEL]

Please provide a detailed, structured daily plan I can follow immediately.`,
    howToUse: [
      "Replace [YOUR GOALS] with 2-3 things you want to accomplish today",
      "Fill in your working hours (e.g. 9am - 6pm)",
      "List any fixed meetings or appointments, or write 'None'",
      "Copy the complete prompt and paste it into ChatGPT",
      "Follow the structured plan it creates for you"
    ]
  },
  {
    id: 2,
    title: "Viral Social Media Kit",
    cat: "Marketing", catIcon: "📢",
    ai: "gemini", aiName: "Gemini", aiColor: "#4285F4",
    emoji: "📢", gradient: "g2",
    rating: 4.8, uses: "2.8k",
    author: "Priya M.", authorColor: "#9b59b6",
    desc: "Generate 10 viral hooks, captions, and content ideas for any brand or product on any platform.",
    outcome: `• 5 high-converting viral hooks for scroll-stopping reach
• 5 ready-to-publish social captions with persuasive CTAs
• 3 story/reel video concepts with complete scripts
• 10 algorithmic hashtags tailored for maximum engagement`,
    tags: ["social media", "marketing", "content", "viral", "captions"],
    prompt: `You are a viral social media strategist with 8+ years of experience growing brands on social platforms.

Create a complete social media content kit for:
- Brand/Product: [YOUR BRAND OR PRODUCT NAME]
- Platform: [Instagram / LinkedIn / Twitter / Facebook / all]
- Target Audience: [DESCRIBE YOUR AUDIENCE]
- Tone: [casual / professional / funny / inspirational]
- Goal: [brand awareness / sales / engagement / followers]

Please create:
1) 5 viral hook lines (attention-grabbing opening lines)
2) 5 full post captions (ready to publish)
3) 3 story/reel ideas with scripts
4) 10 relevant hashtags
5) Best times to post for maximum reach
6) 1 call-to-action for each post

Make each piece punchy, engaging, and optimized for the algorithm.`,
    howToUse: [
      "Replace [YOUR BRAND OR PRODUCT NAME] with your business or product name",
      "Choose your target platform (Instagram, LinkedIn, etc.)",
      "Describe your target audience (age, interests, profession)",
      "Set the tone that matches your brand voice",
      "Paste into Gemini and get a full content kit ready to use"
    ]
  },
  {
    id: 3,
    title: "ATS-Optimized Resume Builder",
    cat: "Career", catIcon: "🧳",
    ai: "claude", aiName: "Claude", aiColor: "#D97757",
    emoji: "📄", gradient: "g3",
    rating: 4.9, uses: "4.1k",
    author: "Amit K.", authorColor: "#f5576c",
    desc: "Create a professional, ATS-friendly resume that gets you past automated filters and into interviews.",
    outcome: `• ATS-optimized professional resume formatted for 90+ screening scores
• Action-verb achievement bullets with quantifiable metrics
• Industry keyword checklist for recruiters and automated parsers
• Executive career summary tailored to target job roles`,
    tags: ["resume", "career", "job", "ATS", "CV", "interview"],
    prompt: `Act as an expert resume writer and career coach with 15 years of experience helping candidates land jobs at top companies.

Create a professional, ATS-optimized resume for me based on the information below:

Personal Details:
- Name: [YOUR FULL NAME]
- Email: [YOUR EMAIL]
- Phone: [YOUR PHONE]
- LinkedIn: [YOUR LINKEDIN URL or "N/A"]
- Location: [CITY, STATE]

Job Target:
- Position: [JOB TITLE YOU ARE APPLYING FOR]
- Industry: [YOUR INDUSTRY]
- Experience Level: [Fresher / 1-3 years / 3-5 years / 5+ years]

My Background:
[PASTE YOUR EXPERIENCE, EDUCATION, SKILLS, PROJECTS HERE]

Requirements:
1) Write a powerful professional summary (3-4 lines)
2) List skills in order of relevance to the job
3) Format experience using strong action verbs + measurable results
4) Make every section ATS-keyword rich
5) Keep it clean, one-page if possible

Also suggest 5 keywords I must include for this role.`,
    howToUse: [
      "Fill in your personal details (name, email, phone, LinkedIn)",
      "Write the exact job title you are applying for",
      "Paste your experience, education, skills and projects in the 'My Background' section",
      "Copy and paste into Claude",
      "Claude will generate a professional resume - copy the output to Word or Google Docs"
    ]
  },
  {
    id: 4,
    title: "Code Review Expert",
    cat: "Programming", catIcon: "💻",
    ai: "deepseek", aiName: "DeepSeek", aiColor: "#1C62F5",
    emoji: "💻", gradient: "g4",
    rating: 4.7, uses: "2.1k",
    author: "Vikram D.", authorColor: "#4facfe",
    desc: "Get a senior developer to review your code, find bugs, suggest improvements, and optimize performance.",
    outcome: `• Line-by-line bug identification with root cause analysis
• Performance optimization recommendations & security audits
• Production-ready refactored code following clean architecture patterns
• Objective code quality score with improvement roadmap`,
    tags: ["coding", "debugging", "code review", "programming", "developer"],
    prompt: `You are a senior software engineer with 12+ years of experience across multiple languages and systems. Review the following code with the eyes of a strict but helpful tech lead.

Programming Language: [e.g. Python / JavaScript / Java / C++ / etc.]
Context: [Briefly describe what this code is supposed to do]

Code to Review:
\`\`\`
[PASTE YOUR CODE HERE]
\`\`\`

Please provide a thorough review covering:
1) 🐛 Bug Identification — list each bug with line number and explanation
2) ⚡ Performance Issues — what can be made faster or more efficient
3) 🔒 Security Vulnerabilities — any security risks or bad practices
4) 📖 Code Readability — naming, comments, structure improvements
5) 🏗️ Architecture Suggestions — design pattern improvements
6) ✅ Refactored Clean Version — rewrite the code with all improvements applied

Rate the code quality: /10 and explain what the score means.`,
    howToUse: [
      "Write the programming language your code is in",
      "Add a brief description of what the code should do",
      "Paste your actual code between the triple backticks",
      "Copy the full prompt into DeepSeek",
      "Get a detailed review with an improved version of your code"
    ]
  },
  {
    id: 5,
    title: "Business Plan Generator",
    cat: "Business", catIcon: "💼",
    ai: "chatgpt", aiName: "ChatGPT", aiColor: "#10a37f",
    emoji: "💡", gradient: "g5",
    rating: 4.8, uses: "1.9k",
    author: "Suresh T.", authorColor: "#f7971e",
    desc: "Generate a complete, investor-ready business plan with market research, strategy, and financial projections.",
    outcome: `• Complete 10-section investor-ready startup business plan
• Market analysis, competitive positioning & revenue model breakdown
• Year 1-3 financial projection framework
• Go-to-market marketing roadmap and risk mitigation strategy`,
    tags: ["business", "startup", "business plan", "entrepreneur", "investor"],
    prompt: `Act as a senior business consultant and startup advisor with experience helping 100+ businesses launch successfully.

Create a comprehensive, investor-ready business plan for the following idea:

Business Details:
- Business Idea: [DESCRIBE YOUR BUSINESS IDEA IN 2-3 SENTENCES]
- Industry: [YOUR INDUSTRY]
- Target Market: [WHO ARE YOUR CUSTOMERS]
- Location: [CITY / COUNTRY / ONLINE]
- Estimated Startup Budget: [YOUR BUDGET in ₹ or $]
- Team Size: [SOLO / 2-5 PEOPLE / etc.]

Create a full business plan including:
1) Executive Summary (1 page overview)
2) Problem & Solution (pain point you're solving)
3) Market Analysis (market size, trends, opportunity)
4) Competitor Analysis (3-5 competitors with strengths/weaknesses)
5) Revenue Model (how you will make money)
6) Marketing & Customer Acquisition Strategy
7) Operations Plan (how the business will run day-to-day)
8) Financial Projections (Year 1, Year 2, Year 3)
9) Risk Analysis & Mitigation
10) Funding Requirements (if needed)

Make it professional enough to present to investors or a bank.`,
    howToUse: [
      "Describe your business idea in 2-3 clear sentences",
      "Fill in your target market (who will buy your product/service)",
      "Enter your estimated startup budget",
      "Copy the prompt into ChatGPT",
      "Get a complete, professional business plan you can present to investors"
    ]
  },
  {
    id: 6,
    title: "ELI5 – Explain Like I'm 5",
    cat: "Education", catIcon: "🎓",
    ai: "gemini", aiName: "Gemini", aiColor: "#4285F4",
    emoji: "🎓", gradient: "g6",
    rating: 4.9, uses: "5.6k",
    author: "Neha R.", authorColor: "#30cfd0",
    desc: "Understand any complex topic with simple, beginner-friendly explanations and real-world examples.",
    tags: ["learning", "education", "explain", "beginner", "simple"],
    prompt: `You are the world's best teacher — someone who can take any complex topic and explain it so clearly that a complete beginner would understand and love learning it.

Topic I want to understand: [YOUR TOPIC]
My current knowledge level: [Complete Beginner / Know the basics / Intermediate]
Why I'm learning this: [YOUR REASON - e.g. for exams, career, curiosity]

Please explain this topic by:
1) Start with a simple real-world analogy everyone can relate to
2) Break it down into 5-7 key concepts (from simplest to most complex)
3) Give a concrete example for each concept
4) Use simple language (avoid jargon — if you must use technical terms, define them)
5) Create a visual diagram or table if it helps
6) End with a "Key Takeaways" summary (5 bullet points)
7) Suggest 5 follow-up questions I should explore next
8) Recommend the best free resource to learn more

Make it engaging, fun, and memorable.`,
    howToUse: [
      "Replace [YOUR TOPIC] with anything you want to learn (e.g. 'Quantum Computing', 'Stock Markets', 'Machine Learning')",
      "Set your current knowledge level honestly",
      "Explain why you're learning it for a more tailored explanation",
      "Paste into Gemini",
      "Save the explanation — it will be your go-to reference for that topic"
    ]
  },
  {
    id: 7,
    title: "Professional Email Writer",
    cat: "Writing", catIcon: "✍️",
    ai: "claude", aiName: "Claude", aiColor: "#D97757",
    emoji: "📧", gradient: "g7",
    rating: 4.6, uses: "3.7k",
    author: "Kavya S.", authorColor: "#fa709a",
    desc: "Write polished, professional emails for any situation — job applications, follow-ups, complaints, and more.",
    tags: ["email", "writing", "professional", "communication", "business"],
    prompt: `You are an expert business communication consultant who writes clear, persuasive, professional emails that get results.

Write a professional email for the following situation:

Email Details:
- Purpose: [e.g. Job Application / Leave Request / Complaint / Follow-up / Partnership / Invoice / Apology]
- From: [YOUR NAME & DESIGNATION]
- To: [RECIPIENT NAME & DESIGNATION - e.g. HR Manager, Client, Boss]
- Company/Context: [COMPANY NAME or SITUATION]

Key points I want to communicate:
[LIST 3-5 KEY POINTS YOU WANT TO INCLUDE]

Tone required: [Formal / Semi-formal / Assertive / Apologetic / Grateful]
Length: [Short (under 100 words) / Medium / Detailed]
Any special requirements: [e.g. "must mention the deadline", "be firm but polite"]

Please write:
1) A strong subject line (give 3 options)
2) The complete email body
3) A professional sign-off
4) One follow-up email template (in case no reply within 3 days)`,
    howToUse: [
      "Describe the purpose of your email clearly",
      "Fill in your name and the recipient's name/designation",
      "List the 3-5 key points you want to communicate",
      "Choose the appropriate tone",
      "Paste into Claude and get a polished email ready to send"
    ]
  },
  {
    id: 8,
    title: "Interview Prep Coach",
    cat: "Career", catIcon: "🧳",
    ai: "grok", aiName: "Grok", aiColor: "#000",
    emoji: "🎯", gradient: "g8",
    rating: 4.8, uses: "2.3k",
    author: "Mohit B.", authorColor: "#56ccf2",
    desc: "Prepare for any job interview with mock questions, STAR-method answers, and expert tips tailored to your role.",
    tags: ["interview", "career", "job", "HR", "preparation", "STAR"],
    prompt: `You are an expert interview coach who has helped 500+ candidates crack interviews at top companies like Google, Amazon, Infosys, TCS, and leading startups.

Prepare me for an upcoming job interview:

Interview Details:
- Job Title: [EXACT JOB TITLE]
- Company: [COMPANY NAME or TYPE - e.g. "Tech Startup" or "MNC"]
- Industry: [e.g. Software / Finance / Marketing / Healthcare]
- My Experience: [Fresher / 1-2 years / 3-5 years / 5+ years]
- Interview Round: [HR / Technical / Managerial / Final]

My Background:
- Current Role: [YOUR CURRENT ROLE or "Fresher"]
- Key Skills: [LIST YOUR TOP 5 SKILLS]
- Biggest Achievement: [ONE KEY ACHIEVEMENT]

Please provide:
1) 15 most likely interview questions for this specific role
2) STAR-format answer templates for the top 5 behavioral questions
3) Technical questions I should prepare for (with expected answers)
4) 5 smart questions I should ask the interviewer
5) Common mistakes candidates make for this role — and how to avoid them
6) A 30-second elevator pitch for "Tell me about yourself"
7) Red flags to avoid in my answers

Make it highly specific to the role and company type.`,
    howToUse: [
      "Enter the exact job title you are interviewing for",
      "Name the company or describe the company type",
      "List your top 5 skills honestly",
      "Specify which round of interview (HR, Technical, etc.)",
      "Paste into Grok and practice the questions it gives you"
    ]
  },
  {
    id: 9,
    title: "YouTube Script Writer",
    cat: "Content Writing", catIcon: "✍️",
    ai: "chatgpt", aiName: "ChatGPT", aiColor: "#10a37f",
    emoji: "🎬", gradient: "g1",
    rating: 4.7, uses: "1.6k",
    author: "Ravi G.", authorColor: "#667eea",
    desc: "Write engaging, retention-optimized YouTube video scripts with hooks, storytelling, and clear CTAs.",
    tags: ["youtube", "script", "video", "content", "creator"],
    prompt: `You are a professional YouTube scriptwriter who has written scripts for channels with 1M+ subscribers. You understand the YouTube algorithm, viewer psychology, and what keeps people watching.

Write a complete YouTube script for:

Video Details:
- Topic: [YOUR VIDEO TOPIC]
- Channel Niche: [e.g. Tech / Finance / Fitness / Education / Gaming]
- Target Audience: [WHO WATCHES YOUR CHANNEL]
- Video Length Target: [5 min / 10 min / 15 min / 20+ min]
- Tone: [Educational / Entertainment / Motivational / Tutorial]

Write the complete script with:
1) 🎣 HOOK (First 30 seconds) — grab attention immediately, create curiosity
2) 📋 INTRO — introduce yourself and what viewers will learn/get
3) 📖 MAIN CONTENT — structured in clear sections with transitions
4) 🎯 CALL TO ACTION — subscribe, like, comment prompt (natural, not forced)
5) 🔚 OUTRO — memorable closing that makes viewers want to watch more

Also provide:
- 5 thumbnail text ideas
- 3 title options (optimized for SEO + clicks)
- Video description template with timestamps
- 10 relevant tags for YouTube SEO`,
    howToUse: [
      "Enter your specific video topic",
      "Describe your channel niche and target audience",
      "Choose your target video length",
      "Paste into ChatGPT",
      "Use the script as a base and personalize it with your own stories and examples"
    ]
  },
  {
    id: 10,
    title: "Cold Email Outreach Machine",
    cat: "Marketing", catIcon: "📢",
    ai: "claude", aiName: "Claude", aiColor: "#D97757",
    emoji: "📨", gradient: "g2",
    rating: 4.6, uses: "1.2k",
    author: "Sneha P.", authorColor: "#764ba2",
    desc: "Write high-converting cold emails that get replies — for sales, partnerships, freelance outreach, and networking.",
    tags: ["cold email", "outreach", "sales", "marketing", "freelance"],
    prompt: `You are a cold email expert who has written campaigns with 40%+ open rates and 15%+ reply rates. Write cold emails that feel personal, not spammy.

Create a cold email sequence for:

Outreach Goal: [e.g. Get a sales meeting / Land a freelance client / Request partnership / Job inquiry]
My Name & Company: [YOUR NAME & COMPANY/BRAND]
What I Offer: [YOUR PRODUCT/SERVICE/SKILL in 1-2 sentences]
Target Recipient: [THEIR ROLE & COMPANY TYPE - e.g. "Marketing Manager at D2C brands"]
Their Likely Pain Point: [WHAT PROBLEM DO THEY HAVE THAT YOU SOLVE]
One impressive result/proof: [e.g. "Helped XYZ company get 200% more leads"]

Write a 3-email sequence:
📧 Email 1 (Day 1): The opener — short, personalized, curiosity-driven
📧 Email 2 (Day 4): The follow-up — add value, not just "checking in"
📧 Email 3 (Day 10): The breakup email — create urgency, leave door open

For each email provide:
- Subject line (2 options: curiosity + direct)
- Email body (under 150 words each)
- P.S. line (often the most read part)

Keep it human, conversational, and hyper-relevant.`,
    howToUse: [
      "Define your outreach goal clearly (sales, freelance, partnership, etc.)",
      "Describe what you offer in 1-2 sentences",
      "Identify the pain point of your target recipient",
      "Include ONE impressive result or proof point",
      "Paste into Claude and get a 3-email sequence ready to send"
    ]
  },
  {
    id: 11,
    title: "Study Notes Generator",
    cat: "Education", catIcon: "🎓",
    ai: "gemini", aiName: "Gemini", aiColor: "#4285F4",
    emoji: "📚", gradient: "g6",
    rating: 4.8, uses: "4.8k",
    author: "Anjali M.", authorColor: "#4285F4",
    desc: "Convert any textbook chapter, lecture, or topic into clean, exam-ready notes with key points and mnemonics.",
    tags: ["study", "notes", "exam", "student", "learning", "education"],
    prompt: `You are an expert academic tutor who specializes in creating perfect study notes that help students score top marks in exams.

Create comprehensive study notes for:

Subject: [SUBJECT NAME - e.g. Organic Chemistry / Indian History / Data Structures]
Topic/Chapter: [SPECIFIC TOPIC OR CHAPTER NAME]
Exam Level: [School / College / Competitive - e.g. JEE / UPSC / GATE / CA]
My Level: [Beginner / Intermediate / Advanced]
Exam in: [How many days]

Content to convert (paste here or describe the topic):
[PASTE YOUR TEXTBOOK CONTENT OR DESCRIBE THE TOPIC]

Create structured notes including:
1) 📌 Quick Overview (3-5 lines summary)
2) 🔑 Key Concepts (explain each with examples)
3) 📊 Tables/Comparison charts where useful
4) ✅ Important Formulas / Dates / Facts (highlighted)
5) 🧠 Mnemonics / Memory tricks for difficult parts
6) ❓ 10 most likely exam questions on this topic
7) ✍️ Model answers for 3 important questions
8) 🔄 Quick Revision Checklist (one-line bullets)

Format it so it can be saved and revised quickly before the exam.`,
    howToUse: [
      "Enter your subject and specific chapter/topic name",
      "Mention your exam level (JEE, UPSC, College exams, etc.)",
      "Paste your textbook content or describe the topic",
      "Paste into Gemini",
      "Save the notes — they'll be your go-to exam revision material"
    ]
  },
  {
    id: 12,
    title: "Startup Idea Validator",
    cat: "Business", catIcon: "💼",
    ai: "deepseek", aiName: "DeepSeek", aiColor: "#1C62F5",
    emoji: "🚀", gradient: "g5",
    rating: 4.7, uses: "1.4k",
    author: "Karan M.", authorColor: "#1C62F5",
    desc: "Validate your startup idea with honest market analysis, competitor research, and go-to-market strategy.",
    tags: ["startup", "business idea", "validation", "entrepreneur", "market"],
    prompt: `You are a seasoned startup advisor and venture capitalist who has evaluated 1000+ business ideas. Be brutally honest — I need real feedback, not just encouragement.

Validate the following startup idea:

My Idea: [DESCRIBE YOUR STARTUP IDEA IN 3-5 SENTENCES]
Target Market: [WHO IS YOUR CUSTOMER - be specific]
Problem Solved: [WHAT PROBLEM DOES IT SOLVE]
My Proposed Solution: [HOW YOU PLAN TO SOLVE IT]
Revenue Model: [HOW YOU PLAN TO MAKE MONEY]
My Background: [YOUR RELEVANT SKILLS/EXPERIENCE]
Budget Available: [YOUR STARTUP BUDGET]
Market/Country: [WHERE YOU PLAN TO LAUNCH]

Please provide:
1) 💡 Idea Score (1-10) with honest reasoning
2) ✅ Strengths — what's genuinely promising
3) ⚠️ Weaknesses — critical problems I must solve
4) 🏆 Top 5 Competitors — and how I can differentiate
5) 📊 Market Size Estimation — is this worth pursuing?
6) 🎯 Target Customer Profile — who exactly will pay for this?
7) 🚀 Go-to-Market Strategy — first 90 days plan
8) 💰 Realistic Revenue Projection — Year 1, Year 2
9) 🔴 Red Flags — why this could fail
10) 📋 Next 5 Actions I should take immediately

Don't sugarcoat anything. I need the truth.`,
    howToUse: [
      "Describe your startup idea as clearly as possible (3-5 sentences)",
      "Be specific about who your target customer is",
      "Explain exactly how you plan to make money",
      "Share your budget and relevant background",
      "Paste into DeepSeek and be ready for honest, detailed feedback"
    ]
  },
  {
    id: 13,
    title: "Cinematic AI Art Masterpiece",
    cat: "Art & Design", catIcon: "🎨",
    ai: "midjourney", aiName: "Midjourney", aiColor: "#101018",
    emoji: "🎨", gradient: "g2",
    rating: 4.9, uses: "6.4k",
    author: "Arjun V.", authorColor: "#8b5cf6",
    aspectRatio: "16/9",
    desc: "Create breathtaking, ultra-detailed cinematic art with dramatic volumetric lighting, 8k textures, and Unreal Engine 5 realism.",
    tags: ["art", "design", "midjourney", "cinematic", "visual"],
    prompt: `hyper-realistic cinematic visual of [SUBJECT], directed by Denis Villeneuve and Roger Deakins, [LIGHTING_STYLE] lighting, volumetric dust particles, shot on ARRI Alexa LF 65mm, f/1.8 depth of field, award-winning concept art, intricate textures, 8k resolution, octane render, photorealistic --ar 16:9 --style raw --v 6.1`,
    howToUse: [
      "Replace [SUBJECT] with your scene or character description",
      "Replace [LIGHTING_STYLE] with (e.g. golden hour, moody cyberpunk neon, rim light)",
      "Copy into Midjourney, Leonardo AI, or DALL-E 3",
      "Generate stunning high-definition visual concept art"
    ]
  },
  {
    id: 14,
    title: "Studio Portrait Photographer",
    cat: "Photography", catIcon: "📸",
    ai: "chatgpt", aiName: "ChatGPT", aiColor: "#10a37f",
    emoji: "📸", gradient: "g4",
    rating: 4.8, uses: "3.5k",
    author: "Kunal S.", authorColor: "#06d6a0",
    aspectRatio: "4/5",
    desc: "Generate professional Vogue-grade portrait photography prompts with precise camera settings and lighting ratios.",
    tags: ["photography", "portrait", "camera", "fashion", "studio"],
    prompt: `Act as a master fashion & portrait photographer. Generate an ultra-detailed image generation prompt for:

Subject: [DESCRIBE PERSON / MODEL / OUTFIT]
Location/Backdrop: [STUDIO SEAMLESS / URBAN STREET / NATURE / ETC.]
Mood/Emotion: [CONFIDENT / MYSTERIOUS / ENERGETIC / MINIMAL]

Include in the prompt:
1) Exact camera & lens specs (e.g. Hasselblad H6D-100c, 85mm f/1.4 lens)
2) Lighting setup (Key light, fill light, softbox diffusion, catchlight in eyes)
3) Skin texture & detail directives (hyper-detailed skin pores, micro-contrast, no plastic look)
4) Color grading (kodak portra 400 color tones, muted highlights)
5) Aspect ratio recommendation (--ar 4:5 for Instagram portrait)`,
    howToUse: [
      "Fill in your model description, outfit, and location",
      "Paste into ChatGPT to generate the master photographic prompt",
      "Copy the output into Midjourney or Stable Diffusion",
      "Get authentic, magazine-quality fashion portraits"
    ]
  },
  {
    id: 15,
    title: "Viral Reels & TikTok Script Engine",
    cat: "Social Media", catIcon: "📱",
    ai: "gemini", aiName: "Gemini", aiColor: "#4285F4",
    emoji: "📱", gradient: "g7",
    rating: 4.9, uses: "7.1k",
    author: "Simran K.", authorColor: "#ec4899",
    aspectRatio: "9/16",
    desc: "Create high-retention 30-second short scripts with psychology-backed visual hooks and sound cues for Instagram & Reels.",
    tags: ["reels", "tiktok", "shorts", "viral", "video"],
    prompt: `You are a viral short-form video creator with over 10M+ views on Instagram Reels and YouTube Shorts.

Write a high-retention 30-second vertical video script for:
- Topic: [YOUR TOPIC OR SECRET TIP]
- Niche: [FITNESS / TECH / FINANCE / BUSINESS / PRODUCTIVITY]
- Target Audience: [WHO IS WATCHING]

Script Structure:
0:00 - 0:03 [THE VISUAL HOOK]: Pattern interrupt + bold text on screen + spoken hook
0:03 - 0:10 [THE PROBLEM]: Relatable pain point everyone experiences
0:10 - 0:24 [THE UNFAIR ADVANTAGE / VALUE]: 3 rapid-fire actionable steps with on-screen B-roll cues
0:24 - 0:30 [THE LOOP CTA]: Save this video + high retention cliffhanger

Include:
- Exact voiceover script (word-by-word)
- Visual cues (what to show on camera)
- Sound design / trending audio suggestions
- 3 high-converting caption options with hashtags`,
    howToUse: [
      "Enter your topic and niche",
      "Paste into Gemini",
      "Record following the 30-second B-roll and hook directions",
      "Publish as vertical 9:16 Reel or Short"
    ]
  },
  {
    id: 16,
    title: "YouTube Video Blueprint",
    cat: "Video & YouTube", catIcon: "🎬",
    ai: "claude", aiName: "Claude", aiColor: "#D97757",
    emoji: "🎬", gradient: "g6",
    rating: 4.8, uses: "4.2k",
    author: "Rohit N.", authorColor: "#f59e0b",
    aspectRatio: "16/9",
    desc: "Complete YouTube video package with 3 high-CTR titles, thumbnail concepts, retention hooks, and chapter breakdown.",
    tags: ["youtube", "video", "retention", "ctr", "titles"],
    prompt: `Act as a senior YouTube strategist who has optimized videos generating 100M+ impressions.

Create a complete video blueprint for:
Video Idea: [YOUR VIDEO IDEA IN 1 SENTENCE]
Niche: [TECH / BUSINESS / GAMING / EDUCATION / ENTERTAINMENT]
Competitor Channels: [LIST 1-2 POPULAR CHANNELS IN THIS NICHE]

Deliver:
1) 5 Click-Worthy Titles (tested for curiosity gap & search intent)
2) 3 Thumbnail Visual Concepts (describe imagery, facial expression, text overlay)
3) First 60-Second Hook (retention guarantee: no slow intros, start right in the action)
4) 5-Part Video Chapter Outline with retention resets every 2 minutes
5) High-converting pinned comment template`,
    howToUse: [
      "Describe your video idea in one clear sentence",
      "Paste into Claude",
      "Pick your favorite title and thumbnail concept",
      "Shoot your video using the retention chapter breakdown"
    ]
  }
];

// ── Database & Storage Engine ────────────────────────────────────────────────
let cachedCustomPrompts = [];

const SEED_CUSTOM_PROMPTS = [];

function getDeletedPromptIds() {
  try {
    return JSON.parse(localStorage.getItem('promptvault_deleted_ids') || '[]');
  } catch(e) {
    return [];
  }
}

function getUserPrompts() {
  try {
    const raw = localStorage.getItem('promptvault_user_prompts');
    return raw ? JSON.parse(raw) : [];
  } catch(e) {
    return [];
  }
}

async function loadAllCustomPrompts() {
  let loaded = null;

  // 1. Primary Source of Truth: Cloud Firestore
  if (typeof firestoreGetAllPrompts === 'function') {
    try {
      const fsPrompts = await firestoreGetAllPrompts();
      if (Array.isArray(fsPrompts) && fsPrompts.length >= 0) {
        loaded = fsPrompts;
      }
    } catch(e) {
      console.warn("Firestore load note:", e);
    }
  }

  // 2. Offline / Local IndexedDB fallback
  if (loaded === null) {
    if (typeof dbGetAllCustomPrompts === 'function') {
      try {
        const dbPrompts = await dbGetAllCustomPrompts();
        if (dbPrompts && dbPrompts.length > 0) {
          loaded = dbPrompts;
        }
      } catch(e){}
    }

    if (!loaded || !loaded.length) {
      const userLocal = getUserPrompts();
      if (userLocal && userLocal.length > 0) {
        loaded = userLocal;
      }
    }

    if (!loaded || !loaded.length) {
      loaded = typeof SEED_CUSTOM_PROMPTS !== 'undefined' ? [...SEED_CUSTOM_PROMPTS] : [];
    }
  }

  cachedCustomPrompts = loaded || [];
  return cachedCustomPrompts;
}

function getAllPrompts() {
  const deletedIds = getDeletedPromptIds().map(String);
  // Show ONLY user uploaded prompts - no dummy/default prompts!
  const all = [...cachedCustomPrompts];
  return all
    .filter(p => !deletedIds.includes(String(p.id)))
    .map(p => {
      const ratingData = getPromptRatingData(p.id);
      // Ensure images array exists
      let imgs = [];
      if (Array.isArray(p.images) && p.images.length > 0) {
        imgs = p.images;
      } else if (p.customImage) {
        imgs = [p.customImage];
      }
      
      const hasImages = imgs.length > 0 || !!p.customImage;
      const resolvedType = p.promptType ? p.promptType : (hasImages ? 'image' : 'text');
      const isTrending = p.isTrending === true || p.isTrending === 'true';
      const trendingRank = p.trendingRank ? parseInt(p.trendingRank, 10) : 99;

      return {
        ...p,
        images: imgs,
        customImage: p.customImage || (imgs.length > 0 ? (typeof imgs[0] === 'string' ? imgs[0] : imgs[0].url) : null),
        promptType: resolvedType,
        isTrending: isTrending,
        trendingRank: trendingRank,
        rating: ratingData.avg || p.rating || '5.0',
        ratingCount: ratingData.count
      };
    });
}

// Get Top 10 Trending Prompts sorted by rank
function getTrendingPrompts() {
  const all = getAllPrompts();
  return all
    .filter(p => p.isTrending)
    .sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99))
    .slice(0, 10);
}

// Toggle or update Trending status for a prompt
async function setPromptTrending(id, isTrending, rank) {
  const all = getAllPrompts();
  const target = all.find(p => String(p.id) === String(id));
  if (!target) return false;

  target.isTrending = !!isTrending;
  if (rank !== undefined && rank !== null) {
    target.trendingRank = Math.max(1, Math.min(10, parseInt(rank, 10) || 1));
  }

  await saveUserPromptAsync(target);
  return target;
}

// Save or Update prompt in Cloud Firestore and memory
async function saveUserPromptAsync(promptData) {
  if (!promptData.id) promptData.id = 'user_' + Date.now();
  
  // If it was marked deleted before, undelete it
  const deleted = getDeletedPromptIds().filter(id => String(id) !== String(promptData.id));
  localStorage.setItem('promptvault_deleted_ids', JSON.stringify(deleted));

  const idx = cachedCustomPrompts.findIndex(p => String(p.id) === String(promptData.id));
  if (idx >= 0) {
    cachedCustomPrompts[idx] = promptData;
  } else {
    cachedCustomPrompts.unshift(promptData);
  }

  // 1. Primary Save to Cloud Firestore
  if (typeof firestoreSavePrompt === 'function') {
    await firestoreSavePrompt(promptData);
  } else if (typeof dbSavePrompt === 'function') {
    await dbSavePrompt(promptData);
  }

  return promptData;
}

// Delete prompt from Cloud Firestore and memory
async function deleteUserPromptAsync(id) {
  const strId = String(id);
  cachedCustomPrompts = cachedCustomPrompts.filter(p => String(p.id) !== strId);
  
  // 1. Delete from Cloud Firestore
  if (typeof firestoreDeletePrompt === 'function') {
    await firestoreDeletePrompt(id);
  } else if (typeof dbDeletePrompt === 'function') {
    await dbDeletePrompt(id);
  }
  
  // Mark as deleted in localStorage so it's hidden everywhere
  const deleted = getDeletedPromptIds();
  if (!deleted.includes(strId)) {
    deleted.push(strId);
    localStorage.setItem('promptvault_deleted_ids', JSON.stringify(deleted));
  }

  try {
    localStorage.setItem('promptvault_user_prompts', JSON.stringify(cachedCustomPrompts));
  } catch(e){}

  return true;
}

// Helper to get prompt by ID
function getPromptById(id) {
  const all = getAllPrompts();
  return all.find(p => String(p.id) === String(id)) || null;
}

// ── Rating Engine ─────────────────────────────────────────────────────────────
function getPromptRatingData(promptId) {
  try {
    const ratingsMap = JSON.parse(localStorage.getItem('promptvault_ratings') || '{}');
    if (ratingsMap[promptId]) {
      return ratingsMap[promptId];
    }
  } catch(e){}

  const rawP = PROMPTS.find(p => String(p.id) === String(promptId)) || 
               cachedCustomPrompts.find(p => String(p.id) === String(promptId));
  const baseRating = rawP ? (parseFloat(rawP.rating) || 4.9) : 4.9;
  const count = 35;
  return {
    avg: baseRating.toFixed(1),
    count: count,
    userRated: null,
    breakdown: { 5: 28, 4: 5, 3: 2, 2: 0, 1: 0 }
  };
}

function ratePrompt(promptId, stars) {
  stars = Math.max(1, Math.min(5, parseInt(stars, 10)));
  let ratingsMap = {};
  try {
    ratingsMap = JSON.parse(localStorage.getItem('promptvault_ratings') || '{}');
  } catch(e){}

  const data = getPromptRatingData(promptId);
  if (!data.breakdown) {
    data.breakdown = { 5: 28, 4: 5, 3: 2, 2: 0, 1: 0 };
  }

  if (data.userRated) {
    // replace previous vote
    const prev = data.userRated;
    if (data.breakdown[prev] > 0) data.breakdown[prev]--;
    data.breakdown[stars] = (data.breakdown[stars] || 0) + 1;
  } else {
    data.count = (data.count || 35) + 1;
    data.breakdown[stars] = (data.breakdown[stars] || 0) + 1;
  }

  data.userRated = stars;

  // Calculate new weighted average
  let totalScore = 0;
  let totalVotes = 0;
  for (let s = 1; s <= 5; s++) {
    const cnt = data.breakdown[s] || 0;
    totalScore += s * cnt;
    totalVotes += cnt;
  }
  data.avg = (totalVotes > 0 ? (totalScore / totalVotes) : stars).toFixed(1);
  data.count = totalVotes;

  ratingsMap[promptId] = data;
  try {
    localStorage.setItem('promptvault_ratings', JSON.stringify(ratingsMap));
  } catch(e){}

  // Also sync rating directly into custom prompt object if user created
  const customP = cachedCustomPrompts.find(p => String(p.id) === String(promptId));
  if (customP) {
    customP.rating = data.avg;
    customP.ratingCount = data.count;
    saveUserPromptAsync(customP).catch(() => {});
  }

  return data;
}

// AI logo map
const AI_LOGOS = {
  chatgpt:    { file: 'logos/chatgpt.jpg',  bg: '#f5f5f5', style: 'border-radius:6px' },
  gemini:     { file: 'logos/gemini.png',   bg: '#fff',    style: '' },
  claude:     { file: 'logos/claude.png',   bg: '#fff',    style: '' },
  deepseek:   { file: 'logos/deepseek.png', bg: '#fff',    style: '' },
  grok:       { file: 'logos/grok.jpg',     bg: '#111',    style: 'border-radius:6px' },
  midjourney: { file: 'logos/chatgpt.jpg',  bg: '#101018', style: 'border-radius:6px' }
};

// ── CATEGORY ENGINE ───────────────────────────────────────────────────────────
const DEFAULT_CATEGORIES = [
  { id: "cat_art", name: "Art & Design", icon: "🎨", gradient: "g3", isDefault: true },
  { id: "cat_photo", name: "Photography", icon: "📸", gradient: "g4", isDefault: true },
  { id: "cat_prog", name: "Programming", icon: "💻", gradient: "g1", isDefault: true },
  { id: "cat_mkt", name: "Marketing", icon: "📢", gradient: "g2", isDefault: true },
  { id: "cat_biz", name: "Business", icon: "💼", gradient: "g5", isDefault: true },
  { id: "cat_write", name: "Writing", icon: "✍️", gradient: "g6", isDefault: true },
  { id: "cat_edu", name: "Education", icon: "🎓", gradient: "g7", isDefault: true },
  { id: "cat_car", name: "Career", icon: "🧳", gradient: "g8", isDefault: true },
  { id: "cat_soc", name: "Social Media", icon: "📱", gradient: "g2", isDefault: true },
  { id: "cat_vid", name: "Video & YouTube", icon: "🎬", gradient: "g5", isDefault: true },
  { id: "cat_prod", name: "Productivity", icon: "📈", gradient: "g1", isDefault: true }
];

let cachedCategories = [...DEFAULT_CATEGORIES];

function getDeletedCategoryIds() {
  try {
    return JSON.parse(localStorage.getItem('promptvault_deleted_categories') || '[]');
  } catch(e) {
    return [];
  }
}

function recordDeletedCategoryId(id) {
  const deleted = getDeletedCategoryIds();
  const strId = String(id);
  if (!deleted.includes(strId)) {
    deleted.push(strId);
    try { localStorage.setItem('promptvault_deleted_categories', JSON.stringify(deleted)); } catch(e){}
  }
}

async function loadAllCategories() {
  let loaded = [];
  const deleted = getDeletedCategoryIds();

  // 1. Primary Source: Cloud Firestore
  if (typeof firestoreGetAllCategories === 'function') {
    try {
      const fsCats = await firestoreGetAllCategories();
      if (Array.isArray(fsCats) && fsCats.length > 0) {
        loaded = fsCats;
      }
    } catch(e){}
  }

  // 2. Try localStorage backup
  if (!loaded.length) {
    try {
      const raw = localStorage.getItem('promptvault_custom_categories');
      if (raw) loaded = JSON.parse(raw);
    } catch(e) {}
  }

  // 3. Fallback: Merge default categories
  if (!loaded.length && !localStorage.getItem('promptvault_categories_initialized')) {
    loaded = [...DEFAULT_CATEGORIES];
    try { localStorage.setItem('promptvault_categories_initialized', 'true'); } catch(e){}
  } else if (!loaded.length) {
    loaded = [...DEFAULT_CATEGORIES];
  }

  cachedCategories = loaded.filter(c => c && !deleted.includes(String(c.id)));
  try {
    localStorage.setItem('promptvault_custom_categories', JSON.stringify(cachedCategories));
  } catch(e) {}

  return cachedCategories;
}

function getAllCategories() {
  const deleted = getDeletedCategoryIds();
  return (cachedCategories || []).filter(c => c && !deleted.includes(String(c.id)));
}

function getCategoryIcon(catName) {
  if (!catName) return '📁';
  const found = getAllCategories().find(c => c.name.toLowerCase() === catName.toLowerCase());
  return found ? found.icon : '📁';
}

async function saveNewCategoryAsync(catObj) {
  if (!catObj || !catObj.name) return false;
  const cleanName = catObj.name.trim();

  // Check duplicate
  const existing = getAllCategories().find(c => c.name.toLowerCase() === cleanName.toLowerCase());
  if (existing) return existing;

  const newCat = {
    id: 'cat_' + Date.now(),
    name: cleanName,
    icon: (catObj.icon && catObj.icon.trim()) || '📁',
    gradient: catObj.gradient || ('g' + (Math.floor(Math.random() * 8) + 1)),
    isDefault: false,
    created_at: Date.now()
  };

  cachedCategories.push(newCat);
  try {
    localStorage.setItem('promptvault_custom_categories', JSON.stringify(cachedCategories));
  } catch(e) {}

  // Save to Cloud Firestore
  if (typeof firestoreSaveCategory === 'function') {
    await firestoreSaveCategory(newCat);
  }

  return newCat;
}

async function deleteCategoryAsync(catId) {
  const strId = String(catId);
  recordDeletedCategoryId(strId);
  cachedCategories = (cachedCategories || []).filter(c => String(c.id) !== strId);
  try {
    localStorage.setItem('promptvault_custom_categories', JSON.stringify(cachedCategories));
  } catch(e) {}

  // Delete from Cloud Firestore
  if (typeof firestoreDeleteCategory === 'function') {
    await firestoreDeleteCategory(strId);
  }

  return true;
}

// ── DYNAMIC RANDOM / SHUFFLE UTILITY ──────────────────────────────────────────
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ── WELCOME SHOWCASE ENGINE (5 Curated Slots) ───────────────────────────────────
let cachedShowcaseIds = [];

async function loadShowcaseIds() {
  let loaded = [];

  // 1. Primary Source: Cloud Firestore
  if (typeof firestoreGetShowcase === 'function') {
    try {
      const fsIds = await firestoreGetShowcase();
      if (Array.isArray(fsIds) && fsIds.length > 0) {
        loaded = fsIds;
      }
    } catch(e){}
  }

  if (!loaded.length) {
    try {
      const raw = localStorage.getItem('promptvault_showcase_ids');
      if (raw) loaded = JSON.parse(raw);
    } catch(e) {}
  }

  if (!loaded.length) {
    const all = getAllPrompts();
    loaded = all.slice(0, 5).map(p => p.id);
  }

  cachedShowcaseIds = loaded;
  try {
    localStorage.setItem('promptvault_showcase_ids', JSON.stringify(cachedShowcaseIds));
  } catch(e) {}

  return cachedShowcaseIds;
}

function getShowcaseIds() {
  return cachedShowcaseIds;
}

function getShowcasePrompts() {
  const all = getAllPrompts();
  const ids = (cachedShowcaseIds && cachedShowcaseIds.length > 0) ? cachedShowcaseIds : all.slice(0, 5).map(p => p.id);
  const list = ids.map(id => all.find(p => String(p.id) === String(id))).filter(Boolean);
  
  // If fewer than 5 curated, backfill from available prompts in database
  if (list.length < 5) {
    for (const p of all) {
      if (!list.some(sp => String(sp.id) === String(p.id))) {
        list.push(p);
        if (list.length === 5) break;
      }
    }
  }

  // If still fewer than 5 (e.g. fresh environment or deleted prompts), backfill from SEED_CUSTOM_PROMPTS
  if (list.length < 5 && typeof SEED_CUSTOM_PROMPTS !== 'undefined') {
    for (const sp of SEED_CUSTOM_PROMPTS) {
      if (!list.some(p => String(p.id) === String(sp.id))) {
        list.push(sp);
        if (list.length === 5) break;
      }
    }
  }

  return list.slice(0, 5);
}

async function saveShowcaseIdsAsync(ids) {
  if (!Array.isArray(ids)) return false;
  cachedShowcaseIds = ids.slice(0, 5);
  try {
    localStorage.setItem('promptvault_showcase_ids', JSON.stringify(cachedShowcaseIds));
  } catch(e) {}

  // Save to Cloud Firestore
  if (typeof firestoreSaveShowcase === 'function') {
    await firestoreSaveShowcase(cachedShowcaseIds);
  }

  return cachedShowcaseIds;
}

// ── DYNAMIC CURATED HOMEPAGE SECTIONS (Swipeable Carousels) ───────────────────
const DEFAULT_SECTIONS = [
  {
    id: 'sec_chatgpt_graphic_design',
    title: '🎨 ChatGPT Graphic Design',
    subtitle: 'Ultra-realistic food photography, commercial ads, bold typography & poster designs',
    filterType: 'ai',
    filterValue: 'chatgpt',
    icon: '🎨',
    badge: 'Graphic Design',
    seoKeyword: 'chatgpt graphic design',
    order: 1,
    enabled: true
  }
];

let cachedSections = [];

function getDeletedSectionIds() {
  try {
    return JSON.parse(localStorage.getItem('promptvault_deleted_sections') || '[]');
  } catch(e) {
    return [];
  }
}

function recordDeletedSectionId(id) {
  const deleted = getDeletedSectionIds();
  const strId = String(id);
  if (!deleted.includes(strId)) {
    deleted.push(strId);
    try { localStorage.setItem('promptvault_deleted_sections', JSON.stringify(deleted)); } catch(e){}
  }
}

function unrecordDeletedSectionId(id) {
  const deleted = getDeletedSectionIds().filter(d => String(d) !== String(id));
  try { localStorage.setItem('promptvault_deleted_sections', JSON.stringify(deleted)); } catch(e){}
}

async function loadAllSections() {
  let loaded = null;
  const deleted = getDeletedSectionIds();

  // 1. Fetch from Cloud Firestore
  if (typeof firestoreGetAllSections === 'function') {
    try {
      const fsSecs = await firestoreGetAllSections();
      if (Array.isArray(fsSecs) && fsSecs.length > 0) {
        loaded = fsSecs;
      }
    } catch(e){
      console.warn("Firestore loadAllSections note:", e);
    }
  }

  // 2. Fetch from localStorage backup
  if (loaded === null) {
    try {
      const raw = localStorage.getItem('promptvault_sections');
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          loaded = parsed;
        }
      }
    } catch(e){}
  }

  // Clean out legacy test templates (sec_gemini, sec_chatgpt, sec_art_design)
  if (Array.isArray(loaded)) {
    loaded = loaded.filter(s => s && s.id !== 'sec_gemini' && s.id !== 'sec_chatgpt' && s.id !== 'sec_art_design');
  }

  // 3. Fallback to default section if empty
  if (!loaded || loaded.length === 0) {
    loaded = [...DEFAULT_SECTIONS];
  }

  cachedSections = loaded.filter(s => s && !deleted.includes(String(s.id))).sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
  try {
    localStorage.setItem('promptvault_sections', JSON.stringify(cachedSections));
  } catch(e){}

  return cachedSections;
}

function getAllSections() {
  const deleted = getDeletedSectionIds();
  if (Array.isArray(cachedSections)) {
    return cachedSections.filter(s => s && !deleted.includes(String(s.id)));
  }
  return [];
}

function getPromptsForSection(sec) {
  const all = getAllPrompts();
  if (!sec) return [];

  const secId = String(sec.id || '').toLowerCase().trim();
  const val = String(sec.filterValue || '').toLowerCase().trim();
  const filterType = sec.filterType || 'ai';

  // 1. Prompts that have this section explicitly ticked in Admin Studio
  const explicitlyTicked = all.filter(p => {
    if (!p.sectionIds || !Array.isArray(p.sectionIds)) return false;
    return p.sectionIds.some(sid => String(sid).toLowerCase() === secId || (sec.id && String(sid) === String(sec.id)));
  });

  // If the admin has explicitly ticked/assigned prompts to this section, show ONLY those!
  if (explicitlyTicked.length > 0) {
    return explicitlyTicked;
  }

  // 2. If NO prompts have been explicitly ticked yet, match strictly on filter criteria without cross-adding
  let filterMatched = [];
  if (filterType === 'ai') {
    filterMatched = all.filter(p => {
      const pAi = (p.ai || '').toLowerCase();
      const pAiName = (p.aiName || '').toLowerCase();
      return pAi === val || pAiName === val;
    });
  } else if (filterType === 'category') {
    filterMatched = all.filter(p => {
      const pCat = (p.cat || '').toLowerCase();
      return pCat === val;
    });
  } else if (filterType === 'tag') {
    filterMatched = all.filter(p => Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase() === val));
  } else if (filterType === 'promptType') {
    filterMatched = all.filter(p => {
      const pType = (p.promptType || '').toLowerCase();
      if (val === 'image') return pType === 'image' || p.customImage || (Array.isArray(p.images) && p.images.length > 0);
      if (val === 'text') return pType === 'text' || (!p.customImage && (!p.images || p.images.length === 0));
      return pType === val;
    });
  }

  return filterMatched;
}

async function saveSectionAsync(secData) {
  if (!secData || !secData.id) return false;
  unrecordDeletedSectionId(secData.id);

  const sections = [...getAllSections()];
  const idx = sections.findIndex(s => String(s.id) === String(secData.id));

  if (idx >= 0) {
    sections[idx] = { ...sections[idx], ...secData };
  } else {
    secData.order = secData.order || (sections.length + 1);
    secData.enabled = secData.enabled !== false;
    sections.push(secData);
  }

  cachedSections = sections.sort((a, b) => (a.order || 0) - (b.order || 0));
  try {
    localStorage.setItem('promptvault_sections', JSON.stringify(cachedSections));
    localStorage.setItem('promptvault_sections_initialized', 'true');
  } catch(e){}

  if (typeof firestoreSaveSection === 'function') {
    await firestoreSaveSection(secData);
  }

  return cachedSections;
}

async function deleteSectionAsync(secId) {
  const strId = String(secId);
  recordDeletedSectionId(strId);

  cachedSections = (cachedSections || []).filter(s => String(s.id) !== strId);
  try {
    localStorage.setItem('promptvault_sections', JSON.stringify(cachedSections));
    localStorage.setItem('promptvault_sections_initialized', 'true');
  } catch(e){}

  if (typeof firestoreDeleteSection === 'function') {
    try {
      await firestoreDeleteSection(strId);
    } catch(e){
      console.warn("Firestore delete section error:", e);
    }
  }

  return true;
}

// Initial load of custom prompts, categories, showcase & sections
loadAllCustomPrompts();
loadAllCategories();
loadShowcaseIds();
loadAllSections();



