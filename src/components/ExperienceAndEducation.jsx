import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function ExperienceAndEducation({ experiences, education }) {
  return (
    <section id="parcours" className="bg-[#f2ebf8] py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* EXPÉRIENCES */}
          <div>
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#f2547d]">
              <Briefcase className="h-4 w-4" />
              <span>Parcours professionnel</span>
            </div>
            <h2 className="mt-2 font-serif-display text-3xl font-extrabold text-[#5a2a82]">
              Expériences &amp; Stages
            </h2>

            <ol className="mt-8 space-y-5">
              {experiences.map((exp) => (
                <li
                  key={exp.id}
                  className="rounded-3xl border border-[#e2d7ec] bg-white p-6 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-[#f2ebf8] px-3 py-1 text-xs font-bold text-[#5a2a82]">
                      {exp.period}
                    </span>
                    <span className="text-xs font-semibold text-[#2f6f7e]">{exp.type}</span>
                  </div>
                  <h3 className="mt-3 font-serif-display text-lg font-bold text-[#1d1a2f]">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-[#5b5572]">
                    {exp.organization} · {exp.location}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#5b5572]">{exp.description}</p>
                  <ul className="mt-3 space-y-1.5">
                    {exp.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-xs text-[#1d1a2f]">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#f2547d]" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-[#fbf8fc] px-2.5 py-1 text-[11px] font-semibold text-[#5a2a82] ring-1 ring-[#e2d7ec]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* FORMATION */}
          <div>
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-[#f2547d]">
              <GraduationCap className="h-4 w-4" />
              <span>Parcours académique</span>
            </div>
            <h2 className="mt-2 font-serif-display text-3xl font-extrabold text-[#5a2a82]">
              Formation
            </h2>

            <ol className="mt-8 space-y-5">
              {education.map((edu) => (
                <li
                  key={edu.period}
                  className="rounded-3xl border border-[#e2d7ec] bg-white p-6 shadow-xs"
                >
                  <span className="inline-block rounded-full bg-[#f2ebf8] px-3 py-1 text-xs font-bold text-[#5a2a82]">
                    {edu.period}
                  </span>
                  <h3 className="mt-3 font-serif-display text-lg font-bold text-[#1d1a2f]">
                    {edu.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#2f6f7e]">{edu.institution}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5b5572]">{edu.details}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
