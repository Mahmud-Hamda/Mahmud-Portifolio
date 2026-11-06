# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences matter equally.

- Recruiters and hiring managers deciding whether to contact Mahmud Hamda about a role.
- People deciding whether to hire him for a web, software, or AI project.

## Product Purpose

This is Mahmud Hamda's personal portfolio. It exists so either audience can read his background and start a conversation. Success is a visitor who can judge that background and reach him.

## Positioning

Mahmud is a senior biomedical engineer and certified cybersecurity professional who builds AI-powered full-stack applications. The claim is that combination in one person. A portfolio that leads with only one of those disciplines would be a different product.

## Operating Context

Visitors use the public site at https://mahmudhamda.tech/ as one scrolling page: home, about, services, resume, portfolio, testimonials, and contact. He is based in the Denver, Colorado area. A visitor can download a resume PDF, send a note through the contact form, or ask the on-page assistant about the material already on the site.

## Capabilities and Constraints

The current site has a side menu, about details, a services list, education and experience, a skills list, a portfolio grid, testimonials, a resume download, an EmailJS contact form, a color switcher, and Ask Mahmud. Those describe what is built today. The chrome around them was not confirmed as frozen.

What I Do has three notes, in this order: AI-powered full-stack, Cybersecurity, and Biomedical Engineering. The copy is in `src/sections/Services/Services.jsx`.

My Work has four cards, in this order: Evangadi Forum, GPT Clone, Netflix Clone, and Apple Clone. Filters are All, AI-powered full-stack, Cybersecurity, and Biomedical. The Biomedical filter has no card yet. The grid ends with "More to be added soon!" Each card is a student project, not a client engagement. The data and links are in `src/sections/Portfolio/PortfolioSection.jsx`.

- Evangadi Forum: a learner forum with similarity search, a private PDF library, and a second sign-in by face, fingerprint, or email code. Live site https://ai-powered-evangadi-forum-ten.vercel.app/. Code https://github.com/Mahmud-Hamda/ai-powered-evangadi-forum.
- GPT Clone: a ChatGPT-style assistant for full-stack web development questions. It uses React, Express, Google Gemini, and MySQL on TiDB Cloud. Live site https://gpt-clone-tau-sable.vercel.app/. Code https://github.com/Mahmud-Hamda/gpt-clone-app. It is not affiliated with OpenAI.
- Netflix Clone: a React and TMDB movie browser. Live site https://netflix-clone-yscv.vercel.app/. Code https://github.com/Mahmud-Hamda/Netflix-Clone. It uses no AI and is not affiliated with Netflix.
- Apple Clone: a responsive Apple store homepage. Live site https://student-layout.vercel.app/. Code https://github.com/Mahmud-Hamda/apple-clone. It is not affiliated with Apple.

Client Speak has four quotes, each rated five stars: Adugna Bekele, Rediat Terefe, Eyob Berhe, and Mekuanint Tewende. Adugna, Eyob, and Mekuanint have photos. Rediat is shown with initials because no portrait is on file. The names, titles, quotes, and photos are in `src/sections/Testimonials/Testimonials.jsx`. These are real comments from people he has worked with. They are not sample cards and they are not case studies with results or metrics.

Ask Mahmud answers from the site's own material in the browser. It is not the GPT Clone and it does not call Gemini. The panel says "Ask Mahmud is AI and can make mistakes." One visitor is limited to 5 questions a minute, 10 questions a day, 1,000 characters, and 30 requests a minute. Those counts live in the browser, so clearing site data starts them over.

## Brand Commitments

The name is Mahmud Hamda. The public site is https://mahmudhamda.tech/. The binding position is the combination in Positioning. The page speaks in the first person.

## Evidence on Hand

- Profile photo: `src/assets/images/Profile.jpeg`
- Resume PDF: `src/assets/documents/resume.pdf`
- Education, experience, and skill entries: `src/sections/Resume/Resume.jsx`
- Service notes: `src/sections/Services/Services.jsx`
- Project cards, links, and the "More to be added soon!" line: `src/sections/Portfolio/PortfolioSection.jsx`
- Client Speak quotes and portraits: `src/sections/Testimonials/Testimonials.jsx` and `src/assets/images/testimonial/`
- Contact details rendered in the contact section, including mkhamda3@gmail.com, +1 720 365 1849, and Denver, Colorado
- LinkedIn: https://www.linkedin.com/in/mahmud-hamda
- GitHub: https://github.com/Mahmud-Hamda

Absences future work must not fill in:

- No confirmed client case studies, results, or metrics. The four project cards are student projects.
- Do not add a testimonial, client, quote, or project that is not already in the files above.
- Do not describe Ask Mahmud as a server-side Gemini chat. That description belongs to the GPT Clone.

## Product Principles

1. Treat a hiring decision and a client decision as equal jobs for this page.
2. Hold the position as biomedical engineering, cybersecurity, and AI-powered full-stack work together.
3. Keep proof honest. The four Client Speak quotes and the four project cards are the confirmed work. Leave the Biomedical filter empty until a real project belongs there.
4. Add a customer, result, quote, or social profile only when it is actually on file.
