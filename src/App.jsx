import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
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
  FaStar,
  FaTable,
  FaSearch,
  FaChartBar,
  FaCertificate,
  FaAward,
  FaTrophy,
  FaTimes,
  FaYoutube
} from 'react-icons/fa';
import './index.css';

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
      particles.push({ element: particle, x, y, speedX: (Math.random() - 0.5) * 0.5, speedY: (Math.random() - 0.5) * 0.5 });
    }
    const animate = () => {
      particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x > 100) p.x = 0; if (p.x < 0) p.x = 100;
        if (p.y > 100) p.y = 0; if (p.y < 0) p.y = 100;
        p.element.style.left = `${p.x}%`;
        p.element.style.top = `${p.y}%`;
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => { container.innerHTML = ''; };
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
    {description && <p className="text-[#C9B8D9] text-sm mb-4">{description}</p>}
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span key={index} className="px-4 py-2 rounded-full bg-linear-to-r from-[#420D4B] to-[#210635] text-[#C9B8D9] text-sm border border-[#210635] hover:border-[#7B337E] transition-all duration-300">
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

const SectionHeader = ({ eyebrow, title, description, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-10 md:mb-12"
  >
    {eyebrow && (
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-[#420D4B]/40 to-[#210635]/40 border border-[#7B337E]/30 mb-4">
        {Icon && <Icon className="text-[#F5D5E0] text-sm" />}
        <span className="text-[#C9B8D9] text-xs font-semibold uppercase tracking-wider">
          {eyebrow}
        </span>
      </div>
    )}
    <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">{title}</h3>
    {description && (
      <p className="text-[#C9B8D9] text-sm md:text-base max-w-2xl mx-auto">{description}</p>
    )}
  </motion.div>
);

/* ─── Fix Vite public path: strip leading /public from src ───────── */
const fixSrc = (src) => {
  if (!src) return src;
  // In Vite, files in /public are served at root. So /public/x.png → /x.png
  return src.replace(/^\/public\//, '/');
};

/* ─── Project Media Showcase — fully responsive ─────────────────── */
const ProjectMediaShowcase = ({ media }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [imgError, setImgError] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    setScrolled(false);
    setAtBottom(false);
    setImgError(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [activeIndex]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setScrolled(el.scrollTop > 10);
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
  };

  if (!media || media.length === 0) return null;
  const active = media[activeIndex];
  const src = fixSrc(active.src);

  return (
    <div className="mb-6 md:mb-8">
      {/*
        CSS strategy:
        - Mobile/tablet (<1024px): .media-inner has no maxHeight → full image visible, no scroll
        - Desktop (≥1024px):       .media-inner gets maxHeight:460px + overflow-y:auto via CSS
        This is pure CSS so it works instantly without JS detection.
      */}
      <style>{`
        .media-inner { overflow-x: hidden; }
        .media-inner::-webkit-scrollbar { display: none; }
        @media (min-width: 1024px) {
          .media-inner {
            max-height: 460px;
            overflow-y: auto;
            cursor: ns-resize;
            scrollbar-width: thin;
            scrollbar-color: #7B337E #210635;
          }
          .media-inner::-webkit-scrollbar {
            display: block;
            width: 6px;
          }
          .media-inner::-webkit-scrollbar-track {
            background: #210635;
            border-radius: 999px;
          }
          .media-inner::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #7B337E, #6667AB);
            border-radius: 999px;
          }
          .media-inner::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #9B43A0, #8889CC);
          }
        }
        /* Fade gradient: only on desktop */
        .media-fade { display: none; }
        @media (min-width: 1024px) {
          .media-fade { display: block; }
        }
        /* Scroll hint: hidden on mobile, shown on desktop */
        .media-hint { display: none; }
        @media (min-width: 1024px) {
          .media-hint { display: flex; }
        }
      `}</style>

      {/* Main viewer */}
      <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-[#7B337E]/40 bg-[#150225]">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="media-inner"
        >
          {active.type === 'video' ? (
            <video
              key={src}
              src={src}
              controls
              playsInline
              className="w-full h-auto block"
            />
          ) : imgError ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 px-4 text-center">
              <FaChartBar style={{ fontSize: '2.5rem', color: '#7B337E' }} />
              <p className="text-[#C9B8D9] text-sm font-medium">Dashboard Preview</p>
              <p className="text-[#C9B8D9] text-xs opacity-60 max-w-xs">
                Image couldn't load. Check that the file exists at{' '}
                <code className="text-[#F5D5E0]">{src}</code> in your public folder.
              </p>
            </div>
          ) : (
            <img
              key={src}
              src={src}
              alt={active.caption || 'Dashboard preview'}
              onError={() => setImgError(true)}
              style={{ display: 'block', width: '100%', height: 'auto' }}
              loading="lazy"
            />
          )}
        </div>

        {/* Fade gradient — desktop only, hidden once at bottom */}
        {!atBottom && !imgError && (
          <div
            className="media-fade absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: '56px', background: 'linear-gradient(to bottom, transparent, rgba(21,2,37,0.96))' }}
          />
        )}

        {/* Scroll hint — desktop only, hidden once scrolled or at bottom */}
        {!scrolled && !atBottom && !imgError && (
          <div
            className="media-hint absolute bottom-3 left-1/2 -translate-x-1/2 items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#F5D5E0] pointer-events-none whitespace-nowrap"
            style={{ background: 'rgba(123,51,126,0.9)', backdropFilter: 'blur(4px)' }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            Scroll to explore
          </div>
        )}
      </div>

      {/* Caption */}
      {active.caption && (
        <p className="text-[#C9B8D9] text-xs md:text-sm text-center mt-2 md:mt-3 italic px-2">
          {active.caption}
        </p>
      )}

      {/* Thumbnails */}
      {media.length > 1 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {media.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show preview ${index + 1}`}
              className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                activeIndex === index
                  ? 'border-[#7B337E] opacity-100'
                  : 'border-[#210635] opacity-55 hover:opacity-90'
              }`}
              style={{ width: 'clamp(48px, 12vw, 80px)', height: 'clamp(34px, 8.5vw, 56px)' }}
            >
              {item.type === 'video' ? (
                <div className="w-full h-full flex items-center justify-center bg-[#210635]">
                  <FaYoutube className="text-[#C9B8D9] text-xs" />
                </div>
              ) : (
                <img
                  src={fixSrc(item.src)}
                  alt={item.caption || `Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectStoryCard = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="project-story-card p-5 sm:p-6 md:p-8 mb-12"
  >
    <div className="mb-6 md:mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-linear-to-br from-[#7B337E] to-[#6667AB] shrink-0">{project.icon}</div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text leading-tight">{project.title}</h3>
      </div>
      <p className="text-[#C9B8D9] text-base md:text-lg italic">{project.tagline}</p>
    </div>

    <ProjectMediaShowcase media={project.media} />

    <div className="mb-8">
      <h4 className="text-lg md:text-xl font-bold mb-4 text-[#F5D5E0] flex items-center gap-2"><FaLightbulb className="text-[#7B337E]" /> The Business Question</h4>
      <p className="text-[#C9B8D9] mb-4 text-sm md:text-base">{project.problem.statement}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {project.problem.points.map((point, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-linear-to-r from-[#420D4B]/20 to-transparent rounded-lg">
            <div className="p-1 rounded bg-[#7B337E] mt-1 shrink-0"><FaStar className="text-xs text-white" /></div>
            <span className="text-[#C9B8D9] text-sm">{point}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-8">
      <h4 className="text-lg md:text-xl font-bold mb-4 text-[#F5D5E0] flex items-center gap-2"><FaUsers className="text-[#7B337E]" /> My Role & Approach</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="p-4 rounded-xl bg-linear-to-br from-[#420D4B]/30 to-transparent border border-[#210635]">
          <h5 className="font-semibold mb-2 text-[#F5D5E0]">My Role</h5>
          <p className="text-[#C9B8D9] text-sm">{project.role.description}</p>
          <div className="mt-3">
            {project.role.responsibilities.map((resp, index) => (
              <div key={index} className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7B337E] shrink-0" />
                <span className="text-[#C9B8D9] text-sm">{resp}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-linear-to-br from-[#420D4B]/30 to-transparent border border-[#210635]">
          <h5 className="font-semibold mb-2 text-[#F5D5E0]">Analysis Process</h5>
          <div className="space-y-2">
            {project.process.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-[#7B337E] font-bold shrink-0">{index + 1}.</span>
                <span className="text-[#C9B8D9] text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h4 className="text-lg md:text-xl font-bold mb-4 text-[#F5D5E0] flex items-center gap-2"><FaCogs className="text-[#7B337E]" /> Tools & Technologies</h4>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {project.techStack.map((tech, index) => (
          <div key={index} className="group relative">
            <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-linear-to-r from-[#7B337E] to-[#6667AB] text-white text-xs md:text-sm font-medium">{tech.name}</span>
            {tech.purpose && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-[#420D4B] text-[#C9B8D9] text-xs px-3 py-2 rounded-lg shadow-lg border border-[#210635] whitespace-nowrap">{tech.purpose}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    <div className="mb-8">
      <h4 className="text-lg md:text-xl font-bold mb-4 text-[#F5D5E0] flex items-center gap-2"><FaBrain className="text-[#7B337E]" /> Challenges & Solutions</h4>
      <div className="space-y-4">
        {project.challenges.map((challenge, index) => (
          <div key={index} className="p-4 rounded-xl bg-linear-to-r from-[#420D4B]/20 to-transparent">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-1 rounded bg-[#7B337E] shrink-0"><span className="text-xs text-white">#{index + 1}</span></div>
              <h5 className="font-semibold text-[#F5D5E0]">{challenge.title}</h5>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
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

    <div className="mb-8">
      <h4 className="text-lg md:text-xl font-bold mb-4 text-[#F5D5E0] flex items-center gap-2"><FaChartLine className="text-[#7B337E]" /> Key Findings & Impact</h4>
      <p className="text-[#C9B8D9] text-sm leading-relaxed">
        The analysis revealed actionable insights, including{" "}
        {project.results.metrics.map((metric, index) => (
          <span key={index}>
            <span className="text-[#C9B8D9] text-sm leading-relaxed">{typeof metric === "string" ? metric : metric.label || metric.value}</span>
            {index < project.results.metrics.length - 1 ? ", " : "."}
          </span>
        ))}
      </p>
      <div className="mt-6 p-4 rounded-xl bg-linear-to-r from-[#7B337E]/10 to-[#6667AB]/10 border border-[#7B337E]/30">
        <p className="text-[#C9B8D9] italic text-sm md:text-base">"{project.results.quote}"</p>
        <div className="mt-3">
          {project.results.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <FaHeart className="text-[#7B337E] text-sm shrink-0" />
              <span className="text-[#C9B8D9] text-sm">{achievement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="flex flex-wrap gap-3">
      {project.links.map((link, index) => (
        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
            link.type === 'github'
              ? 'bg-linear-to-r from-[#420D4B] to-[#210635] text-[#F5D5E0] border border-[#7B337E] hover:from-[#7B337E] hover:to-[#6667AB]'
              : link.type === 'live'
              ? 'bg-linear-to-r from-[#FF0000]/80 to-[#CC0000] text-white hover:opacity-90'
              : 'bg-linear-to-r from-[#7B337E] to-[#6667AB] text-white hover:opacity-90'
          }`}
        >
          {link.type === 'github' ? <FaGithub /> : link.type === 'live' ? <FaYoutube /> : <FaExternalLinkAlt />}
          {link.label}
        </a>
      ))}
    </div>
  </motion.div>
);

/* ─── Certificate Image Popup Modal ──────────────────────────────── */
const CertImageModal = ({ src, title, pdfUrl, onClose }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const fixedSrc = fixSrc(src);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-3 sm:p-5"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)', zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className="relative w-full rounded-2xl border border-[#7B337E] flex flex-col"
        style={{
          background: '#0d0117',
          maxWidth: '720px',
          /* On mobile take up most of screen height, on desktop cap nicely */
          maxHeight: '92vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[#210635] shrink-0">
          <span className="text-[#F5D5E0] font-semibold text-xs sm:text-sm leading-snug pr-4 line-clamp-2">
            {title}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#420D4B] transition-colors text-[#C9B8D9] hover:text-[#F5D5E0] shrink-0"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Image area — scrollable so tall certs work on small screens */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden flex items-center justify-center p-3 sm:p-5"
          style={{ minHeight: '200px' }}
        >
          {imgFailed ? (
            <div className="flex flex-col items-center gap-4 py-10 px-4 text-center">
              <FaCertificate style={{ fontSize: '3rem', color: '#7B337E' }} />
              <p className="text-[#C9B8D9] text-sm font-medium">Certificate image couldn't load</p>
              <p className="text-[#C9B8D9] text-xs opacity-60 max-w-xs">
                Path tried: <code className="text-[#F5D5E0]">{fixedSrc}</code>
              </p>
              <p className="text-[#C9B8D9] text-xs opacity-60">
                Make sure the file is in your <code className="text-[#F5D5E0]">public/certificates/</code> folder.
                You can still download the PDF below.
              </p>
            </div>
          ) : (
            <img
              src={fixedSrc}
              alt={title}
              onError={() => setImgFailed(true)}
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: '10px',
              }}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-5 py-3 border-t border-[#210635] flex items-center justify-between gap-3 shrink-0">
          {pdfUrl && (
            <a
              href={fixSrc(pdfUrl)}
              download
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-linear-to-r from-[#420D4B] to-[#210635] text-[#F5D5E0] border border-[#7B337E] hover:border-[#F5D5E0] transition-all duration-300"
            >
              <FaDownload /> Download PDF
            </a>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-4 py-2 rounded-lg text-sm text-[#C9B8D9] hover:text-[#F5D5E0] hover:bg-[#420D4B] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Certificate Card ───────────────────────────────────────────── */
const CertificateCard = ({ cert }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <CertImageModal
          src={cert.imageUrl}
          pdfUrl={cert.pdfUrl}
          title={cert.title}
          onClose={() => setShowModal(false)}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="certificate-card p-6 rounded-2xl flex flex-col h-full"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-lg bg-linear-to-br from-[#7B337E] to-[#6667AB] shrink-0">
            {cert.icon}
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#F5D5E0] leading-snug">{cert.title}</h4>
            <p className="text-[#C9B8D9] text-sm mt-1">{cert.issuer} · {cert.date}</p>
          </div>
        </div>

        {cert.skills && (
          <div className="flex flex-wrap gap-2 mb-6">
            {cert.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-linear-to-r from-[#420D4B] to-[#210635] text-[#C9B8D9] text-xs border border-[#210635]">
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm bg-linear-to-r from-[#7B337E] to-[#6667AB] text-white hover:opacity-90 transition-all duration-300"
          >
            <FaExternalLinkAlt /> View Certificate
          </button>

          {cert.pdfUrl && (
            <a
              href={cert.pdfUrl}
              download
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm bg-linear-to-r from-[#420D4B] to-[#210635] text-[#F5D5E0] border border-[#7B337E] hover:border-[#F5D5E0] transition-all duration-300"
            >
              <FaDownload />
            </a>
          )}
        </div>
      </motion.div>
    </>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');

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
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const skillsCategories = [
    {
      title: "Data Analysis & EDA",
      description: "Turning raw datasets into clear, actionable stories through exploration and statistical thinking",
      skills: ["Python", "Pandas", "NumPy", "Exploratory Data Analysis", "Statistical Analysis", "Correlation & Regression"],
      icon: FaSearch
    },
    {
      title: "Data Visualization",
      description: "Building dashboards and visuals that communicate findings at a glance",
      skills: ["Power BI", "Tableau", "Matplotlib", "Seaborn", "DAX", "KPI Cards", "Chart Design"],
      icon: FaChartBar
    },
    {
      title: "SQL & Databases",
      description: "Writing efficient queries to extract and transform business data",
      skills: ["SQL", "CTEs", "Window Functions", "LAG() / LEAD()", "Subqueries", "Joins", "Aggregations"],
      icon: FaDatabase
    },
    {
      title: "Spreadsheet & Reporting",
      description: "Excel-based analysis, pivot tables, and automated reporting workflows",
      skills: ["Excel", "Pivot Tables", "VLOOKUP / INDEX-MATCH", "Conditional Formatting", "Data Cleaning", "Power Query"],
      icon: FaTable
    },
    {
      title: "Tools & Workflow",
      description: "The toolkit that powers reproducible, shareable analytics work",
      skills: ["Jupyter Notebook", "Git/GitHub", "Google Sheets", "VS Code", "CSV/JSON handling", "Markdown"],
      icon: FaTools
    },
    {
      title: "AI & Prompt Engineering",
      description: "Leveraging AI tools to accelerate analysis, automate reporting, and extract insights faster",
      skills: ["ChatGPT / Claude", "Prompt Engineering", "AI-Assisted EDA", "Gemini API", "LLM Workflows", "Copilot for Data", "NLP (spaCy)"],
      icon: FaBrain
    }
  ];

  const projectStories = [
    {
      title: "Customer LTV & Profitability Analysis — GlowNest (D2C Skincare)",
      tagline: "Why are we losing money on repeat customers? A full cohort and LTV breakdown.",
      icon: <FaChartBar className="text-xl text-white" />,
      media: [
        { type: "image", src: "/public/projects/D2C Dashboard.png", caption: "Customer LTV and cohort retention analysis" }
      ],
      problem: {
        statement: "GlowNest, a fictional D2C skincare brand, was seeing growing repeat purchase rates — yet margin was declining. The question: are high-discount repeat customers actually profitable long-term?",
        points: [
          "Repeat customers receiving large discounts drove revenue but eroded margin",
          "No visibility into which customer cohorts had the highest LTV",
          "Marketing spend was being allocated without cohort-level profitability data",
          "Business couldn't identify whether acquisition cost was justified by downstream value"
        ]
      },
      role: {
        description: "I built a synthetic dataset representing 12 months of GlowNest transactions and conducted a full LTV and cohort retention analysis in Python to answer the core business question.",
        responsibilities: [
          "Designed and generated realistic synthetic D2C transaction data",
          "Built cohort analysis tracking retention by acquisition month",
          "Calculated Customer LTV, CAC, and LTV:CAC ratio by segment",
          "Identified the high-discount customer segment as net-negative in LTV terms"
        ]
      },
      process: {
        steps: [
          "Generated synthetic dataset: 500 customers, 12 months, with fields for acquisition channel, discount tier, product category, and order value",
          "Segmented customers by acquisition cohort (month) and computed month-over-month retention rates",
          "Calculated average LTV per cohort and broke down profitability by discount tier",
          "Discovered that customers acquired via 30%+ discount offers had LTV 42% lower than full-price acquirers",
          "Built a Power BI-style summary dashboard in Python showing cohort heatmap and LTV waterfall"
        ]
      },
      techStack: [
        { name: "Python", purpose: "Analysis and dataset generation" },
        { name: "Pandas", purpose: "Cohort segmentation and aggregation" },
        { name: "Matplotlib / Seaborn", purpose: "Retention heatmap and LTV charts" },
        { name: "NumPy", purpose: "LTV and margin calculations" },
        { name: "Jupyter Notebook", purpose: "Reproducible analysis environment" },
        { name: "GitHub", purpose: "Version control and portfolio hosting" }
      ],
      challenges: [
        {
          title: "Realistic synthetic data generation",
          description: "The analysis needed data that behaved like real D2C purchase patterns — with churn, seasonality, and discount skew — not random noise",
          solution: "Engineered probabilistic rules: discount customers had higher churn probability, Q4 had elevated order frequency, and CAC varied by channel"
        },
        {
          title: "Cohort alignment across time windows",
          description: "Customers acquired in later months had fewer observable months of LTV — making raw comparisons misleading",
          solution: "Normalized cohort LTV to a 6-month window so all cohorts were compared on equal footing"
        }
      ],
      results: {
        metrics: [
          "Customers acquired via 30%+ discounts had 42% lower 6-month LTV vs. full-price cohorts",
          "Month 3 retention was the key inflection point — cohorts surviving past it had 2.3× higher predicted LTV",
          "Organic channel customers showed the highest LTV:CAC ratio at 3.8×"
        ],
        quote: "This project showed me how cohort analysis translates a revenue number into a strategy — you stop asking 'how much did we make?' and start asking 'from whom, and will they stay?'",
        achievements: [
          "Identified discount-heavy acquisition as a margin risk, not a growth lever",
          "Built a reusable cohort analysis framework applicable to any subscription or repeat-purchase business",
          "Demonstrated the business case for shifting budget toward organic and referral channels"
        ]
      },
      links: [
        { label: "View on GitHub", type: "github", url: "https://github.com/kritikajain14/D2C-customer-profitability" },
        { label: "Watch Demo", type: "live", url: "https://youtu.be/kvVj24WqMxw?si=VfCi_TIQ0WSdwgL1" }
      ]
    },
    {
      title: "Instagram Influencer Analysis",
      tagline: "Does follower count actually predict engagement? Spoiler: it doesn't.",
      icon: <FaChartLine className="text-xl text-white" />,
      media: [
        { type: "image", src: "/public/projects/Top Influencers.png", caption: "Inside Top 200 : What Actually Drives Engagement?" }
      ],
      problem: {
        statement: "Brands commonly assume that bigger influencers = better results. This project set out to test that assumption statistically, using a dataset of 200 top Instagram mega-influencers.",
        points: [
          "No clear understanding of what drives influencer engagement rate",
          "Follower count is often used as a proxy for performance without evidence",
          "Brands overpay for reach while undervaluing authentic engagement",
          "No visual framework to segment influencers by influence tier and niche"
        ]
      },
      role: {
        description: "I conducted end-to-end EDA and statistical analysis — from data cleaning to correlation testing to visual storytelling — entirely in Python.",
        responsibilities: [
          "Cleaned and standardized 200-row influencer dataset",
          "Engineered features like engagement rate buckets and tier labels",
          "Ran Pearson correlation analysis between followers and engagement",
          "Built 5 chart types including heatmap and box plot"
        ]
      },
      process: {
        steps: [
          "Loaded and inspected the dataset; identified missing values and formatting inconsistencies in follower/engagement columns",
          "Cleaned numeric fields, engineered an engagement_rate column (likes+comments / followers × 100)",
          "Computed Pearson correlation (r ≈ −0.10), confirming a near-zero negative relationship",
          "Visualized distributions by influencer tier, country, and category using bar, line, heatmap, box plot, and histogram charts",
          "Documented findings in a GitHub README and LinkedIn post targeting analytics recruiters"
        ]
      },
      techStack: [
        { name: "Python", purpose: "Core analysis language" },
        { name: "Pandas", purpose: "Data cleaning and transformation" },
        { name: "Matplotlib", purpose: "Custom chart building" },
        { name: "Seaborn", purpose: "Statistical visualizations (heatmap, box plot)" },
        { name: "Jupyter Notebook", purpose: "Interactive analysis environment" },
        { name: "GitHub", purpose: "Portfolio publishing and version control" }
      ],
      challenges: [
        {
          title: "Inconsistent numeric formatting",
          description: "Follower and like counts were stored as strings with 'M' and 'K' suffixes, making arithmetic impossible",
          solution: "Wrote a custom parsing function to convert all suffixed strings to float values before any analysis"
        },
        {
          title: "Communicating a 'null result' meaningfully",
          description: "A near-zero correlation is a valid and important finding, but it's easy to dismiss as 'nothing happened'",
          solution: "Framed the finding as a business insight — brands should weight engagement rate, not just reach — and visualized the spread clearly"
        }
      ],
      results: {
        metrics: [
          "Pearson r ≈ −0.10 between followers and engagement rate (near-zero relationship)",
          "Mega-influencers (1M+ followers) showed the lowest median engagement rate across all tiers",
          "Nano and micro influencers consistently outperformed on engagement per follower"
        ],
        quote: "This project taught me that counter-intuitive findings are the most valuable ones — they challenge assumptions and drive real business change.",
        achievements: [
          "Published complete analysis to GitHub with documented README",
          "LinkedIn post on findings generated engagement from data analytics professionals",
          "Identified that niche and authenticity outperform raw reach — a finding applicable to D2C marketing strategy"
        ]
      },
      links: [
        { label: "View on GitHub", type: "github", url: "https://github.com/kritikajain14/instagram-influencer-analysis" },
        { label: "Watch Demo", type: "live", url: "https://youtu.be/HPfBTvNmTx8" }
      ]
    }
  ];

  const certificates = [
    // {
    //   title: "Google Data Analytics Professional Certificate",
    //   issuer: "Coursera / Google",
    //   date: "2026",
    //   icon: <FaCertificate className="text-xl text-white" />,
    //   imageUrl: "/public/certificates/google-data-analytics.png",
    //   pdfUrl: "/public/certificates/google-data-analytics.pdf",
    //   skills: ["Data Cleaning", "SQL", "Tableau", "Spreadsheets", "R"]
    // },
    {
      title: "Deloitte Data Analytics Virtual Experience",
      issuer: "Forage",
      date: "Feb 2026",
      icon: <FaAward className="text-xl text-white" />,
      imageUrl: "/public/certificates/Deloitte Certificate.jpeg",
      pdfUrl: "/public/certificates/Deloitte Data Analytics Certificate.pdf",
      skills: ["Data Analysis", "Forensic Technology", "Excel", "Tableau"]
    },
    {
      title: "SQL (Basic) Certificate",
      issuer: "HackerRank",
      date: "2026",
      icon: <FaDatabase className="text-xl text-white" />,
      imageUrl: "/public/certificates/Sql Certificate.jpeg",
      pdfUrl: "/public/certificates/hackerrank sql certificate.pdf",
      skills: ["SQL", "Joins", "Aggregations", "Filtering", "Database Queries"]
    }
  ];

  const additionalProjects = [
    {
      title: "Marketing Channel Attribution Dashboard",
      description: "Power BI dashboard analyzing 5 acquisition channels (Direct, Influencer, Organic, Instagram, Google Ads) using 4 CSVs. KPI cards, channel-specific hex coding, and DAX measures.",
      techStack: ["Power BI", "DAX", "CSV data modeling", "KPI Cards"],
      metrics: "Organic channel showed highest ROAS; Influencer had lowest conversion rate",
      github: "https://github.com/kritikajain14/channel-attribution-model"
    },
    {
      title: "India Job Market — Skill Gap Analysis",
      description: "End-to-end analysis of 4,768 Indian job postings across 17 cities and 107 skills. Used NLP (spaCy + regex) to extract skills from JDs, SQL window functions for city/role-level frequency, and Tableau for a 4-chart dashboard.",
      techStack: ["Python", "Pandas", "spaCy", "SQL", "Excel", "Power Query", "Tableau"],
      metrics: "Python leads demand in ~35% of JDs; Deep Learning commands highest avg. salary (~₹25 LPA)",
      github: "https://github.com/kritikajain14/India_Job_Analysis"
    },
    {
      title: "HR Attrition Analysis",
      description: "Analyzed IBM HR Analytics data (1,470 employees, 35 features) across 3 Power BI pages. Built DAX measures for attrition rate, active headcount, and avg. income. Applied conditional formatting and identified tenure as root cause of churn.",
      techStack: ["Power BI", "DAX", "Power Query", "IBM HR Dataset"],
      metrics: "16.12% attrition rate — Sales (56% of exits), lowest salary band (69% of exits), Year 1–2 tenure as top risk",
      github: "https://github.com/kritikajain14/HR-Attrition-Analysis"
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <ParticleBackground />

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {['hero', 'about', 'skills', 'certificates', 'projects', 'contact'].map((section) => (
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

      {/* Hero Section */}
      <section id="hero" className="min-h-screen section-spacing relative flex items-center">
        <div className="grid-bg absolute inset-0" />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-block mb-8"
            >
              <div className="profile-image-container mx-auto">
                <img src={profileImage} alt="Kritika Jain" className="profile-image" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="gradient-text">Hi, I'm Kritika</span>
              </h1>

              <h2 className="text-2xl md:text-3xl mb-6 text-[#C9B8D9]">
                Data Analyst · Python · SQL · Power BI · Tableau
              </h2>

              <p className="text-xl mb-8 text-[#C9B8D9] max-w-3xl mx-auto leading-relaxed">
                I turn messy data into decisions that matter. With a background in engineering and full-stack development, I bring a technical edge to analytics — writing clean SQL, building Python-based EDA pipelines, and designing dashboards that tell the full story.
              </p>

              <div className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl bg-linear-to-r from-[#420D4B]/20 to-transparent border border-[#210635]">
                <p className="text-[#C9B8D9] italic text-lg">
                  "Data only has value when it changes a decision. I build analyses that get people to act — not just nod."
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="btn-primary flex items-center justify-center gap-3"
                >
                  See My Projects <FaArrowRight />
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
                  <FaGithub /> View GitHub
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

      {/* About Section */}
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
              My Journey into Data
            </h2>

            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-linear-to-r from-[#420D4B]/20 to-transparent">
                <h3 className="text-xl font-bold mb-4 text-[#F5D5E0]">From Engineering to Analytics</h3>
                <p className="text-[#C9B8D9] leading-relaxed">
                  I graduated with a B.Tech in Electronics and Communication Engineering from GGSIPU, but my real education happened when I started asking
                  <span className="text-[#F5D5E0] font-medium"> "what does this data actually mean?" </span>
                  That question led me from building full-stack apps to building analyses — and I haven't looked back. My engineering background means I understand systems deeply, which makes me a stronger analyst.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-linear-to-br from-[#7B337E]/10 to-transparent border border-[#7B337E]/20">
                  <h4 className="text-lg font-bold mb-3 text-[#F5D5E0]">My Analytics Philosophy</h4>
                  <ul className="space-y-3">
                    {[
                      "Every number in a dashboard represents a real person or decision",
                      "Bad data hygiene produces confident wrong answers — clean first",
                      "The best insight is the one that's actually communicated",
                      "Understanding the business question is half the analysis"
                    ].map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="p-1 rounded bg-[#7B337E] mt-1 shrink-0"><FaStar className="text-xs text-white" /></div>
                        <span className="text-[#C9B8D9]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-linear-to-br from-[#6667AB]/10 to-transparent border border-[#6667AB]/20">
                  <h4 className="text-lg font-bold mb-3 text-[#F5D5E0]">What Drives Me</h4>
                  <ul className="space-y-3">
                    {[
                      "Finding the counter-intuitive insight that changes a strategy",
                      "Making analysis accessible — charts non-analysts actually understand",
                      "Building in public: every project documented on GitHub and LinkedIn",
                      "Bridging technical depth with business context"
                    ].map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="p-1 rounded bg-[#6667AB] mt-1 shrink-0"><FaRocket className="text-xs text-white" /></div>
                        <span className="text-[#C9B8D9]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-linear-to-r from-[#420D4B]/30 to-transparent">
                <p className="text-[#C9B8D9] leading-relaxed">
                  When I'm not writing SQL or building Power BI dashboards, you'll find me on LinkedIn sharing what I'm learning — from Python EDA outputs to surprising findings about influencer marketing. I believe in
                  <span className="text-[#F5D5E0]"> learning loudly</span> — posting the work, the failures, and the "wait, that's weird" moments.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-spacing">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">My Analytics Toolkit</h2>
            <p className="text-[#C9B8D9] max-w-3xl mx-auto">
              Tools I use daily to clean, analyze, model, and visualize data — built through structured self-learning and real projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsCategories.map((category) => (
              <SkillCategory key={category.title} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
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
              Each project starts with a business question, not a dataset. Here's how I've been thinking.
            </p>
          </motion.div>

          <div className="space-y-16">
            <SectionHeader
              eyebrow="Case Studies"
              icon={FaChartLine}
              title="Featured Projects"
              description="End-to-end analyses built around real business problems — from question to insight to recommendation."
            />
            {projectStories.map((project, index) => (
              <ProjectStoryCard key={index} project={project} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <SectionHeader
                eyebrow="Quick Wins"
                icon={FaDatabase}
                title="More Projects"
                description="Focused analyses across attribution, NLP, and HR analytics — each with a clear business finding."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {additionalProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="compact-project-card p-7 flex flex-col"
                >
                  <h4 className="text-lg font-bold mb-3 gradient-text leading-snug">{project.title}</h4>
                  <p className="text-[#C9B8D9] mb-5 text-sm leading-relaxed flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.techStack.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-linear-to-r from-[#7B337E]/20 to-[#6667AB]/20 text-[#C9B8D9] text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-[#210635] flex items-start justify-between gap-3">
                    <span className="text-[#F5D5E0] text-xs font-medium leading-snug flex-1">{project.metrics}</span>
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="text-[#7B337E] hover:text-[#F5D5E0] transition-colors duration-300 flex items-center gap-1.5 text-sm shrink-0">
                      <FaGithub /> Code
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="section-spacing">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Credentials"
            icon={FaTrophy}
            title="Certifications"
            description="Formal credentials backing up the skills I'm applying in real projects"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <CertificateCard key={index} cert={cert} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
              Let's Talk Data
            </h2>
            <p className="text-[#C9B8D9] max-w-2xl mx-auto mb-12 text-lg">
              Open to data analyst roles, freelance analytics projects, and conversations with people who love turning numbers into decisions.
            </p>

            <div className="max-w-3xl mx-auto mb-12 p-8 rounded-3xl glass">
              <p className="text-[#C9B8D9] mb-6">
                I'm a <span className="text-[#F5D5E0]">recent B.Tech graduate</span> actively building in public — every project, finding, and lesson goes on LinkedIn and GitHub. If you're hiring for an analyst role or want to collaborate on an analytics project, I'd love to connect.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[#C9B8D9]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#7B337E] animate-pulse"></div>
                  <span>Open to full-time analyst roles</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#6667AB] animate-pulse"></div>
                  <span>Available for freelance data projects</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a href="mailto:jainkritika2020@gmail.com" className="contact-link group">
                <div className="p-3 rounded-lg bg-linear-to-br from-[#7B337E] to-[#6667AB] group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope className="text-xl text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#F5D5E0]">Email Me</p>
                  <p className="text-sm text-[#C9B8D9]">jainkritika2020@gmail.com</p>
                  <p className="text-xs text-[#7B337E] mt-1">Usually replies within 24 hours</p>
                </div>
              </a>

              <a href="https://github.com/kritikajain14/" target="_blank" rel="noopener noreferrer" className="contact-link group">
                <div className="p-3 rounded-lg bg-linear-to-br from-[#7B337E] to-[#6667AB] group-hover:scale-110 transition-transform duration-300">
                  <FaGithub className="text-xl text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#F5D5E0]">GitHub</p>
                  <p className="text-sm text-[#C9B8D9]">@kritikajain14</p>
                  <p className="text-xs text-[#7B337E] mt-1">All projects are public & documented</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/kritika-jain-b89334234?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="contact-link group">
                <div className="p-3 rounded-lg bg-linear-to-br from-[#7B337E] to-[#6667AB] group-hover:scale-110 transition-transform duration-300">
                  <FaLinkedin className="text-xl text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#F5D5E0]">LinkedIn</p>
                  <p className="text-sm text-[#C9B8D9]">Kritika Jain</p>
                  <p className="text-xs text-[#7B337E] mt-1">Sharing analytics insights weekly</p>
                </div>
              </a>
            </div>

            <div className="mt-16">
              <a href="/Kritika_Jain_Resume.pdf" download className="btn-accent-outline flex items-center justify-center gap-6 mx-auto text-lg">
                <FaDownload /> Download My Resume (PDF)
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#210635]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="text-left">
              <p className="text-[#F5D5E0] font-bold text-xl">Kritika Jain</p>
              <p className="text-[#C9B8D9] text-sm">Data Analyst · Turning data into decisions, one project at a time</p>
            </div>
            <div className="flex gap-4">
              <a href="https://github.com/kritikajain14/" className="social-icon"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/kritika-jain-b89334234?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="social-icon"><FaLinkedin /></a>
              <a href="mailto:jainkritika2020@gmail.com" className="social-icon"><FaEnvelope /></a>
            </div>
          </div>
          <div className="pt-6 border-t border-[#210635]">
            <p className="text-[#C9B8D9] text-sm">
              © {new Date().getFullYear()} Made with 💜 by Kritika Jain. Data is just stories waiting to be told.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
