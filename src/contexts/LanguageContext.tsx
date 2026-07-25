import React, { createContext, useContext, useState, useEffect } from "react";

export type Lang = "en" | "fa";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
  dir: "ltr",
});

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.resume": "Resume",
    "nav.hire": "Start cooperating",

    // Footer
    "footer.tagline":
      "Frontend Developer specializing in React, Next.js and TypeScript. Crafting modern digital experiences.",
    "footer.quicklinks": "Quick Links",
    "footer.connect": "Connect",
    "footer.rights": "Helen Langari. Built with",
<<<<<<< HEAD
=======
    "footer.status": " Available for opportunities",
>>>>>>> c07ddef9104b696d265dc6e531a6ef03aef09797

    // Home
    "home.available": "Available for opportunities",
    "home.name": "Helen Langari",
    "home.hello": "Hello, I'm",
    "home.role": "Frontend Developer",
    "home.intro": "Specializing in",
    "home.intro2": "and",
    "home.intro3":
      ". Building modern, performant and beautiful web interfaces at",
    "home.viewProjects": "View Projects",
    "home.getInTouch": "Get In Touch",
    "home.resume": "Resume",
    "home.yearsExp": "Years Experience",
    "home.projects": "Projects Built",
    "home.passion": "Passion",
    "home.cleanCode": "Clean Code",
    "home.cleanCodeDesc": "Scalable & maintainable architecture",
    "home.modernStack": "Modern Stack",
    "home.modernStackDesc": "React, TypeScript, Next.js",
    "home.performance": "Performance",
    "home.performanceDesc": "Optimized for speed & UX",
    "home.currentStatus": "Current Status",
    "home.currentRole": "Frontend Dev @ Webcore",
    "home.ageExp": "18 y/o · + 3 years experience",
    "home.cta": "Let's build something",
    "home.ctaHighlight": "amazing",
    "home.ctaTail": "together",
    "home.ctaDesc":
      "I'm currently open to new opportunities and collaborations.",
    "home.ctaBtn": "Start a Conversation",
    "home.skillsTitle": "Technical",
    "home.advanced": "Advanced",
    "home.expert": "Expert",
    "home.intermediate": "Intermediate",

    // About
    "about.badge": "// about.tsx",
    "about.title": "About",
    "about.highlight": "Helen",
    "about.p1": "I'm",
    "about.name": "Helen Langari",
    "about.p1tail":
      ", an 18-year-old Frontend Developer with a deep passion for crafting beautiful, functional, and user-centered web experiences.",
    "about.p2": "With",
    "about.exp": "3 years of professional experience",
    "about.p2mid": "at",
    "about.webcore": "Webcore",
    "about.p2tail":
      ", I've grown from a curious beginner to a developer who thrives on solving complex UI challenges using modern technologies like React, Next.js, and TypeScript.",
    "about.p3":
      "What drives me is the intersection of design and engineering — where clean code meets exceptional user experience. I believe that great frontends aren't just about functionality; they're about making users feel something.",
    "about.age": "Age",
    "about.ageVal": "18 years old",
    "about.location": "Location",
    "about.locationVal": "Iran",
    "about.company": "Company",
    "about.experience": "Experience",
    "about.expVal": "3 years",
    "about.mySkills": "My Skills",
    "about.viewProjects": "View Projects",
    "about.devProfile": "// developer.profile",
    "about.passionDriven": "Passion-driven",
    "about.passionDesc": "Every pixel matters",
    "about.professional": "Professional",
    "about.professionalDesc": "3 years at Webcore",
    "about.selfLearner": "Self-learner",
    "about.selfLearnerDesc": "Always improving",
    "about.interests": "// interests[]",
    "about.journey.badge": "// journey.timeline",
    "about.journey.title": "My",
    "about.journey.highlight": "Journey",
    "about.journey.subtitle":
      "From curious beginner to professional developer in 3 years.",

    // Timeline
    "timeline.t1.year": "2024 — Present",
    "timeline.t1.title": "Mid-level Frontend Developer",
    "timeline.t1.org": "Webcore",
    "timeline.t1.desc":
      "Leading UI development for complex web applications. Architecting scalable React component libraries and mentoring junior developers on TypeScript best practices.",
    "timeline.t2.year": "2024",
    "timeline.t2.title": "Frontend Developer",
    "timeline.t2.org": "Webcore",
    "timeline.t2.desc":
      "Developed and maintained multiple client-facing web applications. Implemented responsive designs, API integrations, and performance optimizations using React and TypeScript.",
    "timeline.t3.year": "2024",
    "timeline.t3.title": "Junior Frontend Developer",
    "timeline.t3.org": "Webcore",
    "timeline.t3.desc":
      "Started professional journey at Webcore. Worked on building UI components, fixing bugs, and learning best practices for modern web development.",
    "timeline.t4.year": "2024",
    "timeline.t4.title": "Self-taught React & TypeScript",
    "timeline.t4.desc":
      "Deep-dived into React ecosystem, TypeScript, and modern JavaScript. Built personal projects to solidify understanding of frontend architecture.",
    "timeline.t5.year": "2023",
    "timeline.t5.title": "Started Coding Journey",
    "timeline.t5.desc":
      "At age 15, discovered a passion for web development. Started with HTML, CSS, and JavaScript fundamentals, building small projects to learn.",

    // Skills
    "skills.badge": "// skills.tsx",
    "skills.title": "Technical",
    "skills.highlight": "Skills",
    "skills.subtitle":
      "3 years of hands-on experience building real-world applications.",
    "skills.frontend": "Frontend Frameworks",
    "skills.styling": "Styling & Design",
    "skills.tools": "Tools & Workflow",
    "skills.react.desc":
      "Hooks, Context API, performance optimization, custom libraries",
    "skills.nextjs.desc": "App Router, SSR/SSG, API routes, SEO optimization",
    "skills.ts.desc": "Advanced types, generics, strict mode, type-safe APIs",
    "skills.tailwind.desc":
      "Custom design systems, responsive layouts, component variants",
    "skills.css.desc":
      "Animations, grid systems, CSS variables, BEM methodology",
    "skills.framer.desc":
      "Page transitions, micro-animations, gesture-based interactions",
    "skills.git.desc": "Branching strategies, PRs, code review, CI/CD basics",
    "skills.api.desc": "REST APIs, React Query, Axios, error handling, caching",
    "skills.testing.desc": " React Testing Library, component and unit testing",
    "skills.stack.badge": "// tools.used",
    "skills.stack.title": "Tech",
    "skills.stack.highlight": "Stack",
    "skills.stack.subtitle": "Tools and technologies I work with daily.",
    "skills.soft.title": "Beyond the Code",
    "skills.ps": "Problem Solving",
    "skills.ps.desc": "Breaking down complex challenges into elegant solutions",
    "skills.tc": "Team Collaboration",
    "skills.tc.desc": "Effective communication and constructive code reviews",
    "skills.fl": "Fast Learner",
    "skills.fl.desc": "Adapting quickly to new technologies and requirements",
    "skills.ad": "Attention to Detail",
    "skills.ad.desc": "Pixel-perfect implementations and clean codebases",
    "skills.sm": "Self-motivated",
    "skills.sm.desc": "Driven by curiosity and continuous improvement",
    "skills.ue": "User Empathy",
    "skills.ue.desc": "Always thinking from the user's perspective first",

    // Projects
    "projects.badge": "// projects.tsx",
    "projects.title": "Featured",
    "projects.highlight": "Projects",
    "projects.subtitle":
      "Real-world applications built with modern technologies — each with unique challenges and solutions.",
    "projects.details.badge": "// project.details",
    "projects.details.title": "Project",
    "projects.details.highlight": "Deep Dives",
    "projects.details.subtitle":
      "The story behind each project: challenges, decisions, and outcomes.",
    "projects.challenge": "// challenge",
    "projects.outcome": "// outcome",
    "projects.viewLive": "View Live",
    "projects.featured": "Featured",

    "proj.arch.title": "Architecture Website",
    "proj.arch.desc":
      "A sleek and modern website for an architecture firm, featuring project showcases, portfolio galleries, and a clean aesthetic that reflects architectural precision.",
    "proj.arch.long":
      "Built with React and Tailwind CSS, this project showcases an architecture firm's portfolio with smooth animations, a custom image gallery, and a contact form. The design language was carefully chosen to mirror architectural principles: clean lines, whitespace, and bold typography.",
    "proj.arch.challenge":
      "Creating smooth page transitions while maintaining performance across large media files.",
    "proj.arch.outcome":
      "Delivered a fast, responsive portfolio site with 98 Lighthouse performance score.",

    "proj.digi.title": "DigiSeda",
    "proj.digi.desc":
      "A full-featured digital marketplace and e-commerce platform with product listings, shopping cart, user authentication, and a clean checkout experience.",
    "proj.digi.long":
      "DigiSeda is a comprehensive e-commerce solution built with Next.js and TypeScript. Features include product catalog, search and filter, shopping cart with localStorage persistence, and a checkout flow. API integration with a custom backend powers the product data.",
    "proj.digi.challenge":
      "Managing complex state across product filters, cart, and checkout while keeping bundle size minimal.",
    "proj.digi.outcome":
      "Built a scalable e-commerce foundation with smooth UX and optimized performance.",

    "proj.cine.title": "Cinemapedia",
    "proj.cine.desc":
      "A cinematic movie discovery app powered by TMDB API, featuring trending movies, search, genre filters, detailed movie pages, and a watchlist feature.",
    "proj.cine.long":
      "Cinemapedia integrates with The Movie Database (TMDB) API to provide a rich movie discovery experience. Users can browse trending content, search by title, filter by genre, and save favorites to a personal watchlist using localStorage.",
    "proj.cine.challenge":
      "Handling async data fetching, pagination, and real-time search with debouncing efficiently.",
    "proj.cine.outcome":
      "Delivered a fluid movie discovery experience with instant search and infinite scroll.",

    // Experience
    "exp.badge": "// experience.tsx",
    "exp.title": "Work",
    "exp.highlight": "Experience",
    "exp.subtitle": "3 years of professional frontend development at Webcore.",
    "exp.role": "Frontend Developer",
    "exp.company": "Webcore",
    "exp.type": "Full-time",
    "exp.period": "2024 — Present",
    "exp.active": "Active",
    "exp.y2022": "2023",
    "exp.role2022": "Junior Frontend Dev",
    "exp.desc2022":
      "Started with component building and bug fixes. Learned the Webcore tech stack.",
    "exp.y2023": "2024",
    "exp.role2023": "Frontend Developer",
    "exp.desc2023":
      "Took ownership of full feature development. Led multiple client project UIs.",
    "exp.y2024": "2025–Now",
    "exp.role2024": "Mid-level Developer",
    "exp.desc2024":
      "Architecting scalable solutions, reviewing code, and mentoring teammates.",
    "exp.responsibilities": "// responsibilities[]",
    "exp.technologies": "// technologies.used",
    "exp.r1":
      "Built and maintained React/Next.js applications for multiple client projects",
    "exp.r2":
      "Developed reusable component libraries aligned with design systems",
    "exp.r3":
      "Collaborated with designers to implement pixel-perfect responsive UIs",
    "exp.r4":
      "Integrated third-party APIs and backend services using REST and GraphQL",
    "exp.r5": "Participated in code reviews and pair programming sessions",
    "exp.r6": "Optimized web performance, reducing load times by up to 40%",
    "exp.r7": "Wrote unit and integration tests using React Testing Library",
    "exp.r8":
      "Mentored junior team members on React and TypeScript best practices",
    "exp.h1.title": "10+ Projects Delivered",
    "exp.h1.desc":
      "Successfully shipped production-ready applications for diverse clients.",
    "exp.h2.title": "Performance Champion",
    "exp.h2.desc":
      "Consistently achieved 90+ Lighthouse scores across all projects.",
    "exp.h3.title": "Collaborative Developer",
    "exp.h3.desc":
      "Participated in agile teams, code reviews, and cross-functional collaboration.",
    "exp.h4.title": "Fast Iteration",
    "exp.h4.desc":
      "Known for rapid prototyping and quick delivery without compromising quality.",
    "exp.award.title": "3 Years of",
    "exp.award.highlight": "Professional Growth",
    "exp.award.desc":
      "Starting at 15 and growing into a mid-level developer by 18 — it's been a journey of continuous learning, real challenges, and genuine passion for building great web experiences.",

    // Contact
    "contact.badge": "// contact.tsx",
    "contact.title": "Get In",
    "contact.highlight": "Touch",
    "contact.subtitle":
      "I'm always open to new opportunities, collaborations, or just a chat about tech.",
    "contact.letsBuild": "Let's build something great",
    "contact.desc":
      "Whether you have a project in mind, a job opportunity, or just want to connect — I'd love to hear from you. I typically respond within 24 hours.",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.location": "Location",
    "contact.locationVal": "Iran · Remote Available",
    "contact.follow": "// follow.me",
    "contact.available": "Available for opportunities",
    "contact.availableDesc": "Open to full-time, freelance & remote work",
    "contact.send": "// send_message()",
    "contact.name": "Name",
    "contact.namePh": "Your name",
    "contact.emailLabel": "Email",
    "contact.emailPh": "your@email.com",
    "contact.subject": "Subject",
    "contact.subjectPh": "Select a subject",
    "contact.job": "Job Opportunity",
    "contact.freelance": "Freelance Project",
    "contact.collab": "Collaboration",
    "contact.other": "Other",
    "contact.message": "Message",
    "contact.messagePh": "Tell me about your project or opportunity...",
    "contact.sendBtn": "Send Message",
    "contact.required": "Please fill in all required fields.",
    "contact.success": "Message sent! I'll get back to you soon.",
    "contact.sent": "Message Sent!",
    "contact.sentDesc": "Thanks for reaching out. I'll reply within 24 hours.",
    "contact.sendAnother": "Send Another",

    // Resume
    "resume.badge": "// resume.pdf",
    "resume.title": "My",
    "resume.highlight": "Resume",
    "resume.subtitle":
      "Professional overview of experience, skills, and projects.",
    "resume.download": "Download PDF",
    "resume.downloadFull": "Download Full Resume (PDF)",
    "resume.toast": "Resume PDF download would be triggered here.",
    "resume.name": "Helen Langari",
    "resume.jobTitle": "Frontend Developer",
    "resume.bio":
      "18-year-old Frontend Developer with 3 years of professional experience. Specializing in React, Next.js, and TypeScript. Passionate about building modern, performant, and user-centric web interfaces.",
    "resume.workExp": "Work Experience",
    "resume.techSkills": "Technical Skills",
    "resume.notableProjects": "Notable Projects",
    "resume.frameworks": "frameworks",
    "resume.styling": "styling",
    "resume.tools": "tools",
    "resume.other": "other",
    "resume.r1.role": "Mid-level Frontend Developer",
    "resume.r1.period": "2024 — Present",
    "resume.r1.p1": "Lead UI architecture for multiple production applications",
    "resume.r1.p2":
      "Mentor junior developers on React and TypeScript best practices",
    "resume.r1.p3": "Optimize performance achieving 90+ Lighthouse scores",
    "resume.r3.role": "Junior Frontend Developer",
    "resume.r3.period": "2023  ",
    "resume.r3.p1":
      "Developed reusable UI components aligned with design systems",
    "resume.r3.p2": "Participated in code reviews and agile sprint planning",
    "resume.r3.p3": "Learned and applied TypeScript and modern React patterns",

    // 404
    "404.error": "error 404",
    "404.terminal": "terminal",
    "404.navigate": "$ navigate to",
    "404.notFound": "✗ Error: Page not found",
    "404.moved": "The page you're looking for doesn't exist or has been moved.",
    "404.desc":
      "Looks like you wandered off the map. Let's get you back on track.",
    "404.home": "Back to Home",
    "404.goBack": "Go Back",
  },

  fa: {
    // Navbar
    "nav.home": "خانه",
    "nav.about": "درباره من",
    "nav.skills": "مهارت‌ها",
    "nav.projects": "پروژه‌ها",
    "nav.experience": "تجربه",
    "nav.contact": "تماس",
    "nav.resume": "رزومه",
    "nav.hire": "شروع همکاری",

    // Footer
    "footer.tagline":
      "توسعه‌دهنده فرانت‌اند متخصص در React، Next.js و TypeScript. سازنده تجربیات دیجیتال مدرن.",
    "footer.quicklinks": "لینک‌های سریع",
    "footer.connect": "ارتباط",
<<<<<<< HEAD
    "footer.rights": "هلن لنگری. ساخته شده با  ",
=======
    "footer.rights": "هلن لنگری. ساخته شده با",
    "footer.status": " آماده فرصت‌های جدید",
>>>>>>> c07ddef9104b696d265dc6e531a6ef03aef09797

    // Home
    "home.available": "آماده همکاری",
    "home.hello": "سلام، من",
    "home.name": "هلن لنگری",
    // "about.name": "هلن لنگری",
    "home.role": "توسعه‌دهنده فرانت‌اند",
    "home.intro": "متخصص در",
    "home.intro2": "و",
    "home.intro3": ". سازنده رابط‌های کاربری مدرن، سریع و زیبا در شرکت",
    "home.viewProjects": "مشاهده پروژه‌ها",
    "home.getInTouch": "تماس با من",
    "home.resume": "رزومه",
    "home.yearsExp": "سال تجربه",
    "home.projects": "پروژه ساخته‌شده",
    "home.passion": "اشتیاق",
    "home.cleanCode": "کد تمیز",
    "home.cleanCodeDesc": "معماری مقیاس‌پذیر و قابل نگهداری",
    "home.modernStack": "استک مدرن",
    "home.modernStackDesc": "React، TypeScript، Next.js",
    "home.performance": "عملکرد",
    "home.performanceDesc": "بهینه‌شده برای سرعت و تجربه کاربری",
    "home.currentStatus": "وضعیت فعلی",
    "home.currentRole": "توسعه‌دهنده فرانت‌اند در وبکور",
    "home.ageExp": "۱۸ ساله · + ۳ سال تجربه",
    "home.cta": "بیایید چیزی",
    "home.ctaHighlight": "فوق‌العاده",
    "home.ctaTail": "بسازیم",
    "home.ctaDesc":
      "در حال حاضر برای همکاری‌های جدید و فرصت‌های شغلی آماده‌ام.",
    "home.ctaBtn": "شروع گفتگو",
    "home.skillsTitle": "مهارت‌های",
    "home.advanced": "پیشرفته",
    "home.expert": "متخصص",
    "home.intermediate": "متوسط",

    // About
    "about.badge": "// about.tsx",
    "about.title": "درباره",
    "about.highlight": "هلن",
    "about.p1": "من",
    "about.name": "هلن لنگری",
    "about.p1tail":
      "، توسعه‌دهنده فرانت‌اند ۱۸ ساله با علاقه عمیق به ساخت تجربیات وب زیبا، کارکردی و کاربرمحور هستم.",
    "about.p2": "با",
    "about.exp": "۳ سال تجربه حرفه‌ای",
    "about.p2mid": "در شرکت",
    "about.webcore": "وبکور",
    "about.p2tail":
      "، از یک مبتدی کنجکاو به توسعه‌دهنده‌ای تبدیل شده‌ام که در حل چالش‌های پیچیده UI با فناوری‌های مدرن مثل React، Next.js و TypeScript می‌درخشد.",
    "about.p3":
      "آنچه مرا پیش می‌برد، تلاقی طراحی و مهندسی است — جایی که کد تمیز با تجربه کاربری استثنایی ملاقات می‌کند.",
    "about.age": "سن",
    "about.ageVal": "۱۸ سال",
    "about.location": "موقعیت",
    "about.locationVal": "ایران",
    "about.company": "شرکت",
    "about.experience": "تجربه",
    "about.expVal": "۳ سال",
    "about.mySkills": "مهارت‌های من",
    "about.viewProjects": "مشاهده پروژه‌ها",
    "about.devProfile": "// developer.profile",
    "about.passionDriven": "علاقه‌محور",
    "about.passionDesc": "هر پیکسل مهم است",
    "about.professional": "حرفه‌ای",
    "about.professionalDesc": "۳ سال در وبکور",
    "about.selfLearner": "خودآموز",
    "about.selfLearnerDesc": "همیشه در حال بهتر شدن",
    "about.interests": "// interests[]",
    "about.journey.badge": "// journey.timeline",
    "about.journey.title": "مسیر",
    "about.journey.highlight": "من",
    "about.journey.subtitle":
      "از مبتدی کنجکاو تا توسعه‌دهنده حرفه‌ای در ۳ سال.",

    // Timeline
    "timeline.t1.year": "1403 — اکنون",
    "timeline.t1.title": "توسعه‌دهنده فرانت‌اند ارشد",
    "timeline.t1.org": "وبکور",
    "timeline.t1.desc":
      "رهبری توسعه UI برای اپلیکیشن‌های پیچیده. معماری کتابخانه‌های کامپوننت React و راهنمایی توسعه‌دهندگان جونیور در TypeScript.",
    "timeline.t2.year": "1402",
    "timeline.t2.title": "توسعه‌دهنده فرانت‌اند",
    "timeline.t2.org": "وبکور",
    "timeline.t2.desc":
      "توسعه و نگهداری چندین اپلیکیشن وب مشتری‌محور. پیاده‌سازی طراحی‌های ریسپانسیو، یکپارچه‌سازی API و بهینه‌سازی عملکرد.",
    "timeline.t3.year": "1402",
    "timeline.t3.title": "توسعه‌دهنده فرانت‌اند جونیور",
    "timeline.t3.org": "وبکور",
    "timeline.t3.desc":
      "شروع مسیر حرفه‌ای در وبکور. ساخت کامپوننت‌های UI، رفع باگ و یادگیری بهترین روش‌های توسعه وب مدرن.",
    "timeline.t4.year": "۱۴۰۰",
    "timeline.t4.title": "یادگیری خودآموز React و TypeScript",
    "timeline.t4.desc":
      "غواصی عمیق در اکوسیستم React، TypeScript و JavaScript مدرن. ساخت پروژه‌های شخصی برای تثبیت درک معماری فرانت‌اند.",
    "timeline.t5.year": "۱۴۰۰",
    "timeline.t5.title": "شروع سفر کدنویسی",
    "timeline.t5.desc":
      "در سن ۱۵ سالگی، علاقه به توسعه وب را کشف کردم. با مبانی HTML، CSS و JavaScript شروع کردم و پروژه‌های کوچک ساختم.",

    // Skills
    "skills.badge": "// skills.tsx",
    "skills.title": "مهارت‌های",
    "skills.highlight": "فنی",
    "skills.subtitle": "۳ سال تجربه عملی در ساخت اپلیکیشن‌های دنیای واقعی.",
    "skills.frontend": "فریم‌ورک‌های فرانت‌اند",
    "skills.styling": "استایلینگ و طراحی",
    "skills.tools": "ابزارها و روند کار",
    "skills.react.desc":
      "Hooks، Context API، بهینه‌سازی عملکرد، کتابخانه‌های سفارشی",
    "skills.nextjs.desc": "App Router، SSR/SSG، API routes، بهینه‌سازی SEO",
    "skills.ts.desc":
      "تایپ‌های پیشرفته، جنریک‌ها، strict mode، APIهای type-safe",
    "skills.tailwind.desc":
      "سیستم‌های طراحی سفارشی، لایوت‌های ریسپانسیو، واریانت‌های کامپوننت",
    "skills.css.desc": "انیمیشن‌ها، سیستم‌های grid، متغیرهای CSS، متدولوژی BEM",
    "skills.framer.desc":
      "ترنزیشن‌های صفحه، میکرو-انیمیشن‌ها، تعاملات ژست‌محور",
    "skills.git.desc": "استراتژی‌های branching، PR، code review، مبانی CI/CD",
    "skills.api.desc": "REST APIs، React Query، Axios، مدیریت خطا، کشینگ",
    "skills.testing.desc": " React Testing Library، تست کامپوننت و واحد",
    "skills.stack.badge": "// tools.used",
    "skills.stack.title": "استک",
    "skills.stack.highlight": "فناوری",
    "skills.stack.subtitle":
      "ابزارها و فناوری‌هایی که روزانه باهاشون کار می‌کنم.",
    "skills.soft.title": "فراتر از کد",
    "skills.ps": "حل مسئله",
    "skills.ps.desc": "تجزیه چالش‌های پیچیده به راه‌حل‌های ظریف",
    "skills.tc": "همکاری تیمی",
    "skills.tc.desc": "ارتباط موثر و بررسی کد سازنده",
    "skills.fl": "یادگیری سریع",
    "skills.fl.desc": "سازگاری سریع با فناوری‌ها و نیازمندی‌های جدید",
    "skills.ad": "توجه به جزئیات",
    "skills.ad.desc": "پیاده‌سازی‌های pixel-perfect و کدبیس‌های تمیز",
    "skills.sm": "خودانگیخته",
    "skills.sm.desc": "هدایت‌شده توسط کنجکاوی و بهبود مستمر",
    "skills.ue": "همدلی با کاربر",
    "skills.ue.desc": "همیشه اول از دیدگاه کاربر فکر می‌کنم",

    // Projects
    "projects.badge": "// projects.tsx",
    "projects.title": "پروژه‌های",
    "projects.highlight": "برجسته",
    "projects.subtitle":
      "اپلیکیشن‌های دنیای واقعی با فناوری‌های مدرن — هر کدام با چالش‌ها و راه‌حل‌های منحصربه‌فرد.",
    "projects.details.badge": "// project.details",
    "projects.details.title": "بررسی",
    "projects.details.highlight": "عمیق پروژه‌ها",
    "projects.details.subtitle":
      "داستان پشت هر پروژه: چالش‌ها، تصمیمات و نتایج.",
    "projects.challenge": "// چالش",
    "projects.outcome": "// نتیجه",
    "projects.viewLive": "مشاهده زنده",
    "projects.featured": "ویژه",

    "proj.arch.title": "وب‌سایت معماری",
    "proj.arch.desc":
      "یک وب‌سایت شیک و مدرن برای یک شرکت معماری، با نمایش پروژه‌ها، گالری‌های پورتفولیو و زیبایی‌شناسی تمیز.",
    "proj.arch.long":
      "ساخته شده با React و Tailwind CSS، این پروژه پورتفولیوی یک شرکت معماری را با انیمیشن‌های روان، گالری تصویر سفارشی و فرم تماس نمایش می‌دهد.",
    "proj.arch.challenge":
      "ایجاد ترنزیشن‌های صفحه روان با حفظ عملکرد در فایل‌های رسانه‌ای بزرگ.",
    "proj.arch.outcome":
      "تحویل سایت پورتفولیوی سریع و ریسپانسیو با امتیاز ۹۸ در Lighthouse.",

    "proj.digi.title": "دیجی‌صدا",
    "proj.digi.desc":
      "یک پلتفرم بازار دیجیتال و تجارت الکترونیک کامل با لیست محصولات، سبد خرید، احراز هویت کاربر و تجربه checkout تمیز.",
    "proj.digi.long":
      "دیجی‌صدا یک راه‌حل تجارت الکترونیک جامع ساخته شده با Next.js و TypeScript است. ویژگی‌ها شامل کاتالوگ محصول، جستجو و فیلتر، سبد خرید با localStorage و جریان پرداخت است.",
    "proj.digi.challenge":
      "مدیریت state پیچیده در فیلترهای محصول، سبد خرید و checkout با حداقل نگه داشتن حجم bundle.",
    "proj.digi.outcome":
      "ساخت پایه تجارت الکترونیک مقیاس‌پذیر با UX روان و عملکرد بهینه.",

    "proj.cine.title": "سینماپدیا",
    "proj.cine.desc":
      "یک اپ کشف فیلم سینمایی با قدرت TMDB API، با فیلم‌های پرطرفدار، جستجو، فیلتر ژانر و فهرست تماشا.",
    "proj.cine.long":
      "سینماپدیا با TMDB API یکپارچه شده تا تجربه غنی کشف فیلم ارائه دهد. کاربران می‌توانند محتوای پرطرفدار را مرور، جستجو کنند و موردعلاقه‌ها را ذخیره کنند.",
    "proj.cine.challenge":
      "مدیریت کارآمد fetch داده‌های async، صفحه‌بندی و جستجوی real-time با debouncing.",
    "proj.cine.outcome":
      "تحویل تجربه کشف فیلم روان با جستجوی آنی و اسکرول بی‌نهایت.",

    // Experience
    "exp.badge": "// experience.tsx",
    "exp.title": "تجربه",
    "exp.highlight": "کاری",
    "exp.subtitle": "۳ سال توسعه فرانت‌اند حرفه‌ای در شرکت وبکور.",
    "exp.role": "توسعه‌دهنده فرانت‌اند",
    "exp.company": "وبکور",
    "exp.type": "تمام‌وقت",
    "exp.period": "1402 — اکنون",
    "exp.active": "فعال",
    "exp.y2022": "1402",
    "exp.role2022": "توسعه‌دهنده جونیور",
    "exp.desc2022":
      "شروع با ساخت کامپوننت و رفع باگ. یادگیری استک فناوری وبکور.",
    "exp.y2023": "1402",
    "exp.role2023": "توسعه‌دهنده فرانت‌اند",
    "exp.desc2023": "مالکیت توسعه کامل ویژگی‌ها. رهبری UI چندین پروژه مشتری.",
    "exp.y2024": "1403–اکنون",
    "exp.role2024": "توسعه‌دهنده ارشد",
    "exp.desc2024":
      "معماری راه‌حل‌های مقیاس‌پذیر، بررسی کد و راهنمایی همتیمی‌ها.",
    "exp.responsibilities": "// مسئولیت‌ها[]",
    "exp.technologies": "// فناوری‌های.استفاده‌شده",
    "exp.r1":
      "ساخت و نگهداری اپلیکیشن‌های React/Next.js برای پروژه‌های مختلف مشتری",
    "exp.r2":
      "توسعه کتابخانه‌های کامپوننت قابل استفاده مجدد همسو با سیستم‌های طراحی",
    "exp.r3": "همکاری با طراحان برای پیاده‌سازی UIهای ریسپانسیو pixel-perfect",
    "exp.r4":
      "یکپارچه‌سازی APIهای شخص ثالث و سرویس‌های بک‌اند با REST و GraphQL",
    "exp.r5": "مشارکت در code review و جلسات pair programming",
    "exp.r6": "بهینه‌سازی عملکرد وب، کاهش زمان بارگذاری تا ۴۰٪",
    "exp.r7": "نوشتن تست‌های واحد و یکپارچه با و React Testing Library",
    "exp.r8": "راهنمایی اعضای جونیور تیم در React و TypeScript",
    "exp.h1.title": "۱۰+ پروژه تحویل‌شده",
    "exp.h1.desc": "اپلیکیشن‌های آماده تولید برای مشتریان متنوع ارسال شد.",
    "exp.h2.title": "قهرمان عملکرد",
    "exp.h2.desc": "به طور مداوم امتیازات ۹۰+ Lighthouse در همه پروژه‌ها.",
    "exp.h3.title": "توسعه‌دهنده همکار",
    "exp.h3.desc": "مشارکت در تیم‌های چابک، code review و همکاری بین‌تیمی.",
    "exp.h4.title": "تکرار سریع",
    "exp.h4.desc":
      "معروف به نمونه‌سازی سریع و تحویل سریع بدون مصالحه در کیفیت.",
    "exp.award.title": "۳ سال",
    "exp.award.highlight": "رشد حرفه‌ای",
    "exp.award.desc":
      "شروع از ۱۵ سالگی و رشد به توسعه‌دهنده ارشد در ۱۸ سالگی — سفری از یادگیری مداوم، چالش‌های واقعی و اشتیاق صادقانه برای ساخت تجربیات وب عالی.",

    // Contact
    "contact.badge": "// contact.tsx",
    "contact.title": "تماس",
    "contact.highlight": "با من",
    "contact.subtitle":
      "همیشه برای فرصت‌های جدید، همکاری‌ها یا فقط گپ درباره فناوری آماده‌ام.",
    "contact.letsBuild": "بیایید چیزی عالی بسازیم",
    "contact.desc":
      "چه پروژه‌ای در ذهن دارید، فرصت شغلی، یا فقط می‌خواهید ارتباط برقرار کنید — خوشحال می‌شوم بشنوم. معمولاً در ۲۴ ساعت پاسخ می‌دهم.",
    "contact.email": "ایمیل",
    "contact.github": "گیت‌هاب",
    "contact.linkedin": "شماره",
    "contact.location": "موقعیت",
    "contact.locationVal": "ایران · دورکاری ممکن است",
    "contact.follow": "// دنبالم کن",
    "contact.available": "آماده همکاری",
    "contact.availableDesc": "باز برای کار تمام‌وقت، فریلنس و دورکاری",
    "contact.send": "// ارسال_پیام()",
    "contact.name": "نام",
    "contact.namePh": "نام شما",
    "contact.emailLabel": "ایمیل",
    "contact.emailPh": "email@شما.com",
    "contact.subject": "موضوع",
    "contact.subjectPh": "انتخاب موضوع",
    "contact.job": "فرصت شغلی",
    "contact.freelance": "پروژه فریلنس",
    "contact.collab": "همکاری",
    "contact.other": "سایر",
    "contact.message": "پیام",
    "contact.messagePh": "درباره پروژه یا فرصت خود بگویید...",
    "contact.sendBtn": "ارسال پیام",
    "contact.required": "لطفاً تمام فیلدهای الزامی را پر کنید.",
    "contact.success": "پیام ارسال شد! به زودی پاسخ می‌دهم.",
    "contact.sent": "پیام ارسال شد!",
    "contact.sentDesc": "ممنون از پیامتان. در ۲۴ ساعت پاسخ می‌دهم.",
    "contact.sendAnother": "ارسال پیام جدید",

    // Resume
    "resume.badge": "// resume.pdf",
    "resume.title": "رزومه",
    "resume.highlight": "من",
    "resume.subtitle": "مروری حرفه‌ای بر تجربه، مهارت‌ها و پروژه‌ها.",
    "resume.download": "دانلود PDF",
    "resume.downloadFull": "دانلود رزومه کامل (PDF)",
    "resume.toast": "دانلود PDF رزومه اینجا اجرا می‌شود.",
    "resume.name": "هلن لنگری",

    "resume.jobTitle": "توسعه‌دهنده فرانت‌اند",
    "resume.bio":
      "توسعه‌دهنده فرانت‌اند ۱۸ ساله با ۳ سال تجربه حرفه‌ای. متخصص React، Next.js و TypeScript. علاقه‌مند به ساخت رابط‌های کاربری مدرن و کاربرمحور.",
    "resume.workExp": "تجربه کاری",
    "resume.techSkills": "مهارت‌های فنی",
    "resume.notableProjects": "پروژه‌های برجسته",
    "resume.frameworks": "فریم‌ورک‌ها",
    "resume.styling": "استایلینگ",
    "resume.tools": "ابزارها",
    "resume.other": "سایر",
    "resume.r1.role": "توسعه‌دهنده فرانت‌اند ",
    "resume.r1.period": "1403 — اکنون",
    "resume.r1.p1": "رهبری معماری UI برای چندین اپلیکیشن تولیدی",
    "resume.r1.p2": "راهنمایی توسعه‌دهندگان جونیور در React و TypeScript",
    "resume.r1.p3": "بهینه‌سازی عملکرد با رسیدن به امتیاز ۹۰+ Lighthouse",
    "resume.r3.role": "توسعه‌دهنده فرانت‌اند جونیور",
    "resume.r3.period": "1402",
    "resume.r3.p1": "توسعه کامپوننت‌های UI قابل استفاده مجدد",
    "resume.r3.p2": "مشارکت در code review و برنامه‌ریزی sprint چابک",
    "resume.r3.p3": "یادگیری و به‌کارگیری TypeScript و الگوهای مدرن React",

    // 404
    "404.error": "خطا ۴۰۴",
    "404.terminal": "ترمینال",
    "404.navigate": "$ رفتن به",
    "404.notFound": "✗ خطا: صفحه پیدا نشد",
    "404.moved": "صفحه‌ای که دنبالش می‌گردید وجود ندارد یا جابه‌جا شده است.",
    "404.desc": "به نظر می‌رسد از مسیر منحرف شدید. بیایید برگردیم.",
    "404.home": "بازگشت به خانه",
    "404.goBack": "برگشت",
  },
};

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang");
    return (saved as Lang) || "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const t = (key: string): string => {
    return translations[lang][key] ?? translations["en"][key] ?? key;
  };

  const dir: "ltr" | "rtl" = lang === "fa" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
