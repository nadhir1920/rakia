import { useState } from 'react';
import { Sparkles, ExternalLink, ArrowUpRight, X, CheckCircle2 } from 'lucide-react';

const CATEGORIES = ['Tous', 'Full-Stack', 'Front-End', 'UI/UX & E-Commerce'];

export default function ProjectsSection({ projects }) {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeCategory === 'Tous'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projets" className="bg-[#f2ebf8] py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#f2547d]">
              Réalisations sélectionnées
            </span>
            <h2 className="mt-2 font-serif-display text-3xl font-extrabold text-[#5a2a82] sm:text-4xl">
              Projets &amp; Applications
            </h2>
            <p className="mt-2 max-w-2xl text-base text-[#5b5572]">
              Applications full-stack modernes (React, Angular, Laravel, Spring Boot) et interfaces UI/UX conçues avec rigueur.
            </p>
            <p className="mt-2 text-xs text-[#5b5572]">Les images de certains projets sont des visuels de présentation / maquettes, pas des captures authentifiées de sites déployés.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  activeCategory === cat
                    ? 'bg-[#5a2a82] text-white shadow-sm'
                    : 'border border-[#e2d7ec] bg-white text-[#5b5572] hover:border-[#5a2a82]/40 hover:text-[#5a2a82]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#e2d7ec] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5a2a82]/10"
            >
              <div className="relative h-48 overflow-hidden bg-[#1d1a2f]/5">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#5a2a82] shadow-xs">
                    {project.year}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#f2547d] px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
                      <Sparkles className="h-3 w-3" />
                      Phare
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2f6f7e]">
                  {project.context}
                </span>
                <h3 className="mt-1.5 font-serif-display text-xl font-bold text-[#1d1a2f] group-hover:text-[#5a2a82]">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5b5572]">
                  {project.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-lg bg-[#f2ebf8] px-2.5 py-1 text-xs font-medium text-[#5a2a82]"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="rounded-lg bg-[#fbf8fc] px-2.5 py-1 text-xs font-medium text-[#5b5572]">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-[#e2d7ec]/70 pt-4 text-xs font-semibold text-[#5a2a82]">
                  <span>{project.metrics}</span>
                  <span className="inline-flex items-center gap-1 text-[#f2547d]">
                    {project.demoLabel}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal Étude de cas */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d1a2f]/60 p-4 backdrop-blur-xs"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Fermer"
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1d1a2f] shadow-md transition hover:bg-[#f2547d] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="h-56 w-full overflow-hidden bg-[#f2ebf8]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#f2ebf8] px-3 py-1 text-xs font-bold text-[#5a2a82]">
                  {selectedProject.category}
                </span>
                <span className="rounded-full border border-[#e2d7ec] px-3 py-1 text-xs font-medium text-[#5b5572]">
                  {selectedProject.context} · {selectedProject.year}
                </span>
              </div>

              <h3
                id="project-modal-title"
                className="mt-3 font-serif-display text-2xl font-extrabold text-[#1d1a2f]"
              >
                {selectedProject.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#5b5572] sm:text-base">
                {selectedProject.summary}
              </p>

              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5a2a82]">
                  Architecture &amp; Contributions clés
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {selectedProject.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#1d1a2f]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2f6f7e]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5a2a82]">
                  Stack Technique
                </h4>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-xl border border-[#e2d7ec] bg-[#fbf8fc] px-3 py-1 text-xs font-semibold text-[#1d1a2f]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#e2d7ec] pt-5">
                <span className="text-xs font-semibold text-[#2f6f7e]">
                  {selectedProject.metrics}
                </span>
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#5a2a82] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3e1b5c]"
                >
                  <span>Voir le profil GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
