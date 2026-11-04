/**
 * ATHARV SRIVASTAVA - DEVELOPER PORTFOLIO DATA
 * Updated from verified resume details
 */

export const portfolioData = {
  // Personal Information
  personal: {
    fullName: "Atharv Srivastava",
    title: "Full-Stack Intern | TypeScript • React.js • Node.js • Express.js • REST APIs",
    tagline: "B.Tech CSE undergraduate who builds full-stack TypeScript applications with React 18, Vite, and Node.js REST APIs.",
    bio: "Passionate software engineer experienced in layered architectures, hybrid LLM evaluation pipelines, and unit/integration testing in Vitest. Strong in Data Structures & Algorithms, OOP, and DBMS. Uses Claude Code and Cursor as a daily workflow, looking to contribute to an early-stage product team.",
    location: "Pune, Maharashtra, India",
    email: "atharvsrivastava8197@gmail.com",
    phone: "+91 8112904561",
    profileImage: "./images/profile.jpg",
    resumeUrl: "./resume.pdf",
    githubUrl: "https://github.com/Atharv-srivastav",
    linkedinUrl: "https://linkedin.com/in/atharv-sriv-01rv",
    stat1Number: "2029",
    stat1Label: "Graduation",
    stat2Number: "4+",
    stat2Label: "Projects",
    stat3Number: "100%",
    stat3Label: "Commitment"
  },

  // About Me Section
  about: {
    heading: "Engineering layered, resilient full-stack systems and agentic AI integrations.",
    paragraphs: [
      "I am a Computer Science Engineering undergraduate at D Y Patil University with a passion for architecting end-to-end full-stack applications. My focus spans reactive frontend design with React 18 & Vite, scalable Node.js and Express backend architectures, and rigorous testing with Vitest.",
      "I have hands-on experience designing hybrid evaluation pipelines (combining deterministic rules and Google Gemini LLMs with offline fallbacks), object-oriented system modeling (SOLID principles, Strategy pattern), and database schemas in MongoDB. Daily workflow revolves around Git, Claude Code, Cursor, and Postman."
    ],
    highlights: [
      { label: "Role", value: "Full-Stack Intern / Developer" },
      { label: "Availability", value: "Ready for Product Roles" },
      { label: "Degree", value: "B.Tech CSE (2025 - 2029)" },
      { label: "Core Stack", value: "React, Node.js, TypeScript" }
    ]
  },

  // Education Section
  education: [
    {
      id: "edu-1",
      degree: "B.Tech, Computer Science Engineering",
      institution: "Intellipaat School of Technology, D Y Patil University, Pune, Maharashtra",
      period: "Aug 2025 – Aug 2029",
      grade: "Undergraduate",
      description: "Relevant Coursework: Data Structures & Algorithms, OOP, Database Management Systems (DBMS), Operating Systems, Computer Networks."
    },
    {
      id: "edu-2",
      degree: "Class XII (CBSE)",
      institution: "Little Flower House, Varanasi",
      period: "2024",
      grade: "Completed",
      description: "Senior secondary schooling focusing on Physics, Chemistry, Mathematics, and Computer Science."
    },
    {
      id: "edu-3",
      degree: "Class X (CBSE)",
      institution: "St. Atulanand Residential Academy, Varanasi",
      period: "2022",
      grade: "Completed",
      description: "Foundational education in sciences, mathematics, and logical computing."
    }
  ],

  // Technical Skills Section
  skills: [
    {
      category: "Programming Languages",
      items: ["TypeScript", "JavaScript (ES6+)", "Python", "C"]
    },
    {
      category: "Front-End Development",
      items: ["React.js", "Vite", "HTML5", "CSS3", "Bootstrap", "Responsive & Mobile-First Design"]
    },
    {
      category: "Backend, Databases & APIs",
      items: ["Node.js", "Express.js", "REST APIs", "JSON", "MongoDB (NoSQL)", "Postman (API Testing)"]
    },
    {
      category: "Developer Tools & Testing",
      items: ["Git", "GitHub", "VS Code", "Vitest", "Cursor", "Claude Code"]
    },
    {
      category: "Computer Science Core",
      items: ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "DBMS", "Operating Systems", "Computer Networks"]
    },
    {
      category: "AI & Agentic Tools",
      items: ["Prompt Engineering", "RAG (Retrieval-Augmented Generation)", "Google Gemini API", "LLM Fundamentals", "Machine Learning Basics"]
    }
  ],

  // Experience Section
  experience: [
    {
      id: "exp-1",
      role: "Full-Stack Developer & Software Architect",
      company: "Zeravia Projects",
      period: "2024 - Present",
      location: "Pune, Maharashtra",
      responsibilities: [
        "Architected and implemented responsive Single Page Applications using React 18, Vite, and modern CSS custom property themes.",
        "Integrated serverless Google Apps Script backends and cloud spreadsheets with CSV formula sanitization and session security.",
        "Engineered automated CI/CD pipelines with GitHub Actions for automated zero-downtime static deployments."
      ],
      technologies: ["React 18", "TypeScript", "Node.js", "Google Apps Script", "Vitest", "Git"]
    },
    {
      id: "exp-2",
      role: "Software Engineering Project Intern",
      company: "Academic & Open-Source Initiatives",
      period: "2023 - 2024",
      location: "Pune, India",
      responsibilities: [
        "Constructed low-level design evaluation pipelines applying the Strategy pattern and Gemini LLM semantic feedback.",
        "Developed full-stack REST API prototypes with Express.js and automated unit testing in Vitest.",
        "Authored developer documentation, class diagrams, and state machines using Mermaid UML."
      ],
      technologies: ["TypeScript", "Express.js", "Gemini API", "Postman", "MongoDB"]
    }
  ],

  // Projects Section
  projects: [
    {
      id: "proj-1",
      title: "LLD Practice Platform – Object-Oriented Design Studio",
      tagline: "Full-stack platform where engineers practice Low-Level Design problems and receive instant, explainable scoring on class design, SOLID principles, and design patterns.",
      technologies: ["TypeScript", "React 18", "Vite", "Node.js", "Express.js", "Google Gemini API", "Vitest"],
      demoUrl: "https://github.com/Atharv-srivastav",
      githubUrl: "https://github.com/Atharv-srivastav",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80"
    },
    {
      id: "proj-2",
      title: "Personal Portfolio & Contact Manager SPA",
      tagline: "Component-based React.js portfolio presenting projects, skills and achievements with dynamic contact management and Google Sheets database integration.",
      technologies: ["React.js", "Vite", "JavaScript ES6+", "Google Apps Script", "CSS3 Themes"],
      demoUrl: "#contact-manager-preview",
      githubUrl: "https://github.com/Atharv-srivastav",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80"
    },
    {
      id: "proj-3",
      title: "Zeravia Client Service Portal",
      tagline: "Responsive single-page service portal with JavaScript-rendered service catalogue, category filters, detail dialogs, enquiry draft recovery, and dark/light mode.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "LocalStorage"],
      demoUrl: "https://github.com/Atharv-srivastav",
      githubUrl: "https://github.com/Atharv-srivastav",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=700&q=80"
    },
    {
      id: "proj-4",
      title: "Facial Expression Recognition System",
      tagline: "Emotion detection model in Python using image preprocessing and classification techniques evaluated on held-out test datasets.",
      technologies: ["Python", "Machine Learning", "Image Preprocessing", "Data Evaluation"],
      demoUrl: "https://github.com/Atharv-srivastav",
      githubUrl: "https://github.com/Atharv-srivastav",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=700&q=80"
    }
  ],

  // Certifications Section
  certifications: [
    {
      id: "cert-1",
      title: "Python Essentials",
      issuer: "Cisco Networking Academy",
      date: "Verified",
      credentialId: "CISCO-PY-ESSENTIALS",
      verifyUrl: "https://www.netacad.com"
    },
    {
      id: "cert-2",
      title: "AWS Cloud Foundations",
      issuer: "AWS Training & Certification",
      date: "Verified",
      credentialId: "AWS-CLOUD-FOUNDATIONS",
      verifyUrl: "https://aws.amazon.com/training/"
    },
    {
      id: "cert-3",
      title: "Cyber Security Job Simulation",
      issuer: "Deloitte",
      date: "Verified",
      credentialId: "DELOITTE-CYBER-SIM",
      verifyUrl: "https://www.forage.com"
    },
    {
      id: "cert-4",
      title: "CSS Certificate",
      issuer: "HackerRank",
      date: "Verified",
      credentialId: "HACKERRANK-CSS-CERT",
      verifyUrl: "https://www.hackerrank.com"
    },
    {
      id: "cert-5",
      title: "iHub Rookie Certification – Data Science and AI",
      issuer: "iHub",
      date: "Verified",
      credentialId: "IHUB-ROOKIE-DS-AI",
      verifyUrl: "https://ihub.co"
    }
  ]
};
