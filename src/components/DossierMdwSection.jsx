import { useState } from 'react';
import {
  Compass,
  FileText,
  Globe,
  Mic,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Award,
} from 'lucide-react';

const TAB_ICONS = {
  'livrable-1': Compass,
  'livrable-2': FileText,
  'livrable-3': Globe,
  'livrable-4': Mic,
};

export default function DossierMdwSection({ dossier, linkedinUrl }) {
  const [activeId, setActiveId] = useState('livrable-1');
  const [cvMode, setCvMode] = useState('human'); // 'ai' | 'human'
  const [scores, setScores] = useState(() =>
    dossier.deliverables[3].rubric.reduce((acc, item) => {
      acc[item.id] = item.selfScore;
      return acc;
    }, {})
  );

  const active = dossier.deliverables.find((d) => d.id === activeId);
  const totalScore = Object.values(scores).reduce((sum, v) => sum + Number(v || 0), 0);

  return (
    <section id="dossier-mdw" className="py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#f2547d]">
              <Sparkles className="h-3.5 w-3.5" />
              {dossier.group}
            </span>
            <h2 className="mt-2 font-serif-display text-3xl font-extrabold text-[#5a2a82] sm:text-4xl">
              Dossier de Candidature Vivant
            </h2>
            <p className="mt-2 max-w-2xl text-base text-[#5b5572]">
              {dossier.courseTitle} — Intégration des 4 livrables semestriels et de la démarche réflexive face à l&apos;IA.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-[#e2d7ec] bg-[#f2ebf8] px-4 py-2.5 text-xs font-semibold text-[#5a2a82]">
            <Award className="h-4 w-4 text-[#f2547d]" />
            <span>Évaluation continue · 100 points</span>
          </div>
        </div>

        {/* 4 Deliverables Tabs */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {dossier.deliverables.map((item) => {
            const Icon = TAB_ICONS[item.id] || FileText;
            const isSelected = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`flex flex-col items-start rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? 'border-[#5a2a82] bg-[#5a2a82] text-white shadow-lg shadow-[#5a2a82]/20'
                    : 'border-[#e2d7ec] bg-white text-[#1d1a2f] hover:border-[#5a2a82]/40 hover:bg-[#fbf8fc]'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider ${
                      isSelected ? 'text-[#f2ebf8]' : 'text-[#f2547d]'
                    }`}
                  >
                    {item.step}
                  </span>
                  <Icon className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-[#5a2a82]'}`} />
                </div>
                <strong className="mt-2 font-serif-display text-base font-bold leading-snug">
                  {item.title}
                </strong>
              </button>
            );
          })}
        </div>

        {/* Active Deliverable Content */}
        <div className="mt-6 rounded-3xl border border-[#e2d7ec] bg-white p-6 shadow-sm sm:p-8">
          <div className="border-b border-[#e2d7ec] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2f6f7e]">
              {active.step}
            </span>
            <h3 className="mt-1 font-serif-display text-2xl font-extrabold text-[#1d1a2f]">
              {active.title}
            </h3>
            <p className="mt-1 text-sm text-[#5b5572]">{active.subtitle}</p>
          </div>

          {/* LIVRABLE 1 */}
          {active.id === 'livrable-1' && (
            <div className="mt-6 space-y-6">
              <div className="rounded-2xl border border-[#5a2a82]/15 bg-[#f2ebf8]/70 p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5a2a82]">
                  Métier cible identifié
                </span>
                <p className="mt-1 font-serif-display text-xl font-bold text-[#1d1a2f]">
                  {active.targetJob}
                </p>
                <p className="mt-2 text-sm text-[#5b5572]">{active.aiPromptSummary}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-[#e2d7ec] p-5">
                  <h4 className="text-sm font-bold text-[#2f6f7e]">Forces validées</h4>
                  <ul className="mt-3 space-y-2.5">
                    {active.strengths.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-[#1d1a2f]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-[#e2d7ec] p-5">
                  <h4 className="text-sm font-bold text-[#f2547d]">Axes d&apos;amélioration ciblés</h4>
                  <ul className="mt-3 space-y-2.5">
                    {active.gapsToWorkOn.map((g) => (
                      <li key={g} className="flex items-start gap-2 text-sm text-[#1d1a2f]">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#cf9c46]" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border-l-4 border-[#5a2a82] bg-[#fbf8fc] p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5a2a82]">
                  Note de synthèse critique sur l&apos;analyse IA
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#1d1a2f]">
                  {active.criticalNote}
                </p>
              </div>
            </div>
          )}

          {/* LIVRABLE 2 */}
          {active.id === 'livrable-2' && (
            <div className="mt-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-semibold text-[#1d1a2f]">
                  Comparatif : Version IA brute vs. Version personnalisée
                </span>
                <div className="inline-flex rounded-full border border-[#e2d7ec] bg-[#fbf8fc] p-1">
                  <button
                    type="button"
                    onClick={() => setCvMode('ai')}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                      cvMode === 'ai'
                        ? 'bg-[#f2547d] text-white'
                        : 'text-[#5b5572] hover:text-[#1d1a2f]'
                    }`}
                  >
                    1. Version IA (Brute)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCvMode('human')}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                      cvMode === 'human'
                        ? 'bg-[#5a2a82] text-white'
                        : 'text-[#5b5572] hover:text-[#1d1a2f]'
                    }`}
                  >
                    2. Version Retravaillée
                  </button>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-[#e2d7ec] bg-[#fbf8fc] p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5a2a82]">
                    Curriculum Vitae — {cvMode === 'ai' ? active.comparison.aiDraft.label : active.comparison.humanEdited.label}
                  </span>
                  <p className="mt-3 whitespace-pre-line text-xs leading-relaxed text-[#1d1a2f] sm:text-sm">
                    {cvMode === 'ai'
                      ? active.comparison.aiDraft.cvFull
                      : active.comparison.humanEdited.cvFull}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e2d7ec] bg-[#fbf8fc] p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2f6f7e]">
                    Lettre de Motivation — {cvMode === 'ai' ? 'État Initial (IA)' : 'État Final (Personnalisé)'}
                  </span>
                  <p className="mt-3 whitespace-pre-line text-xs leading-relaxed text-[#1d1a2f] sm:text-sm">
                    {cvMode === 'ai'
                      ? active.comparison.aiDraft.letterFull
                      : active.comparison.humanEdited.letterFull}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5a2a82]">
                  Journal des modifications justifiées
                </h4>
                <div className="mt-3 space-y-3">
                  {active.justifications.map((j) => (
                    <div
                      key={j.change}
                      className="rounded-2xl border border-[#e2d7ec] p-4"
                    >
                      <strong className="block text-sm text-[#1d1a2f]">{j.change}</strong>
                      <p className="mt-1 text-sm text-[#5b5572]">{j.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LIVRABLE 3 */}
          {active.id === 'livrable-3' && (
            <div className="mt-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#5a2a82]/20 bg-[#f2ebf8]/70 p-5">
                <div>
                  <h4 className="font-serif-display text-lg font-bold text-[#5a2a82]">
                    Présence Professionnelle Active
                  </h4>
                  <p className="mt-1 text-sm text-[#5b5572]">
                    Ce portfolio React.js + mon profil LinkedIn constituent ma vitrine de candidature PFE.
                  </p>
                </div>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#5a2a82] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3e1b5c]"
                >
                  <span>Voir mon profil LinkedIn</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5a2a82]">
                  Preuve de veille sur le marché de l&apos;emploi réel (Offres PFE ciblées)
                </h4>
                <div className="mt-3 grid gap-4 md:grid-cols-3">
                  {active.marketWatch.map((offer) => (
                    <div
                      key={offer.role}
                      className="flex flex-col rounded-2xl border border-[#e2d7ec] bg-[#fbf8fc] p-5"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#f2547d]">
                        {offer.companyType}
                      </span>
                      <h5 className="mt-1.5 font-serif-display text-base font-bold text-[#1d1a2f]">
                        {offer.role}
                      </h5>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {offer.requiredSkills.map((sk) => (
                          <span
                            key={sk}
                            className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-[#5a2a82] ring-1 ring-[#e2d7ec]"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                      <p className="mt-auto pt-4 text-xs leading-relaxed text-[#2f6f7e]">
                        <strong>Preuve d&apos;adéquation :</strong> {offer.matchEvidence}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LIVRABLE 4 */}
          {active.id === 'livrable-4' && (
            <div className="mt-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {active.interviewQa.map((qa) => (
                  <div key={qa.question} className="rounded-2xl border border-[#e2d7ec] bg-[#fbf8fc] p-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#f2547d]">
                      Préparation Entretien
                    </span>
                    <h4 className="mt-1 text-sm font-bold text-[#1d1a2f]">{qa.question}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#5b5572]">{qa.answer}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-[#e2d7ec] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-serif-display text-lg font-bold text-[#5a2a82]">
                    Grille d&apos;auto-évaluation (Pondération officielle)
                  </h4>
                  <span className="rounded-full bg-[#5a2a82] px-4 py-1 text-sm font-bold text-white">
                    Total : {totalScore} / 100 pts
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  {active.rubric.map((row) => (
                    <div key={row.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-[#1d1a2f]">{row.criterion}</span>
                        <span className="font-bold text-[#5a2a82]">
                          {scores[row.id]} / {row.maxPoints} pts
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={row.maxPoints}
                        value={scores[row.id]}
                        onChange={(e) =>
                          setScores((prev) => ({ ...prev, [row.id]: Number(e.target.value) }))
                        }
                        className="h-2 w-full cursor-pointer accent-[#5a2a82]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
