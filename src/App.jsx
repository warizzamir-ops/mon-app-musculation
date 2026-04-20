import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dumbbell, 
  Utensils, 
  Calendar as CalendarIcon, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Activity, 
  Zap, 
  Target, 
  Trophy, 
  BookOpen, 
  BrainCircuit, 
  Coffee, 
  Scale, 
  Clock,
  Moon,
  Apple
} from 'lucide-react';

// --- 1. CONSTANTES ET DONNÉES DU PROGRAMME ---

const NUTRITION_LISTE = {
  proteines: [
    { nom: "Blanc de Poulet", p: 31, g: 0, l: 3.6 },
    { nom: "Colin / Cabillaud", p: 18, g: 0, l: 0.8 },
    { nom: "Œufs de poule (x1)", p: 7, g: 0.6, l: 5 },
    { nom: "Steak Haché 5%", p: 25, g: 0, l: 5 },
    { nom: "Fromage Blanc 0%", p: 8, g: 4, l: 0 },
  ],
  glucides: [
    { nom: "Riz Basmati (sec)", p: 7, g: 78, l: 1 },
    { nom: "Pâtes Complètes (sec)", p: 13, g: 68, l: 2 },
    { nom: "Patate Douce", p: 1.6, g: 20, l: 0.1 },
    { nom: "Flocons d'Avoine", p: 13, g: 60, l: 7 },
  ],
  lipides: [
    { nom: "Avocat (x1)", p: 2, g: 9, l: 15 },
    { nom: "Beurre de Cacahuète", p: 25, g: 20, l: 50 },
    { nom: "Huile d'Olive", p: 0, g: 0, l: 100 },
  ]
};

const PROGRAMME = [
  { 
    id: 'push', 
    titre: 'SESSION 01 : PUSH', 
    type: 'Pectoraux & Épaules', 
    bgImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000', 
    exercices: [
      { id: 'dc_halteres_s1', nom: 'DC Haltères', details: '3 x 8-10 reps • Tempo lent', repos: '120s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2000/05/developpe-couche-halteres-exercice-musculation.gif' },
      { id: 'di_halteres_s1', nom: 'D. Incliné Haltères', details: '3 x 10-12 reps • Focus haut', repos: '90s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2000/06/developpe-incline-halteres-exercice-musculation.gif' },
      { id: 'ecartes_poulie_s1', nom: 'Écartés Poulie', details: '3 x 15 reps • Peak contraction', repos: '60s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2023/07/ecarte-a-la-poulie-vis-a-vis-haute-a-genoux.gif' },
      { id: 'dm_halteres_s1', nom: 'D. Militaire Haltères', details: '3 x 10 reps • Assis', repos: '90s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2022/02/developpe-epaule-halteres.gif' },
      { id: 'triceps_corde_s1', nom: 'Triceps Corde', details: '3 x 12-15 reps', repos: '60s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2021/10/extension-triceps-poulie-haute-corde.gif' },
    ]
  },
  { id: 'pull', titre: 'SESSION 02 : PULL', type: 'Dos & Arrière Épaule', bgImg: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1000', exercices: [
    { id: 'tirage_vertical_s2', nom: 'Tirage Vertical', details: '3 x 8-10 reps', repos: '90s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2021/11/tirage-vertical-poitrine.gif' },
    { id: 'rowing_haltere_s2', nom: 'Rowing Haltère (1 bras)', details: '3 x 10-12 reps', repos: '90s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2021/08/rowing-haltere-un-bras.gif' },
    { id: 'face_pull_s2', nom: 'Face-Pull', details: '4 x 15 reps', repos: '60s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2022/01/face-pull.gif' },
    { id: 'oiseau_halteres_s2', nom: 'Oiseau Haltères', details: '3 x 15-20 reps', repos: '60s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2021/12/oiseau-assis-sur-banc.gif' },
    { id: 'curl_halteres_s2', nom: 'Curl Haltères', details: '3 x 10-12 reps', repos: '60s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2021/10/curl-haltere-incline.gif' },
  ]},
  { id: 'legs', titre: 'SESSION 03 : LEGS', type: 'Quadriceps & Mollets', bgImg: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000', exercices: [
    { id: 'hack_squat_s3', nom: 'Hack Squat', details: '3 x 10 reps', repos: '120s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2022/01/hack-squat.gif' },
    { id: 'leg_curl_s3', nom: 'Leg Curl', details: '3 x 12-15 reps', repos: '60s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2022/02/leg-curl-assis-machine.gif' },
    { id: 'mollets_s3', nom: 'Mollets', details: '4 x 15 reps', repos: '60s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2021/11/extensions-mollets-hack-squat.gif' },
  ]},
  { id: 'upper', titre: 'SESSION 04 : UPPER', type: 'Haut du Corps Lourd', bgImg: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000', exercices: [
    { id: 'di_halteres_upper_s4', nom: 'D. Incliné Haltères', details: '3 x 10 reps • Tempo 4s', repos: '120s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2000/06/developpe-incline-halteres-exercice-musculation.gif' },
    { id: 'tirage_horizontal_s4', nom: 'Tirage Horizontal', details: '3 x 10-12 reps', repos: '90s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2022/02/tirage-horizontal-poulie.gif' },
  ]},
  { id: 'lower', titre: 'SESSION 05 : LOWER', type: 'Chaîne Postérieure', bgImg: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000', exercices: [
    { id: 'sdt_jt_s5', nom: 'SDT Jambes Tendues', details: '3 x 12 reps', repos: '90s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2022/04/souleve-de-terre-jambes-tendues.gif' },
    { id: 'leg_extension_s5', nom: 'Leg Extension', details: '3 x 15 reps', repos: '60s', gifUrl: 'https://www.docteur-fitness.com/wp-content/uploads/2000/06/leg-extension-exercice-musculation.gif' },
  ]}
];

// --- 2. UTILITAIRES ---

const isWeighInDate = (date) => {
  const refDate = new Date(2026, 3, 12);
  const diffTime = date.getTime() - refDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return date.getDay() === 0 && Math.abs(Math.floor(diffDays / 7)) % 2 === 0;
};

// --- 3. COMPOSANTS UI GÉNÉRIQUES ---

const Background = ({ imageUrl }) => (
  <div className="fixed inset-0 pointer-events-none z-0 bg-black overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
      style={{ 
        backgroundImage: `url(${imageUrl || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070'})`,
        filter: 'brightness(0.28) saturate(0.5) contrast(1.1)'
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
  </div>
);

const PremiumCard = ({ children, className = "", noPadding = false, isGlow = false }) => (
  <div className={`relative group backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 ${isGlow ? 'border-neon-pulse shadow-volt-glow' : ''} ${className}`}>
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}></div>
    <div className={noPadding ? "" : "p-6"}>{children}</div>
  </div>
);

const ProgressChart = ({ data, color = "#dcf821", label = "KG" }) => {
  if (!data || data.length < 2) return <div className="h-32 flex items-center justify-center text-white/20 text-xs italic text-center uppercase tracking-widest">Données insuffisantes</div>;
  
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const width = 300; const height = 150;
  const values = sortedData.map(d => Number(d.val || 0));
  const min = Math.min(...values) * 0.98; const max = Math.max(...values) * 1.02;
  const range = (max - min) || 1;
  
  const points = sortedData.map((d, i) => {
    const val = Number(d.val || 0);
    const x = (i / (sortedData.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="pt-4 pb-8">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible" style={{ maxHeight: '200px' }}>
        <line x1="0" y1="0" x2="0" y2={height} stroke="white" strokeOpacity="0.1" strokeWidth="1" />
        <line x1="0" y1={height} x2={width} y2={height} stroke="white" strokeOpacity="0.1" strokeWidth="1" />
        <text x="-8" y="10" fill={color} fontSize="10" className="font-digital" textAnchor="end">{Math.round(max * 10) / 10}</text>
        <text x="-8" y={height} fill={color} fontSize="10" className="font-digital" textAnchor="end" alignmentBaseline="middle">{Math.round(min * 10) / 10}</text>
        <polyline fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={points} className={`drop-shadow-[0_0_8px_${color}66]`} />
        {sortedData.map((d, i) => (
          <circle key={i} cx={(i / (sortedData.length - 1)) * width} cy={height - ((Number(d.val || 0) - min) / range) * height} r="4" fill={color} />
        ))}
      </svg>
    </div>
  );
};

// --- 4. VUES DE L'INTERFACE ---

function WelcomeScreen({ onEnter }) {
  const isWeighIn = isWeighInDate(new Date());
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <Background imageUrl="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2000" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex flex-col items-center gap-3 text-[#dcf821] mb-8 animate-reveal">
           <div className="h-1 w-12 bg-[#dcf821]"></div>
           <span className="font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs">Objective Density Protocol</span>
        </div>
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.9] text-center">BIENVENUE<br/><span className="text-[#dcf821]">MOHAMED</span><br/>AMINE</h1>
        {isWeighIn && (
          <div className="mt-4 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full flex items-center gap-2 animate-pulse">
            <Scale size={16} className="text-blue-400" />
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest italic">Jour de pesée !</span>
          </div>
        )}
        <div className="mt-16 w-full max-w-xs animate-reveal-delay">
          <button onClick={onEnter} className="group w-full py-6 sm:py-8 bg-white text-black rounded-[2rem] font-black uppercase italic text-xl sm:text-2xl flex items-center justify-center gap-4 transition-all hover:bg-[#dcf821] active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">DÉMARRER <ArrowRight size={28} /></button>
        </div>
      </div>
    </div>
  );
}

function TodayTab({ userData, onValidate, onSaveExercise }) {
  const currentWorkout = PROGRAMME[userData.currentSessionIndex];
  const [inputs, setInputs] = useState({});
  const [savingEx, setSavingEx] = useState(null);

  const handleSaveClick = (exId) => {
    if (inputs[exId]) {
      setSavingEx(exId);
      onSaveExercise(exId, inputs[exId]);
      setTimeout(() => { setInputs(prev => ({ ...prev, [exId]: '' })); setSavingEx(null); }, 500);
    }
  };

  return (
    <div className="space-y-12 pb-40 w-full max-w-3xl mx-auto px-4">
      <header className="space-y-2 pt-4 text-center">
        <h1 className="text-5xl sm:text-7xl font-black text-white italic leading-[0.85] tracking-tighter uppercase">{currentWorkout.titre.split(':')[1].trim()}</h1>
        <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] pt-2 italic">Focus: {currentWorkout.type}</p>
      </header>
      <div className="space-y-20">
        {currentWorkout.exercices.map((ex) => (
          <div key={ex.id} className="space-y-6 animate-reveal">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/10 pb-4 gap-4 text-left">
              <div className="flex-1">
                <h3 className="text-white text-3xl font-black italic uppercase leading-none tracking-tighter">{ex.nom}</h3>
                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="text-[#ff9100] text-[11px] font-black uppercase tracking-widest bg-[#ff9100]/10 px-3 py-1 rounded-full border border-[#ff9100]/20">{ex.details}</span>
                  <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-black uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full bg-white/5">
                    <Clock size={12} className="text-[#dcf821]" />
                    <span>Repos: {ex.repos}</span>
                  </div>
                </div>
              </div>
              {userData.weights?.[ex.id]?.length > 0 && (
                <div className="text-left sm:text-right">
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-tighter mb-1 uppercase italic">Dernier Poids</p>
                  <div className="bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                    <span className="text-2xl text-white/40 font-digital font-bold">
                      {userData.weights[ex.id][userData.weights[ex.id].length - 1].weight} KG
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <div className="inline-block relative w-full sm:w-auto bg-[#0d0d0d] rounded-[1.5rem] overflow-hidden border border-volt-neon shadow-volt-glow-intense animate-neon-pulse">
                {ex.gifUrl ? <img src={ex.gifUrl} alt={ex.nom} className="w-full h-auto max-h-[350px] block object-contain" /> : <div className="w-[300px] aspect-video flex items-center justify-center opacity-10"><Activity size={40}/></div>}
              </div>
            </div>
            <div className="relative flex gap-3 items-center max-w-md mx-auto w-full">
              <input type="number" placeholder="POIDS" value={inputs[ex.id] || ''} className="flex-1 bg-white/[0.05] border border-white/5 rounded-2xl py-6 px-8 text-[#dcf821] text-3xl font-digital focus:outline-none focus:ring-2 focus:ring-[#dcf821]/50 transition-all placeholder:text-white/10" onChange={(e) => setInputs(p => ({ ...p, [ex.id]: e.target.value }))} />
              <button onClick={() => handleSaveClick(ex.id)} disabled={!inputs[ex.id]} className={`h-16 px-8 rounded-2xl font-black uppercase italic transition-all active:scale-95 ${savingEx === ex.id ? 'bg-white text-black' : (inputs[ex.id] ? 'bg-[#dcf821] text-black shadow-volt-glow' : 'bg-white/5 text-white/20 opacity-50')}`}>
                {savingEx === ex.id ? '...' : 'OK'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => onValidate(inputs)} className="w-full py-8 bg-[#dcf821] text-black rounded-[2.5rem] font-black uppercase italic text-2xl shadow-volt-glow transition-all active:scale-95 flex items-center justify-center gap-4">SESSION COMPLETE <ArrowRight size={28} /></button>
    </div>
  );
}

function DataTab({ userData, onUpdateCalendar, onSaveBodyWeight }) {
  const [weightInput, setWeightInput] = useState('');
  
  const now = new Date();
  const monthName = now.toLocaleString('fr-FR', { month: 'long' });
  const year = now.getFullYear();
  const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const calendarData = userData.calendarData || {};
  const sportCount = Object.values(calendarData).filter(v => v === 'sport').length;
  const reposCount = Object.values(calendarData).filter(v => v === 'repos').length;

  return (
    <div className="space-y-8 pb-40 animate-reveal text-left w-full max-w-4xl mx-auto px-4">
      <header className="pt-4 text-center"><h1 className="text-6xl font-black text-white italic uppercase tracking-tighter">Data</h1><p className="text-[#dcf821] font-bold text-xs uppercase tracking-[0.4em]">Metrics</p></header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PremiumCard className="border-white/10 shadow-volt-glow">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#dcf821] opacity-60 text-center">SÉANCES SPORT</p>
          <div className="flex items-center gap-3 mt-1 justify-center"><h2 className="text-5xl font-digital text-[#dcf821]">{sportCount}</h2><Trophy size={22} className="text-[#dcf821]/30" /></div>
        </PremiumCard>
        <PremiumCard className="border-white/10 shadow-blue-glow">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#00f2ff] opacity-60 text-center">JOURS REPOS</p>
          <div className="flex items-center gap-3 mt-1 justify-center"><h2 className="text-5xl font-digital text-[#00f2ff]">{reposCount}</h2><Coffee size={22} className="text-[#00f2ff]/30" /></div>
        </PremiumCard>
      </div>
      <PremiumCard className="space-y-6">
        <div className="flex justify-between items-center border-b border-white/10 pb-4 text-left">
          <div className="flex flex-col"><h3 className="text-white font-black italic uppercase text-xl leading-none">Cycle</h3><p className="text-[8px] text-white/30 uppercase tracking-widest mt-1 italic">Clic: Sport • 2 Clics: Repos</p></div>
          <span className="text-[10px] font-bold text-white/40 uppercase">{monthName} {year}</span>
        </div>
        <div className="grid grid-cols-7 gap-2 max-w-md mx-auto">
           {days.map(d => {
             const status = calendarData[d] || null;
             return <button key={d} onClick={() => onUpdateCalendar(d)} className={`aspect-square relative rounded-xl text-[10px] font-digital flex items-center justify-center transition-all ${status === 'sport' ? 'bg-[#dcf821] text-black shadow-volt-glow' : status === 'repos' ? 'bg-[#00f2ff] text-black shadow-blue-glow' : 'bg-white/5 text-white/20 border border-white/5'}`}>{d}</button>
           })}
        </div>
      </PremiumCard>
      <PremiumCard className="space-y-6">
        <h3 className="text-white font-black italic uppercase text-xl text-left">Poids de Corps</h3>
        <ProgressChart data={userData.weightHistory || []} color="#00f2ff" label="KG" />
        <div className="flex gap-4 max-w-md mx-auto w-full">
           <input type="number" placeholder="MASSE (KG)" value={weightInput} onChange={(e) => setWeightInput(e.target.value)} className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-5 text-[#00f2ff] text-xl font-digital focus:outline-none" />
           <button onClick={() => { onSaveBodyWeight(weightInput); setWeightInput(''); }} className="bg-white text-black font-black uppercase italic px-8 rounded-2xl flex-shrink-0 active:scale-95 transition-all">SAVE</button>
        </div>
        <div className="space-y-2 mt-4">
           {userData.weightHistory?.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).map((w, i) => (
             <div key={i} className="p-4 bg-white/5 rounded-xl flex justify-between items-center text-sm font-bold border border-white/5">
               <span className="text-white/30 font-digital">{new Date(w.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
               <span className="text-[#00f2ff] font-digital text-lg">{w.val} KG</span>
             </div>
           ))}
        </div>
      </PremiumCard>
    </div>
  );
}

function CoachTab() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSessionId, setActiveSessionId] = useState(null);

  const trainingSessions = [
    { id: 's01', titre: 'SESSION 01 : PUSH', content: (<div className="space-y-4 text-white/70 text-sm leading-relaxed text-left"><p className="font-bold text-white uppercase text-xs italic border-b border-white/10 pb-2">Objectif : Épaisseur du buste et puissance des épaules.</p><div className="space-y-2 text-left"><h4 className="text-[#dcf821] font-black uppercase text-xs italic">Focus - DC Haltères</h4><p>Plus d'étirement qu'à la barre. Tempo 3-4s en descente.</p></div></div>)},
    { id: 's02', titre: 'SESSION 02 : PULL', content: (<div className="space-y-4 text-white/70 text-sm leading-relaxed text-left"><p className="font-bold text-white uppercase text-xs italic border-b border-white/10 pb-2">Objectif : Posture et largeur du dos.</p><div className="space-y-2 text-left"><h4 className="text-[#dcf821] font-black uppercase text-xs italic">Focus - Face-Pull</h4><p>Correctif n°1. Coudes hauts pour l'arrière de l'épaule.</p></div></div>)},
    { id: 's03', titre: 'SESSION 03 : LEGS', content: (<div className="space-y-4 text-white/70 text-sm leading-relaxed text-left"><p className="font-bold text-white uppercase text-xs italic border-b border-white/10 pb-2">Objectif : Base hormonale solide.</p><div className="space-y-2 text-left"><h4 className="text-[#dcf821] font-black uppercase text-xs italic">Focus - Hack Squat</h4><p>Stabilité totale pour pousser lourd en sécurité.</p></div></div>)},
    { id: 's04', titre: 'SESSION 04 : UPPER', content: (<div className="space-y-4 text-white/70 text-sm leading-relaxed text-left"><p className="font-bold text-white uppercase text-xs italic border-b border-white/10 pb-2">Objectif : "V-Taper" prononcé.</p><div className="space-y-2 text-left"><h4 className="text-[#dcf821] font-black uppercase text-xs italic">Focus - Élévations Latérales</h4><p>Isole le faisceau moyen pour la largeur visuelle.</p></div></div>)},
    { id: 's05', titre: 'SESSION 05 : LOWER', content: (<div className="space-y-4 text-white/70 text-sm leading-relaxed text-left"><p className="font-bold text-white uppercase text-xs italic border-b border-white/10 pb-2">Objectif : Densifier les Ischios/Fessiers.</p><div className="space-y-2 text-left"><h4 className="text-[#dcf821] font-black uppercase text-xs italic">Focus - SDT JT</h4><p>Contrôler l'étirement maximum des ischios.</p></div></div>)}
  ];

  return (
    <div className="space-y-6 pb-40 animate-reveal text-left max-w-4xl mx-auto px-4 text-left">
      <header className="pt-4 text-center"><h1 className="text-6xl font-black text-white italic uppercase tracking-tighter">Coach</h1><p className="text-[#dcf821] font-bold text-xs uppercase tracking-[0.4em]">Savoir c'est Pouvoir</p></header>
      <PremiumCard className="border-volt-neon/20 text-left"><div className="flex items-center gap-4 mb-4 text-left"><BrainCircuit className="text-[#dcf821]" /><h2 className="text-xl font-black italic uppercase tracking-tight">Logique Protocolaire</h2></div>
        <div className="space-y-4 text-white/70 text-sm leading-relaxed text-left">
          <div className="text-left"><h4 className="text-[#dcf821] font-black uppercase text-xs italic text-left">Le Tempo</h4><p>3-4s en descente = plus de densité sur ossature fine.</p></div>
          <div className="text-left"><h4 className="text-[#dcf821] font-black uppercase text-xs italic text-left">Le Cycle</h4><p>Alternance entre PPL (Isolation) et UL (Force).</p></div>
        </div>
      </PremiumCard>
      <div className="grid grid-cols-1 gap-4">
        <PremiumCard noPadding className={`border-white/5 ${activeCategory === 'training' ? 'ring-1 ring-[#dcf821]' : ''}`}>
          <button onClick={() => setActiveCategory(activeCategory === 'training' ? null : 'training')} className="w-full p-6 flex items-center justify-between group">
            <div className="flex items-center gap-4 text-left"><Dumbbell className={activeCategory === 'training' ? 'text-[#dcf821]' : 'text-white/40'} /><h3 className="text-lg font-black uppercase tracking-tight italic">Entraînement</h3></div>
            {activeCategory === 'training' ? <ChevronUp className="text-[#dcf821]" /> : <ChevronDown className="text-white/20" />}
          </button>
          {activeCategory === 'training' && (
            <div className="px-6 pb-8 space-y-4">
              <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide">
                {trainingSessions.map(s => <button key={s.id} onClick={() => setActiveSessionId(activeSessionId === s.id ? null : s.id)} className={`flex-shrink-0 px-4 py-2 rounded-xl font-black text-[10px] border ${activeSessionId === s.id ? 'bg-[#dcf821] text-black border-[#dcf821]' : 'bg-white/5 text-white/40 border-white/10'}`}>{s.id.toUpperCase()}</button>)}
              </div>
              {activeSessionId && <div className="p-4 bg-white/5 rounded-2xl border border-white/10 animate-reveal text-left">{trainingSessions.find(s => s.id === activeSessionId).content}</div>}
            </div>
          )}
        </PremiumCard>
        <PremiumCard noPadding className={`border-white/5 ${activeCategory === 'nutrition' ? 'ring-1 ring-orange-500' : ''}`}>
          <button onClick={() => setActiveCategory(activeCategory === 'nutrition' ? null : 'nutrition')} className="w-full p-6 flex items-center justify-between group text-left">
            <div className="flex items-center gap-4 text-left"><Apple className={activeCategory === 'nutrition' ? 'text-[#ff9100]' : 'text-white/40'} /><h3 className="text-lg font-black uppercase tracking-tight italic">Nutrition</h3></div>
            {activeCategory === 'nutrition' ? <ChevronUp className="text-[#ff9100]" /> : <ChevronDown className="text-white/20" />}
          </button>
          {activeCategory === 'nutrition' && (
            <div className="px-6 pb-8 space-y-6 text-left">
              <p className="text-white font-bold italic border-b border-white/10 pb-2">Manger "utile" pour la croissance.</p>
              <div className="space-y-3 text-left"><h4 className="text-[#ff9100] font-black uppercase text-xs italic text-left">Protéines (Les Briques)</h4><p className="text-white/70 text-sm text-left">Réparent les micro-fissures créé par tes séances.</p></div>
              <div className="space-y-3 text-left"><h4 className="text-[#ff9100] font-black uppercase text-xs italic text-left">Glucides (L'essence)</h4><p className="text-white/70 text-sm text-left">Glycogène stocké = muscles pleins et séances explosives.</p></div>
            </div>
          )}
        </PremiumCard>
        <PremiumCard noPadding className={`border-white/5 ${activeCategory === 'rest' ? 'ring-1 ring-[#00f2ff]' : ''}`}>
          <button onClick={() => setActiveCategory(activeCategory === 'rest' ? null : 'rest')} className="w-full p-6 flex items-center justify-between group text-left">
            <div className="flex items-center gap-4 text-left"><Moon className={activeCategory === 'rest' ? 'text-[#00f2ff]' : 'text-white/40'} /><h3 className="text-lg font-black uppercase tracking-tight italic">Sommeil</h3></div>
            {activeCategory === 'rest' ? <ChevronUp className="text-[#00f2ff]" /> : <ChevronDown className="text-white/20" />}
          </button>
          {activeCategory === 'rest' && (
            <div className="px-6 pb-8 space-y-4 text-left">
              <p className="text-white font-bold italic border-b border-white/10 pb-2 text-left">Le muscle se construit au lit.</p>
              <div className="space-y-3 text-left"><h4 className="text-[#00f2ff] font-black uppercase text-xs italic">Hormone de Croissance</h4><p className="text-white/70 text-sm">Pic naturel uniquement durant le sommeil profond.</p></div>
              <div className="space-y-3 text-left"><h4 className="text-[#00f2ff] font-black uppercase text-xs italic">SNC (Batterie)</h4><p className="text-white/70 text-sm">Recharge ta force nerveuse pour les barres lourdes du lendemain.</p></div>
            </div>
          )}
        </PremiumCard>
      </div>
    </div>
  );
}

function RoadmapTab({ userData }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="space-y-6 pb-40 animate-reveal">
      <header className="pt-4 text-center">
        <h1 className="text-6xl font-black text-white italic uppercase tracking-tighter">Roadmap</h1>
        <p className="text-[#dcf821] font-bold text-xs uppercase tracking-[0.4em]">Le Cycle des 5 Sessions</p>
      </header>
      <div className="space-y-4">
        {PROGRAMME.map((workout, idx) => (
          <div key={workout.id} className="space-y-2">
            <PremiumCard noPadding className={`cursor-pointer border-white/5 transition-all ${expanded === workout.id ? 'bg-white/[0.08] ring-1 ring-[#dcf821]/30' : 'bg-white/[0.02]'}`}>
              <div className="p-6 flex items-center justify-between" onClick={() => setExpanded(expanded === workout.id ? null : workout.id)}>
                <div className="flex items-center gap-4 text-left">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black flex-shrink-0 font-digital ${userData.currentSessionIndex === idx ? 'bg-[#dcf821] text-black' : 'bg-white/10 text-white/40'}`}>0{idx + 1}</div>
                  <div><h3 className="text-xl font-black italic uppercase tracking-tight text-left">{workout.titre.split(':')[1]}</h3><p className="text-[10px] text-white/30 font-bold uppercase tracking-widest text-left">{workout.type}</p></div>
                </div>
                {expanded === workout.id ? <ChevronUp className="text-white/40" /> : <ChevronDown className="text-white/40" />}
              </div>
              {expanded === workout.id && (
                <div className="px-6 pb-8 space-y-8 animate-reveal">
                  <div className="h-40 w-full rounded-2xl overflow-hidden relative border border-white/10">
                    <img src={workout.bgImg} className="w-full h-full object-cover brightness-50" alt="Session" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 flex items-center justify-center"><Dumbbell className="text-white/20" size={40} /></div>
                  </div>
                  <div className="space-y-6">
                    {workout.exercices.map((ex) => (
                      <div key={ex.id} className="flex gap-4 border-l-2 border-white/10 pl-4 py-1 text-left">
                        <div className="flex-1">
                          <h4 className="text-white font-black italic uppercase text-sm tracking-wide">{ex.nom}</h4>
                          <p className="text-[10px] text-[#ff9100] font-black uppercase tracking-tight">{ex.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </PremiumCard>
          </div>
        ))}
      </div>
    </div>
  );
}

function ForceTab({ userData }) {
  const allExercises = useMemo(() => PROGRAMME.flatMap(p => p.exercices), []);
  const [selectedEx, setSelectedEx] = useState(allExercises[0]?.id || '');
  const history = userData.weights?.[selectedEx] || [];
  return (
    <div className="space-y-10 pb-40 animate-reveal text-left px-4">
      <header className="pt-4 text-center">
        <h1 className="text-6xl font-black text-white italic uppercase tracking-tighter">Force</h1>
        <p className="text-[#dcf821] font-bold text-xs uppercase tracking-[0.4em]">Progression de Charge</p>
      </header>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] ml-2 text-left block">Exercice</label>
        <div className="relative">
          <select value={selectedEx} onChange={(e) => setSelectedEx(e.target.value)} className="w-full bg-[#1c1c1e] border border-white/10 rounded-[1.5rem] py-5 px-6 text-white appearance-none font-black italic uppercase tracking-tight focus:outline-none focus:ring-2 focus:ring-[#dcf821]/50">
            {allExercises.map(ex => <option key={ex.id} value={ex.id}>{ex.nom}</option>)}
          </select>
          <ChevronDown className="absolute right-6 top-5.5 text-[#dcf821]" size={20} />
        </div>
      </div>
      <PremiumCard className="space-y-6">
        <div className="flex justify-between items-center text-left">
           <h3 className="text-white font-black italic uppercase text-xl">Évolution</h3>
           {history.length > 0 && <span className="text-[#dcf821] font-digital text-2xl">{history[history.length-1].weight} kg</span>}
        </div>
        <ProgressChart data={history.map(h => ({ date: h.date, val: h.weight }))} color="#dcf821" label="KG" />
        <div className="space-y-3 pt-6 text-left">
          <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Historique Daté</h4>
          {history.length > 0 ? (
            history.slice().reverse().map((h, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="text-xs text-white/40 font-bold">{new Date(h.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}</span>
                <span className="text-lg font-digital text-white">{h.weight} kg</span>
              </div>
            ))
          ) : <div className="text-center py-8 text-white/10 italic text-sm">Pas de données enregistrées</div>}
        </div>
      </PremiumCard>
    </div>
  );
}

function NutritionTabInternal() {
  return (
    <div className="space-y-10 pb-40 animate-reveal text-left px-4">
      <header className="pt-4 text-center"><h1 className="text-6xl font-black text-white italic uppercase tracking-tighter">Fuel</h1><p className="text-white/40 font-bold text-[10px] uppercase tracking-[0.4em]">Strategy</p></header>
      <div className="relative bg-[#f8ffcc] rounded-[2.5rem] p-8 border border-white/20 text-black shadow-[0_10px_30px_rgba(248,255,204,0.2)]">
        <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-black rounded-lg text-[#dcf821]"><Zap size={20} fill="currentColor" /></div><h3 className="font-black italic uppercase text-2xl tracking-tighter">Protocole Densité</h3></div>
        <p className="font-bold text-sm uppercase tracking-tight text-left">2800 kcal • 4 Repas • Féculents & Bon Gras.</p>
      </div>
      <div className="space-y-8">
        {Object.entries(NUTRITION_LISTE).map(([cat, items]) => (
          <div key={cat} className="space-y-4">
            <h4 className="text-[10px] font-black text-[#dcf821] uppercase tracking-[0.6em] ml-2 uppercase text-left">{cat}</h4>
            <div className="grid grid-cols-1 gap-3">
              {items.map((item, i) => (
                <PremiumCard key={i} noPadding className="border-white/5 bg-white/[0.02]">
                  <div className="p-5 flex justify-between items-center text-left">
                    <span className="text-white font-black italic uppercase text-sm text-left">{item.nom}</span>
                    <div className="flex gap-4">
                       {[
                         {l: 'P', v: item.p, c: 'text-red-400'},
                         {l: 'G', v: item.g, c: 'text-blue-400'},
                         {l: 'L', v: item.l, c: 'text-yellow-400'}
                       ].map((macro) => (
                         <div key={macro.l} className="text-center"><p className="text-[8px] text-white/20 font-black uppercase">{macro.l}</p><p className={`text-xs font-mono font-bold ${macro.c}`}>{macro.v}g</p></div>
                       ))}
                    </div>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 5. COMPOSANT PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [showWelcome, setShowWelcome] = useState(true);
  
  // État Local avec Persistance localStorage
  const [userData, setUserData] = useState(() => {
    try {
      const saved = localStorage.getItem('objectif_densite_v2_local');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed.weightHistory)) parsed.weightHistory = [{ date: new Date().toISOString(), val: 60 }];
        return parsed;
      }
    } catch (e) {
      console.error("Erreur chargement localStorage", e);
    }
    return { 
      currentSessionIndex: 0, 
      weights: {}, 
      weightHistory: [{ date: new Date().toISOString(), val: 60 }],
      calendarData: {} 
    };
  });

  useEffect(() => {
    localStorage.setItem('objectif_densite_v2_local', JSON.stringify(userData));
  }, [userData]);

  const saveSingleExercise = (exId, weight) => {
    const newWeights = { ...(userData.weights || {}) };
    if (!newWeights[exId]) newWeights[exId] = [];
    newWeights[exId].push({ date: new Date().toISOString(), weight: parseFloat(weight) });
    setUserData(prev => ({ ...prev, weights: newWeights }));
  };

  const validateSession = (inputs) => {
    const newWeights = { ...(userData.weights || {}) };
    let changed = false;

    if (inputs) {
      Object.entries(inputs).forEach(([exId, weight]) => {
        if (weight) {
          if (!newWeights[exId]) newWeights[exId] = [];
          newWeights[exId].push({ date: new Date().toISOString(), weight: parseFloat(weight) });
          changed = true;
        }
      });
    }

    const nextIndex = (userData.currentSessionIndex + 1) % 5;
    const todayDay = new Date().getDate();
    const newCalendarData = { ...(userData.calendarData || {}), [todayDay]: 'sport' };
    
    setUserData(prev => ({ 
      ...prev, 
      weights: changed ? newWeights : prev.weights,
      currentSessionIndex: nextIndex, 
      calendarData: newCalendarData 
    }));
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab('today');
  };

  const updateCalendar = (day) => {
    const currentStatus = userData.calendarData?.[day] || null;
    let nextStatus = currentStatus === null ? 'sport' : (currentStatus === 'sport' ? 'repos' : null);
    const newCalendarData = { ...(userData.calendarData || {}), [day]: nextStatus };
    setUserData(prev => ({ ...prev, calendarData: newCalendarData }));
  };

  const saveBodyWeight = (val) => {
    const numVal = parseFloat(val);
    if (isNaN(numVal)) return;
    const newEntry = { date: new Date().toISOString(), val: numVal };
    setUserData(prev => ({ ...prev, weightHistory: [...(prev.weightHistory || []), newEntry] }));
  };

  return (
    <div className="min-h-screen text-white relative font-sans selection:bg-[#dcf821] selection:text-black bg-black overflow-x-hidden text-left">
      {/* Import de la police optimisé */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Orbitron:wght@400;900&display=swap" rel="stylesheet" />
      
      {showWelcome && <WelcomeScreen onEnter={() => setShowWelcome(false)} />}
      {!showWelcome && (
        <>
          <Background imageUrl={activeTab === 'today' ? PROGRAMME[userData.currentSessionIndex]?.bgImg : null} />
          <main className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-12 pb-40">
            {activeTab === 'today' && <TodayTab userData={userData} onValidate={validateSession} onSaveExercise={saveSingleExercise} />}
            {activeTab === 'force' && <ForceTab userData={userData} />}
            {activeTab === 'nutrition' && <NutritionTabInternal />}
            {activeTab === 'data' && <DataTab userData={userData} onUpdateCalendar={updateCalendar} onSaveBodyWeight={saveBodyWeight} />}
            {activeTab === 'coach' && <CoachTab />}
            {activeTab === 'roadmap' && <RoadmapTab userData={userData} />}
          </main>
          
          <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-lg px-4 pointer-events-none">
            <div className="bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-3 flex justify-between items-center shadow-3xl pointer-events-auto overflow-x-auto scrollbar-hide">
              <div className="flex w-full justify-between gap-1 px-2 min-w-max">
                {[
                  { id: 'today', icon: Zap, label: "Train" }, 
                  { id: 'roadmap', icon: Activity, label: "Cycle" }, 
                  { id: 'force', icon: Target, label: "Force" }, 
                  { id: 'coach', icon: BookOpen, label: "Coach" },
                  { id: 'nutrition', icon: Utensils, label: "Fuel" }, 
                  { id: 'data', icon: CalendarIcon, label: "Data" }
                ].map((tab) => (
                  <button key={tab.id} onClick={() => { setActiveTab(tab.id); window.scrollTo(0,0); }} className={`flex flex-col items-center gap-1.5 py-3 transition-all relative px-3 ${activeTab === tab.id ? 'text-[#dcf821]' : 'text-white/20'}`}>
                    {activeTab === tab.id && <div className="absolute top-0 w-6 h-[2px] bg-[#dcf821] rounded-full"></div>}
                    <tab.icon size={18} strokeWidth={activeTab === tab.id ? 3 : 2.5} /><span className="text-[6px] font-black uppercase tracking-[0.1em]">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </>
      )}
      <style dangerouslySetInnerHTML={{ __html: `
        body { font-family: 'Inter', sans-serif; background: black; margin: 0; } 
        .font-digital { font-family: 'Orbitron', sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes neon-pulse { 0% { border-color: rgba(220, 248, 33, 0.3); } 50% { border-color: rgba(220, 248, 33, 1); box-shadow: 0 0 15px rgba(220, 248, 33, 0.4); } 100% { border-color: rgba(220, 248, 33, 0.3); } }
        .animate-neon-pulse { animation: neon-pulse 2s infinite ease-in-out; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.2s ease-in-out 2; }
        .shadow-volt-glow { box-shadow: 0 0 20px -5px rgba(220, 248, 33, 0.5); }
        .shadow-blue-glow { box-shadow: 0 0 20px -5px rgba(0, 242, 255, 0.5); }
        @keyframes reveal { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } } 
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } 
        .animate-reveal { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; } 
        .animate-reveal-long { animation: reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; } 
        .animate-reveal-delay { animation: reveal 0.8s 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; } 
        .animate-fade-in { animation: fade-in 1.5s ease-out forwards; } 
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}} />
    </div>
  );
}