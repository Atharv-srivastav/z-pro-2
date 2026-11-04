/**
 * EDITABLE DEVELOPER PORTFOLIO DATA PLACEHOLDERS
 * Update the placeholders below with your personal information, credentials, and achievements.
 */

export const portfolioData = {
  // Personal Information Placeholders
  personal: {
    fullName: "Alex Morgan",
    title: "Senior Full-Stack Developer & Cloud Architect",
    tagline: "Building resilient web applications, modern React ecosystems, and cloud backend solutions.",
    bio: "Passionate software engineer with extensive experience developing distributed systems, responsive frontend interfaces, and scalable API microservices. Focused on performance optimization, clean design patterns, and agile engineering best practices.",
    location: "San Francisco, CA / Remote",
    email: "alex.morgan.dev@example.com",
    phone: "+1 (555) 019-2834",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    resumeUrl: "./resume.pdf", // Downloads local public/resume.pdf
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    yearsExperience: "6+",
    projectsCompleted: "35+",
    happyClients: "20+"
  },

  // About Me Section
  about: {
    heading: "Bridging architectural complexity with intuitive user interfaces.",
    paragraphs: [
      "I am a full-stack engineer who thrives at the intersection of robust backend systems and reactive, high-performance web frontends. With a strong grounding in Computer Science and modern engineering methodologies, I design end-to-end applications that prioritize security, accessibility, and high maintainability.",
      "My engineering philosophy revolves around declarative programming, component-driven UI architecture, strict type safety, and automated CI/CD deployment pipelines."
    ],
    highlights: [
      { label: "Role", value: "Senior Full-Stack Developer" },
      { label: "Availability", value: "Open for Opportunities" },
      { label: "Degree", value: "B.S. in Computer Science" },
      { label: "Focus", value: "React, Node.js, Cloud APIs" }
    ]
  },

  // Education Section Placeholders
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Computer Science",
      institution: "State University of Technology",
      period: "2018 - 2022",
      grade: "GPA: 3.85 / 4.0 (Dean's List)",
      description: "Specialized in Software Engineering, Data Structures & Algorithms, Distributed Systems, and Human-Computer Interaction. Completed capstone project in cloud microservices."
    },
    {
      id: "edu-2",
      degree: "Associate of Science in Web & Information Systems",
      institution: "Metropolitan Technical College",
      period: "2016 - 2018",
      grade: "Honors Graduate",
      description: "Focused on frontend development, relational database modeling, network protocols, and client-server architectures."
    }
  ],

  // Technical Skills Section Placeholders
  skills: [
    {
      category: "Frontend Development",
      items: ["React.js", "JavaScript (ES6+)", "TypeScript", "HTML5 & CSS3", "Vite", "Tailwind CSS", "Redux Toolkit", "Next.js"]
    },
    {
      category: "Backend & Databases",
      items: ["Node.js", "Express.js", "Python", "Google Apps Script", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"]
    },
    {
      category: "DevOps & Cloud Tools",
      items: ["Git & GitHub Actions", "Docker", "AWS (S3, Lambda)", "Google Cloud", "CI/CD Pipelines", "Vercel", "Linux / Bash", "Jest & Vitest"]
    }
  ],

  // Experience Section Placeholders
  experience: [
    {
      id: "exp-1",
      role: "Senior Full-Stack Engineer",
      company: "Apex Cloud Innovations",
      period: "2023 - Present",
      location: "San Francisco, CA",
      responsibilities: [
        "Architected scalable micro-frontend applications serving over 150,000 monthly active users.",
        "Integrated Google Cloud and serverless webhooks, reducing background task execution latency by 38%.",
        "Mentored junior developers, conducted rigorous PR code reviews, and enforced automated testing standards."
      ],
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"]
    },
    {
      id: "exp-2",
      role: "Frontend Developer",
      company: "Nexus Digital Agency",
      period: "2021 - 2023",
      location: "Austin, TX",
      responsibilities: [
        "Developed custom high-conversion single page applications with responsive cross-browser compatibility.",
        "Engineered reusable component design systems and streamlined asset bundling with Vite and Webpack.",
        "Collaborated with UX designers to achieve WCAG 2.1 AA accessibility compliance across all digital client assets."
      ],
      technologies: ["JavaScript", "React", "CSS3", "REST APIs", "Git", "Figma"]
    },
    {
      id: "exp-3",
      role: "Junior Web Developer",
      company: "Crestview Software Solutions",
      period: "2019 - 2021",
      location: "Remote",
      responsibilities: [
        "Implemented customer feedback dashboards and automated spreadsheet sync scripts.",
        "Built responsive web forms with robust client-side and server-side validation routines.",
        "Authored developer documentation and technical onboarding guides."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Google Apps Script", "PHP"]
    }
  ],

  // Projects Section Placeholders
  projects: [
    {
      id: "proj-1",
      title: "Enterprise Contact Manager SPA",
      tagline: "Real-time reactive contact management system built with React 18, state management, and instant dynamic card rendering.",
      technologies: ["React 18", "JavaScript ES6+", "CSS3 Variables", "Vite"],
      demoUrl: "#contact-manager-preview",
      githubUrl: "https://github.com",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80"
    },
    {
      id: "proj-2",
      title: "Cloud Sheet API Engine",
      tagline: "Serverless bridge linking web client forms directly to Google Sheets with formula injection sanitization and session security.",
      technologies: ["Google Apps Script", "JavaScript", "RESTful Routing", "Spreadsheet API"],
      demoUrl: "#admin-preview",
      githubUrl: "https://github.com",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80"
    },
    {
      id: "proj-3",
      title: "Interactive Card Showcase",
      tagline: "Modular component architecture demonstrating decoupled state handling, props drilling prevention, and like/unlike card dynamics.",
      technologies: ["React Hooks", "Modular CSS", "UI/UX Micro-Interactions"],
      demoUrl: "#contact-manager-preview",
      githubUrl: "https://github.com",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=700&q=80"
    }
  ],

  // Certifications Section Placeholders
  certifications: [
    {
      id: "cert-1",
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-PSA-982341",
      verifyUrl: "https://aws.amazon.com/verification"
    },
    {
      id: "cert-2",
      title: "Meta Certified Front-End Developer",
      issuer: "Meta / Coursera",
      date: "2022",
      credentialId: "META-FE-554190",
      verifyUrl: "https://coursera.org"
    },
    {
      id: "cert-3",
      title: "Professional Scrum Master I (PSM I)",
      issuer: "Scrum.org",
      date: "2022",
      credentialId: "SM-8812940",
      verifyUrl: "https://scrum.org"
    },
    {
      id: "cert-4",
      title: "Google Cloud Associate Cloud Engineer",
      issuer: "Google Cloud",
      date: "2021",
      credentialId: "GCP-ACE-772183",
      verifyUrl: "https://cloud.google.com"
    }
  ]
};
