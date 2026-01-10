import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaArrowRight, 
  FaCode, 
  FaServer, 
  FaDatabase, 
  FaRobot, 
  FaTools,
  FaDownload,
  FaExternalLinkAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLightbulb,
  FaRocket,
  FaChartLine,
  FaUsers,
  FaCogs,
  FaBrain,
  FaHeart,
  FaStar
} from 'react-icons/fa';
import './index.css';
import { FaUtensils } from 'react-icons/fa6';

// Profile picture - replace with your actual image
const profileImage = "./Picture.jpeg";

const ParticleBackground = () => {
  useEffect(() => {
    const container = document.querySelector('.particle-container');
    if (!container) return;

    const particles = [];
    const colors = ['#7B337E', '#6667AB', '#F5D5E0'];

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 100 + 20;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.background = `radial-gradient(circle, ${color}, transparent)`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(particle);
      particles.push({
        element: particle,
        x,
        y,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      });
    }

    const animate = () => {
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x > 100) particle.x = 0;
        if (particle.x < 0) particle.x = 100;
        if (particle.y > 100) particle.y = 0;
        if (particle.y < 0) particle.y = 100;
        
        particle.element.style.left = `${particle.x}%`;
        particle.element.style.top = `${particle.y}%`;
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div className="particle-container" />;
};

const SkillCategory = ({ title, skills, icon: Icon, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="skill-card p-6 rounded-2xl"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 rounded-lg bg-linear-to-br from-purple-900 to-pink-900">
        <Icon className="text-2xl text-[#F5D5E0]" />
      </div>
      <h3 className="text-xl font-bold text-[#F5D5E0]">{title}</h3>
    </div>
    {description && (
      <p className="text-[#C9B8D9] text-sm mb-4">{description}</p>
    )}
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-4 py-2 rounded-full bg-linear-to-r from-[#420D4B] to-[#210635] text-[#C9B8D9] text-sm border border-[#210635] hover:border-[#7B337E] transition-all duration-300"
        >
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const ProjectStoryCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="project-story-card p-8 mb-12"
    >
      {/* Project Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-linear-to-br from-[#7B337E] to-[#6667AB]">
            {project.icon}
          </div>
          <h3 className="text-3xl font-bold gradient-text">{project.title}</h3>
        </div>
        <p className="text-[#C9B8D9] text-lg italic">{project.tagline}</p>
      </div>

      {/* The Problem */}
      <div className="mb-8">
        <h4 className="text-xl font-bold mb-4 text-[#F5D5E0] flex items-center gap-2">
          <FaLightbulb className="text-[#7B337E]" />
          The Challenge
        </h4>
        <p className="text-[#C9B8D9] mb-4">{project.problem.statement}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.problem.points.map((point, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-linear-to-r from-[#420D4B]/20 to-transparent rounded-lg">
              <div className="p-1 rounded bg-[#7B337E] mt-1">
                <FaStar className="text-xs text-white" />
              </div>
              <span className="text-[#C9B8D9] text-sm">{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* My Role & Process */}
      <div className="mb-8">
        <h4 className="text-xl font-bold mb-4 text-[#F5D5E0] flex items-center gap-2">
          <FaUsers className="text-[#7B337E]" />
          My Role & Process
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-linear-to-br from-[#420D4B]/30 to-transparent border border-[#210635]">
            <h5 className="font-semibold mb-2 text-[#F5D5E0]">My Role</h5>
            <p className="text-[#C9B8D9] text-sm">{project.role.description}</p>
            <div className="mt-3">
              {project.role.responsibilities.map((resp, index) => (
                <div key={index} className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7B337E]" />
                  <span className="text-[#C9B8D9] text-sm">{resp}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-linear-to-br from-[#420D4B]/30 to-transparent border border-[#210635]">
            <h5 className="font-semibold mb-2 text-[#F5D5E0]">Development Process</h5>
            <div className="space-y-2">
              {project.process.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-[#7B337E] font-bold">{index + 1}.</span>
                  <span className="text-[#C9B8D9] text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tools & Technologies */}
      <div className="mb-8">
        <h4 className="text-xl font-bold mb-4 text-[#F5D5E0] flex items-center gap-2">
          <FaCogs className="text-[#7B337E]" />
          Tools & Technologies
        </h4>
        <div className="flex flex-wrap gap-3">
          {project.techStack.map((tech, index) => (
            <div key={index} className="group relative">
              <span className="px-4 py-2 rounded-full bg-linear-to-r from-[#7B337E] to-[#6667AB] text-white text-sm font-medium">
                {tech.name}
              </span>
              {tech.purpose && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                  <div className="bg-[#420D4B] text-[#C9B8D9] text-xs px-3 py-2 rounded-lg shadow-lg border border-[#210635] whitespace-nowrap">
                    {tech.purpose}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Challenges & Solutions */}
      <div className="mb-8">
        <h4 className="text-xl font-bold mb-4 text-[#F5D5E0] flex items-center gap-2">
          <FaBrain className="text-[#7B337E]" />
          Challenges & Solutions
        </h4>
        <div className="space-y-4">
          {project.challenges.map((challenge, index) => (
            <div key={index} className="p-4 rounded-xl bg-linear-to-r from-[#420D4B]/20 to-transparent">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-1 rounded bg-[#7B337E]">
                  <span className="text-xs text-white">#{index + 1}</span>
                </div>
                <h5 className="font-semibold text-[#F5D5E0]">{challenge.title}</h5>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-linear-to-br from-[#210635] to-transparent">
                  <h6 className="font-medium text-[#F5D5E0] text-sm mb-1">The Challenge</h6>
                  <p className="text-[#C9B8D9] text-sm">{challenge.description}</p>
                </div>
                <div className="p-3 rounded-lg bg-linear-to-br from-[#7B337E]/20 to-transparent">
                  <h6 className="font-medium text-[#F5D5E0] text-sm mb-1">My Solution</h6>
                  <p className="text-[#C9B8D9] text-sm">{challenge.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results & Impact */}
      <div className="mb-8">
        <h4 className="text-xl font-bold mb-4 text-[#F5D5E0] flex items-center gap-2">
          <FaChartLine className="text-[#7B337E]" />
          Results & Impact
        </h4>

       <p className="text-[#C9B8D9] text-sm leading-relaxed">
  The project demonstrated strong real-world impact, including{" "}
  {project.results.metrics.map((metric, index) => {
    const text =
      typeof metric === "string"
        ? metric
        : metric.label || metric.value;

    return (
      <span key={index}>
        <span className="text-[#C9B8D9] text-sm leading-relaxed">
          {text}
        </span>
        {index < project.results.metrics.length - 1 ? ", " : "."}
      </span>
    );
  })}
</p>

<div className="mt-6 p-4 rounded-xl bg-linear-to-r from-[#7B337E]/10 to-[#6667AB]/10 border border-[#7B337E]/30">
          <p className="text-[#C9B8D9] italic">"{project.results.quote}"</p>
          <div className="mt-3">
            {project.results.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <FaHeart className="text-[#7B337E] text-sm" />
                <span className="text-[#C9B8D9] text-sm">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Links */}
      <div className="flex flex-wrap gap-4">
        {project.links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              link.type === 'github' 
                ? 'bg-linear-to-r from-[#420D4B] to-[#210635] text-[#F5D5E0] border border-[#7B337E] hover:bg-linear-to-r hover:from-[#7B337E] hover:to-[#6667AB]'
                : 'bg-linear-to-r from-[#7B337E] to-[#6667AB] text-white hover:opacity-90'
            }`}
          >
            {link.type === 'github' ? <FaGithub /> : <FaExternalLinkAlt />}
            {link.label}
          </a>
        ))}
      </div>
    </motion.div>
  );
};

// intenship Section with Narrative
const InternshipSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="glass p-8 rounded-3xl glow mb-16"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 rounded-lg bg-linear-to-br from-[#7B337E] to-[#6667AB]">
        <FaBriefcase className="text-2xl text-white" />
      </div>
      <h2 className="text-3xl font-bold gradient-text">
        My Journey: Internship at Dynamix Networks
      </h2>
    </div>

    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-linear-to-r from-[#420D4B]/30 to-transparent border border-[#210635] hover:border-[#7B337E] transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#F5D5E0] mb-2">
              Web Development Intern
            </h3>
            <p className="text-lg text-[#C9B8D9]">
              Dynamix Networks · Remote
            </p>
          </div>
          <div className="flex items-center gap-4 text-[#C9B8D9]">
            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              <span>17 Sept 2025 - 17 Dec 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>3 Months</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-[#F5D5E0] mb-3">
            My Story at Dynamix
          </h4>
          <p className="text-[#C9B8D9] mb-4 leading-relaxed">
            During my remote internship at Dynamix Networks, I gained hands-on
            experience in web development by working on structured technical
            assignments that emphasized real-world application of core concepts.
            This internship strengthened my foundation in modular coding,
            problem-solving, and professional development practices.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h5 className="font-semibold text-[#F5D5E0] mb-2">
              Key Projects & Contributions
            </h5>
            <ul className="space-y-2 text-[#C9B8D9] pl-4">
              <li className="flex items-start gap-2">
                <span className="text-[#7B337E] mt-1">•</span>
                <span>
                  Completed <strong>two technical web development tasks each month</strong>,
                  consistently meeting deadlines with accuracy and professionalism
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7B337E] mt-1">•</span>
                <span>
                  Applied <strong>core web development principles</strong> including
                  modular coding, debugging, and structured problem-solving
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7B337E] mt-1">•</span>
                <span>
                  Demonstrated the ability to <strong>work independently in a remote environment </strong>
                   while maintaining consistent communication
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7B337E] mt-1">•</span>
                <span>
                  Contributed reliable and high-quality work reflecting strong
                  attention to detail and commitment to learning
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-[#F5D5E0] mb-2">
              What I Learned & Grew
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-linear-to-r from-[#420D4B]/20 to-transparent">
                <p className="text-[#C9B8D9] text-sm">
                  <strong>Professional Discipline:</strong> Built consistency,
                  accountability, and time management while completing structured
                  monthly tasks in a remote setting.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-linear-to-r from-[#7B337E]/20 to-transparent">
                <p className="text-[#C9B8D9] text-sm">
                  <strong>Communication & Initiative:</strong> Developed strong
                  communication skills, a proactive mindset, and enthusiasm for
                  continuous learning and growth.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#210635]">
          <h4 className="font-semibold text-[#F5D5E0] mb-3">
            Technologies I Worked With
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              'HTML5',
              'CSS3',
              'JavaScript',
              'Web Development Fundamentals',
              'Modular Coding',
              'Git/GitHub',
              'Problem Solving',
              'Remote Collaboration'
            ].map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-linear-to-r from-[#7B337E]/20 to-[#6667AB]/20 text-[#C9B8D9] text-sm border border-[#7B337E]/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);


const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const resumeRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.clientHeight;
        
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Kritika_Jain_Resume.pdf';
    link.download = 'Kritika_Jain_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Skills with personality
  const skillsCategories = [
    {
      title: "Frontend Craftsmanship",
      description: "Where design meets functionality - creating intuitive interfaces that users love",
      skills: ["React.js", "Tailwind CSS", "Framer Motion", "Next.js"],
      icon: FaCode
    },
    {
      title: "Backend Engineering",
      description: "Building robust server-side logic and scalable architectures",
      skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Middleware", "Socket.io"],
      icon: FaServer
    },
    {
      title: "Database Design",
      description: "Structuring data efficiently for performance and scalability",
      skills: ["MongoDB", "Schema Design", "Indexing", "Aggregation", "Transactions", "Redis"],
      icon: FaDatabase
    },
    {
      title: "AI & Intelligent Systems",
      description: "Making applications smarter with AI integrations",
      skills: ["Gemini API", "Prompt Engineering", "AI Agents", "OpenAI API", "Vector DB", "LangChain"],
      icon: FaRobot
    },
    {
      title: "Tools",
      description: "The foundation that supports everything else",
      skills: ["Git/GitHub", "Docker", "CI/CD", "AWS", "Vercel", "Postman", "Render"],
      icon: FaTools
    }
  ];

  // Project stories with narrative
  const projectStories = [
    {
      title: "MindCare - AI Mental Health Companion",
      tagline: "Creating a safe space for emotional support through intelligent conversation",
      icon: <FaHeart className="text-xl text-white" />,
      problem: {
        statement: "Mental health support is often inaccessible, expensive, and stigmatized. Many existing digital solutions feel impersonal and fail to adapt to users' emotional states.",
        points: [
          "24/7 availability is crucial but costly with human therapists",
          "Users need privacy and anonymity to feel comfortable sharing",
          "One-size-fits-all approaches don't address individual emotional needs",
          "Existing chatbots lack emotional intelligence and context awareness"
        ]
      },
      role: {
        description: "I designed and built MindCare end-to-end as a full-stack developer, focusing on creating an empathetic, intelligent companion that understands users emotionally and supports habit formation..",
        responsibilities: [
          "Architected the complete MERN stack application",
          "Designed and implemented AI integration strategy",
          "Created responsive UI with accessibility in mind",
          "Implemented security measures and data privacy"
        ]
      },
      process: {
        steps: [
          "I started by identifying key emotional indicators from user inputs and interactions." ,
          "I implemented a multimodal emotion detection system to infer user mood, then mapped detected emotions to personalized mental-health guidance.",
          "To encourage long-term well-being, I integrated a daily task and habit tracker, helping users build consistency through small, achievable goals."
        ]
      },
      techStack: [
        { name: "React", purpose: "Interactive, component-based UI" },
        { name: "Node.js/Express", purpose: "Scalable backend server" },
        { name: "MongoDB", purpose: "Flexible document storage for user data" },
        { name: "Gemini API", purpose: "Intelligent, context-aware conversations" },
        { name: "Socket.io", purpose: "Real-time chat functionality" },
        { name: "JWT", purpose: "Secure authentication" },
        { name: "Chart.js", purpose: "Visualizing mood trends" }
      ],
      challenges: [
        {
          title: "Emotional Context Preservation",
          description: "Maintaining conversation context and emotional state across chat sessions while ensuring privacy",
          solution: "Implemented Redis for session management and designed a stateful conversation flow with context window management"
        },
        {
          title: "Real-time Response Optimization",
          description: "Reducing AI response latency to under 2 seconds while handling multiple concurrent users",
          solution: "Implemented request batching, response caching, and optimized prompt engineering for faster Gemini API responses"
        },
        {
          title: "Security & Privacy Compliance",
          description: "Ensuring end-to-end encryption and compliance with data protection regulations",
          solution: "Designed zero-knowledge architecture, implemented data anonymization, and used secure environment variables"
        }
      ],
      results: {
        metrics: [
          "Delivering personalized emotional insights and coping tips in real time",
          "Increasing user engagement through daily habit tracking and reminders",
           "Creating a compassionate, user-centric experience that blends AI with mental-health awareness"
        ],
        quote: "This project taught me that technology can be warm and empathetic when designed with genuine care.",
        achievements: [
          "Reduced AI response latency from 5.8s to 3.2s through optimization",
          "User feedback showed 89% felt more comfortable sharing with AI vs. initial human interaction"
        ]
      },
      links: [
        { label: "View Code", type: "github", url: "https://github.com/kritikajain14/Mental-Health-App" },
        { label: "Live Demo", type: "demo", url: "https://mindcare-orpin.vercel.app/" }
      ]
    },
   {
  title: "Dine-Ease — Smart Restaurant Booking & Payment Platform",
  tagline: "Streamlining restaurant reservations with seamless bookings and secure payments",
  icon: <FaUtensils className="text-xl text-white" />,

  problem: {
    statement:
      "Restaurants often rely on manual reservation systems and offline payments, leading to booking conflicts, poor customer experience, and operational inefficiencies.",
    points: [
      "Manual table bookings caused scheduling conflicts",
      "No real-time visibility into table availability",
      "Offline payments increased errors and delays",
      "Lack of a smooth digital experience for customers"
    ]
  },

  role: {
    description:
      "I developed Dine-Ease as a full-stack solution to digitize restaurant operations, focusing on seamless reservations and secure online payments.",
    responsibilities: [
      "I designed an intuitive user flow where customers can browse the restaurant, reserve tables in real time, and complete payments securely",
      "I integrated Stripe payment processing to ensure reliability and compliance",
      "Built responsive and user-friendly UI",
      "Handled backend APIs and database design"
    ]
  },

  process: {
    steps: [
      "Analyzed restaurant workflow and customer booking journey",
      "Designed RESTful APIs for reservations and payments",
      "Implemented real-time table booking logic",
      "Integrated Stripe Checkout for secure transactions",
      "Connected frontend and backend with environment-based configuration",
      "Deployed backend on Render and frontend on Vercel"
    ]
  },

  techStack: [
    { name: "React", purpose: "Interactive and responsive frontend UI" },
    { name: "Node.js + Express", purpose: "Backend APIs and business logic" },
    { name: "MongoDB", purpose: "Storing reservations, users, and orders" },
    { name: "Stripe API", purpose: "Secure online payment processing" },
    { name: "Render", purpose: "Backend deployment and environment management" },
    { name: "Vercel", purpose: "Frontend hosting and CI/CD" }
  ],

  challenges: [
    {
      title: "Real-time Table Availability",
      description:
        "Preventing double bookings while multiple users reserve tables simultaneously",
      solution:
        "Implemented server-side validation and availability checks before confirming reservations"
    },
    {
      title: "Secure Payment Integration",
      description:
        "Handling online payments safely without exposing sensitive credentials",
      solution:
        "Used Stripe Checkout with environment variables and server-side payment intent creation"
    },
    {
      title: "Deployment & Environment Configuration",
      description:
        "Ensuring seamless communication between frontend and backend after deployment",
      solution:
        "Configured environment variables and CORS policies for production environments"
    }
  ],

  results: {
    metrics: [
      "Enabled online table booking with real-time confirmation",
      "Implemented secure Stripe payments, reducing manual payment handling",
      "Improved customer experience and operational efficiency for restaurants"
    ],
    quote:
      "Building Dine-Ease taught me how thoughtful UX and secure systems can directly improve real-world business operations.",
    achievements: [
      "Enabled customers to book tables online with real-time confirmation",
      "Successfully integrated secure Stripe payments",
      "Reduced manual booking errors and payment delays",
      "Delivered a responsive and production-ready restaurant platform"
    ]
  },

  links: [
    {
      label: "View Code",
      type: "github",
      url: "https://github.com/kritikajain14/Dine-ease"
    },
    {
      label: "Live Demo",
      type: "demo",
      url: "https://dine-ease-ashy.vercel.app/"
    }
  ]
}
  ];

  // Additional smaller projects
  const additionalProjects = [
    {
  title: "CodeSense",
  description: "AI-powered code review application that analyzes code, suggests improvements, and provides optimized solutions in real time",
  techStack: ["React", "Node.js", "Gemini API", "MongoDB"],
  metrics: "Improved code quality and reduced debugging time through instant AI-driven feedback",
  github: "https://github.com/kritikajain14/Code-reviewer"
},
    {
  title: "Learning Management System",
  description: "Comprehensive LMS platform enabling users to learn from courses, generate new courses and quizzes, and track learning and teaching progress via dashboards",
  techStack: ["React", "Node.js", "MongoDB", "JWT Authentication"],
  metrics: "Enhanced learning engagement with centralized course management and real-time progress tracking",
  github: "https://github.com/kritikajain14/Dyanmix-Networks-LMS-App"
},
    {
  title: "Symptom Tracker",
  description: "Health-focused application that tracks patient symptoms and provides personalized advice to support early awareness and better self-care",
  techStack: ["React", "Node.js", "MongoDB", "Rule-based Recommendation Engine"],
  metrics: "Improved symptom monitoring and guidance through structured tracking and actionable insights",
  github: "https://github.com/kritikajain14/Dynamix-Networks-Symptom-Checker-App"
}
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <ParticleBackground />
      
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {['hero', 'about', 'internship', 'skills', 'projects', 'contact'].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section 
                ? 'bg-linear-to-r from-[#7B337E] to-[#6667AB] scale-125' 
                : 'bg-[#420D4B] hover:bg-[#7B337E]'
            }`}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </div>

      {/* Hero Section with Personality */}
      <section id="hero" className="min-h-screen section-spacing relative flex items-center">
        <div className="grid-bg absolute inset-0" />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* Profile Image with Personality */}
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-block mb-8"
            >
              <div className="profile-image-container mx-auto">
                <img 
                  src={profileImage} 
                  alt="Kritika Jain" 
                  className="profile-image"
                />
              </div>
            </motion.div>
            
            {/* Personalized Introduction */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="gradient-text">Hi, I'm Kritika</span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl mb-6 text-[#C9B8D9]">
                Full-Stack Developer · AI Enthusiast · Problem Solver
              </h2>
              
              <p className="text-xl mb-8 text-[#C9B8D9] max-w-3xl mx-auto leading-relaxed">
                I bridge the gap between elegant interfaces and robust backends, 
                creating digital experiences that are both beautiful and functional.
                <span className="block mt-4 text-lg">
                  Currently crafting intelligent applications at the intersection of 
                  <span className="text-[#7B337E]"> human-centered design </span> 
                  and 
                  <span className="text-[#6667AB]"> cutting-edge technology</span>.
                </span>
              </p>
              
              {/* Personal Philosophy */}
              <div className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl bg-linear-to-r from-[#420D4B]/20 to-transparent border border-[#210635]">
                <p className="text-[#C9B8D9] italic text-lg">
                  "I believe great code should tell a story — one of solving real problems, 
                  understanding users, and creating impact that matters."
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="btn-primary flex items-center justify-center gap-3"
                >
                  Explore My Work <FaArrowRight />
                </button>
                
                <a
  href="/Kritika_Jain_Resume.pdf"
  download
  className="btn-secondary flex items-center justify-center gap-3 border border-[#7B337E] hover:border-[#F5D5E0] transition-all duration-300"
>
  <FaDownload /> Download Resume
</a>

                
                <a 
                  href="https://github.com/kritikajain14/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center gap-3"
                >
                  <FaGithub /> Connect on GitHub
                </a>
              </div>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="text-[#C9B8D9] animate-bounce">
                <FaArrowRight className="rotate-90 text-2xl" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section with Story */}
      <section id="about" className="section-spacing">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass p-8 md:p-12 rounded-3xl glow"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text text-center">
              My Journey & Philosophy
            </h2>
            
            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-linear-to-r from-[#420D4B]/20 to-transparent">
                <h3 className="text-xl font-bold mb-4 text-[#F5D5E0]">From Curiosity to Craft</h3>
                <p className="text-[#C9B8D9] leading-relaxed">
                  My journey into development started with a simple question: 
                  <span className="text-[#F5D5E0] font-medium"> "How do things work?" </span>
                  This curiosity led me to my first lines of code, and I haven't stopped exploring since.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-linear-to-br from-[#7B337E]/10 to-transparent border border-[#7B337E]/20">
                  <h4 className="text-lg font-bold mb-3 text-[#F5D5E0]">My Development Philosophy</h4>
                  <ul className="space-y-3">
                    {[
                      "Code should be readable like a well-written story",
                      "Every pixel matters in creating intuitive experiences",
                      "Performance isn't a feature—it's a requirement",
                      "The best solutions often come from understanding the problem deeply"
                    ].map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="p-1 rounded bg-[#7B337E] mt-1">
                          <FaStar className="text-xs text-white" />
                        </div>
                        <span className="text-[#C9B8D9]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-6 rounded-2xl bg-linear-to-br from-[#6667AB]/10 to-transparent border border-[#6667AB]/20">
                  <h4 className="text-lg font-bold mb-3 text-[#F5D5E0]">What Drives Me</h4>
                  <ul className="space-y-3">
                    {[
                      "Solving complex problems with elegant solutions",
                      "Creating technology that positively impacts lives",
                      "Continuous learning and staying curious",
                      "Collaborating with passionate teams"
                    ].map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="p-1 rounded bg-[#6667AB] mt-1">
                          <FaRocket className="text-xs text-white" />
                        </div>
                        <span className="text-[#C9B8D9]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-linear-to-r from-[#420D4B]/30 to-transparent">
                <p className="text-[#C9B8D9] leading-relaxed">
                  When I'm not coding, you'll find me exploring new AI research papers, or
                  contributing to open-source projects. 
                  I believe in <span className="text-[#F5D5E0]">giving back to the community</span> 
                  that has taught me so much.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section with Personality */}
      <section id="skills" className="section-spacing">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              My Technical Toolkit
            </h2>
            <p className="text-[#C9B8D9] max-w-3xl mx-auto">
              These aren't just technologies I use—they're tools I've mastered to bring ideas to life
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsCategories.map((category, index) => (
              <SkillCategory
                key={category.title}
                {...category}
              />
            ))}
          </div>
          
          {/* Learning Journey */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 p-8 rounded-3xl glass"
          >
            <h3 className="text-2xl font-bold mb-6 gradient-text text-center">
              Currently Exploring
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: "Figma", purpose: "For prototyping UI designs" },
                { name: "Jira", purpose: "For project management and tracking" },
                { name: "DSA", purpose: "Mastering Data Structures and Algorithms" }
              ].map((tech, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-linear-to-br from-[#420D4B] to-[#210635] flex items-center justify-center">
                    <span className="text-[#F5D5E0] font-bold">{tech.name}</span>
                  </div>
                  <p className="text-[#C9B8D9] text-sm max-w-30">{tech.purpose}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section with Stories */}
      <section id="projects" className="section-spacing">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Projects with Purpose
            </h2>
            <p className="text-[#C9B8D9] max-w-3xl mx-auto text-lg">
              Each project tells a story of challenges faced, solutions crafted, and impact created
            </p>
          </motion.div>
          
          {/* Featured Project Stories */}
          <div className="space-y-16">
            {projectStories.map((project, index) => (
              <ProjectStoryCard key={index} project={project} />
            ))}
          </div>

          {/* Additional Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 gradient-text text-center">
              More Projects I've Built
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="compact-project-card p-6"
                >
                  <h4 className="text-xl font-bold mb-3 gradient-text">{project.title}</h4>
                  <p className="text-[#C9B8D9] mb-4 text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-linear-to-r from-[#7B337E]/20 to-[#6667AB]/20 text-[#C9B8D9] text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[#F5D5E0] text-sm font-medium">{project.metrics}</span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7B337E] hover:text-[#F5D5E0] transition-colors duration-300 flex items-center gap-2"
                    >
                      <FaGithub /> View Code
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internship Section */}
      <section id="internship" className="section-spacing">
        <div className="max-w-6xl mx-auto">
          <InternshipSection />
        </div>
      </section>

      {/* Contact Section with Personality */}
      <section id="contact" className="section-spacing">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Let's Build Something Meaningful
            </h2>
            <p className="text-[#C9B8D9] max-w-2xl mx-auto mb-12 text-lg">
              I'm always excited to collaborate on interesting projects, 
              discuss new ideas, or simply connect with fellow developers
            </p>
            
            {/* Personal Touch */}
            <div className="max-w-3xl mx-auto mb-12 p-8 rounded-3xl glass">
              <p className="text-[#C9B8D9] mb-6">
                I believe the best projects come from <span className="text-[#F5D5E0]">shared passion</span> and 
                <span className="text-[#F5D5E0]"> collaborative problem-solving</span>. Whether you have a specific 
                project in mind or just want to chat about technology, I'd love to hear from you.
              </p>
              <div className="flex items-center justify-center gap-4 text-[#C9B8D9]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#7B337E] animate-pulse"></div>
                  <span>Currently available for freelance projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#6667AB] animate-pulse"></div>
                  <span>Open to full-time opportunities</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a 
                href="mailto:jainkritika2020@gmail.com" 
                className="contact-link group"
              >
                <div className="p-3 rounded-lg bg-linear-to-br from-[#7B337E] to-[#6667AB] group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope className="text-xl text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#F5D5E0]">Email Me</p>
                  <p className="text-sm text-[#C9B8D9]">jainkritika2020@gmail.com</p>
                  <p className="text-xs text-[#7B337E] mt-1">Usually replies within 24 hours</p>
                </div>
              </a>
              
              <a 
                href="https://github.com/kritikajain14/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link group"
              >
                <div className="p-3 rounded-lg bg-linear-to-br from-[#7B337E] to-[#6667AB] group-hover:scale-110 transition-transform duration-300">
                  <FaGithub className="text-xl text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#F5D5E0]">GitHub</p>
                  <p className="text-sm text-[#C9B8D9]">@kritikajain</p>
                  <p className="text-xs text-[#7B337E] mt-1">Active contributor & open-source enthusiast</p>
                </div>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/kritika-jain-b89334234?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link group"
              >
                <div className="p-3 rounded-lg bg-linear-to-br from-[#7B337E] to-[#6667AB] group-hover:scale-110 transition-transform duration-300">
                  <FaLinkedin className="text-xl text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#F5D5E0]">LinkedIn</p>
                  <p className="text-sm text-[#C9B8D9]">Kritika Jain</p>
                  <p className="text-xs text-[#7B337E] mt-1">Let's connect professionally</p>
                </div>
              </a>
            </div>

            <div className="mt-16">
  <a
    href="/Kritika_Jain_Resume.pdf"
    download
    className="btn-accent-outline flex items-center justify-center gap-6 mx-auto text-lg"
  >
    <FaDownload />
    Download My Resume (PDF)
  </a>
</div>
          </motion.div>
        </div>
      </section>

      {/* Footer with Personality */}
      <footer className="py-12 border-t border-[#210635]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="text-left">
              <p className="text-[#F5D5E0] font-bold text-xl">Kritika Jain</p>
              <p className="text-[#C9B8D9] text-sm">Building the future, one line of code at a time</p>
            </div>
            
            <div className="flex gap-4">
              <a href="https://github.com/kritikajain14/" className="social-icon">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/kritika-jain-b89334234?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="social-icon">
                <FaLinkedin />
              </a>
              <a href="mailto:jainkritika2020@gmail.com" className="social-icon">
                <FaEnvelope />
              </a>
            </div>
          </div>
          
          <div className="pt-6 border-t border-[#210635]">
            <p className="text-[#C9B8D9] text-sm">
              © {new Date().getFullYear()} Made with 💜 by Kritika Jain. All code is poetry.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;