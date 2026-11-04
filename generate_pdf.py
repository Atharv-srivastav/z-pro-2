"""
Generate a professional, high-quality, pixel-perfect PDF for Atharv Srivastava's resume
using reportlab.
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.units import inch

def generate_resume(output_path):
    # Set tight professional margins (0.45 inch)
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=32,
        rightMargin=32,
        topMargin=28,
        bottomMargin=28
    )

    styles = getSampleStyleSheet()

    # Color definitions matching designer palette
    COLOR_PRIMARY = colors.HexColor('#1C3334')  # Midnight Pine
    COLOR_TEAL = colors.HexColor('#376E6F')     # Ocean Teal
    COLOR_ROSE = colors.HexColor('#DA7B93')     # Dusty Rose
    COLOR_SLATE = colors.HexColor('#2F4454')    # Slate Navy
    COLOR_TEXT = colors.HexColor('#1a262b')     # Dark Text
    COLOR_MUTED = colors.HexColor('#4a6169')    # Muted Gray

    # Typography styles
    name_style = ParagraphStyle(
        'DocName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        alignment=1,  # Center
        textColor=COLOR_PRIMARY
    )

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        alignment=1,
        textColor=COLOR_TEAL
    )

    contact_style = ParagraphStyle(
        'DocContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        alignment=1,
        textColor=COLOR_MUTED
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=COLOR_PRIMARY,
        spaceBefore=6,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=COLOR_TEXT
    )

    bold_body_style = ParagraphStyle(
        'DocBoldBody',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=COLOR_TEXT
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=COLOR_TEXT,
        leftIndent=12,
        firstLineIndent=-8,
        spaceBefore=1,
        spaceAfter=1
    )

    story = []

    # 1. HEADER
    story.append(Paragraph("ATHARV SRIVASTAVA", name_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Full-Stack Intern &bull; TypeScript &bull; React.js &bull; Node.js &bull; Express.js &bull; REST APIs", title_style))
    story.append(Spacer(1, 3))
    contact_text = (
        "Pune, Maharashtra &nbsp;|&nbsp; +91 8112904561 &nbsp;|&nbsp; "
        "atharvsrivastava8197@gmail.com &nbsp;|&nbsp; "
        "linkedin.com/in/atharv-sriv-01rv &nbsp;|&nbsp; "
        "github.com/Atharv-srivastav"
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1.2, color=COLOR_TEAL, spaceBefore=0, spaceAfter=5))

    # Helper for section headers
    def add_section_header(title):
        story.append(Paragraph(title.upper(), section_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#d6e2e5'), spaceBefore=2, spaceAfter=4))

    # 2. PROFESSIONAL SUMMARY
    add_section_header("Professional Summary")
    summary_text = (
        "B.Tech CSE undergraduate (2029) who builds full-stack TypeScript applications: React 18 and Vite on the front end, "
        "Node.js and Express.js REST APIs on the back end, with unit and integration tests in Vitest. Built a layered, tested "
        "platform with a hybrid LLM and rule-based evaluation pipeline, plus React.js and Bootstrap front ends. Strong in "
        "Data Structures &amp; Algorithms, OOP and DBMS; works with MongoDB, Postman and Git. Uses Claude Code and Cursor as a "
        "daily workflow. Looking to contribute to an early-stage product team."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))

    # 3. TECHNICAL SKILLS
    add_section_header("Technical Skills")
    skills = [
        ("Languages:", "Python, JavaScript (ES6+), TypeScript, C"),
        ("Front-End:", "React.js, Vite, HTML5, CSS3, Bootstrap, Responsive and Mobile-First Design"),
        ("Backend, Databases & APIs:", "Node.js, Express.js, REST APIs, JSON, Postman (API testing), MongoDB (NoSQL)"),
        ("Developer Tools:", "Git, GitHub, VS Code, Vitest"),
        ("Computer Science Core:", "Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks"),
        ("AI & Agentic Tools:", "Claude Code, Cursor, Prompt Engineering, RAG (Retrieval-Augmented Generation), LLM Integration (Google Gemini API), LLM Fundamentals, Machine Learning Basics")
    ]
    for cat, items in skills:
        line = f"&bull; <b>{cat}</b> {items}"
        story.append(Paragraph(line, bullet_style))
    story.append(Spacer(1, 4))

    # 4. PROJECTS
    add_section_header("Projects")
    
    # Project 1
    p1_title = "<b>LLD Practice Platform – Object-Oriented Design Studio</b> | <i>TypeScript, React 18, Vite, Node.js, Express.js, Google Gemini API, Vitest</i>"
    story.append(Paragraph(p1_title, body_style))
    story.append(Paragraph("&bull; Built a full-stack platform where engineers practice Low-Level Design problems and receive instant, explainable scoring on class design, SOLID principles, coupling and design patterns.", bullet_style))
    story.append(Paragraph("&bull; Designed a hybrid evaluation pipeline with the Strategy pattern: deterministic rule-based checks, Gemini LLM semantic review, and an offline fallback evaluator that keeps the platform working when the LLM is unavailable.", bullet_style))
    story.append(Paragraph("&bull; Architected a layered backend (domain, application, infrastructure, REST API) with an attempt lifecycle state machine, live Mermaid UML preview, and unit and integration tests in Vitest.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 2
    p2_title = "<b>Personal Portfolio Website</b> | <i>React.js, JavaScript, CSS</i>"
    story.append(Paragraph(p2_title, body_style))
    story.append(Paragraph("&bull; Built and deployed a component-based React.js portfolio presenting projects, skills and achievements with fully responsive layouts.", bullet_style))
    story.append(Paragraph("&bull; Implemented interactive UI components and direct GitHub and LinkedIn links to make recruiter access fast and simple.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 3
    p3_title = "<b>Zeravia Client Service Portal</b> | <i>HTML5, CSS3, JavaScript, Bootstrap 5</i>"
    story.append(Paragraph(p3_title, body_style))
    story.append(Paragraph("&bull; Built a responsive single-page service portal with a JavaScript-rendered service catalogue, category filters, detail dialogs and an FAQ accordion.", bullet_style))
    story.append(Paragraph("&bull; Implemented client-side form validation, enquiry draft recovery and a saved light/dark theme using localStorage, with accessible labels, landmarks and ARIA state updates.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 4
    p4_title = "<b>Facial Expression Recognition System</b> | <i>Python, Machine Learning</i>"
    story.append(Paragraph(p4_title, body_style))
    story.append(Paragraph("&bull; Developed an emotion detection model in Python using image preprocessing and classification techniques.", bullet_style))
    story.append(Paragraph("&bull; Evaluated the model on held-out test datasets and iterated on it to improve prediction accuracy.", bullet_style))
    story.append(Spacer(1, 4))

    # 5. EDUCATION
    add_section_header("Education")
    
    edu1 = "<b>B.Tech, Computer Science Engineering</b> | Aug 2025 – Aug 2029<br/>Intellipaat School of Technology, D Y Patil University, Pune, Maharashtra<br/><i>Relevant Coursework:</i> Data Structures &amp; Algorithms, OOP, DBMS, Operating Systems, Computer Networks"
    story.append(Paragraph(edu1, body_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("<b>Class XII (CBSE)</b> | Little Flower House, Varanasi | 2024", body_style))
    story.append(Spacer(1, 1))
    story.append(Paragraph("<b>Class X (CBSE)</b> | St. Atulanand Residential Academy, Varanasi | 2022", body_style))
    story.append(Spacer(1, 4))

    # 6. CERTIFICATIONS
    add_section_header("Certifications")
    certs = [
        "Python Essentials &ndash; Cisco Networking Academy",
        "AWS Cloud Foundations &ndash; AWS Training &amp; Certification",
        "Cyber Security Job Simulation &ndash; Deloitte",
        "CSS Certificate &ndash; HackerRank",
        "iHub Rookie Certification &ndash; Data Science and AI"
    ]
    for c in certs:
        story.append(Paragraph(f"&bull; {c}", bullet_style))

    # Build PDF
    doc.build(story)
    print(f"Resume PDF successfully generated at: {output_path}")

if __name__ == '__main__':
    generate_resume('public/resume.pdf')
