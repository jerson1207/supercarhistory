import React, { useState } from "react";
import { carsData } from "../data/cars";
import { ArrowLeftRight, X, ChevronDown, Zap, Gauge, Timer, Globe, Cog, Users, Medal, Film } from "lucide-react";

const SPECS = [
  { key: "horsepower", label: "Horsepower", unit: "hp", icon: <Zap size={14} />, higher: true },
  { key: "topSpeed", label: "Top Speed", unit: "mph", icon: <Gauge size={14} />, higher: true },
  { key: "acceleration", label: "0–60 mph", unit: "", icon: <Timer size={14} />, higher: false },
  { key: "engine", label: "Engine", unit: "", icon: <Cog size={14} />, higher: null },
  { key: "production", label: "Production", unit: "", icon: <Users size={14} />, higher: null },
  { key: "designer", label: "Designer", unit: "", icon: <Medal size={14} />, higher: null },
  { key: "country", label: "Country", unit: "", icon: <Globe size={14} />, higher: null },
  { key: "year", label: "Years Produced", unit: "", icon: <Film size={14} />, higher: null },
];

function CarSelector({ label, selected, onSelect, exclude }) {
  const [open, setOpen] = useState(false);
  const available = carsData.filter((c) => c.id !== exclude?.id);

  return (
    <div className="relative flex-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 bg-white/5 border border-white/10 hover:border-[#c9a84c]/50 rounded-2xl p-4 transition-all"
      >
        {selected ? (
          <div className="flex items-center gap-3 min-w-0">
            <img src={selected.imgURL} alt={selected.name} className="w-12 h-8 object-cover rounded-lg shrink-0" />
            <div className="text-left min-w-0">
              <p className="text-white text-sm font-medium truncate">{selected.name}</p>
              <p className="text-white/40 text-xs">{selected.year}</p>
            </div>
          </div>
        ) : (
          <span className="text-white/30 text-sm">{label}</span>
        )}
        <ChevronDown size={16} className={`text-white/30 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#161616] border border-white/10 rounded-2xl overflow-hidden z-20 shadow-2xl max-h-72 overflow-y-auto">
          {available.map((car) => (
            <button
              key={car.id}
              onClick={() => { onSelect(car); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0"
            >
              <img src={car.imgURL} alt={car.name} className="w-10 h-7 object-cover rounded-md shrink-0" />
              <div className="min-w-0">
                <p className="text-white text-sm truncate">{car.name}</p>
                <p className="text-white/30 text-xs">{car.brand} · {car.era}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function WinnerBadge() {
  return (
    <span className="inline-block bg-[#c9a84c]/20 text-[#c9a84c] text-[10px] px-2 py-0.5 rounded-full border border-[#c9a84c]/30 ml-2 tracking-wider uppercase">
      Better
    </span>
  );
}

function SpecRow({ spec, carA, carB }) {
  const valA = carA?.[spec.key];
  const valB = carB?.[spec.key];

  let aWins = false;
  let bWins = false;

  if (spec.higher !== null && carA && carB) {
    const numA = parseFloat(String(valA));
    const numB = parseFloat(String(valB));
    if (!isNaN(numA) && !isNaN(numB) && numA !== numB) {
      aWins = spec.higher ? numA > numB : numA < numB;
      bWins = spec.higher ? numB > numA : numB < numA;
    }
  }

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-4 border-b border-white/5 last:border-0">
      {/* Car A value */}
      <div className="text-right">
        <span className={`text-sm font-medium ${aWins ? "text-[#c9a84c]" : "text-white/80"}`}>
          {carA ? (valA ? `${valA}${spec.unit ? " " + spec.unit : ""}` : "—") : "—"}
        </span>
        {aWins && <WinnerBadge />}
      </div>

      {/* Label */}
      <div className="flex flex-col items-center gap-1 min-w-25">
        <div className="text-white/30">{spec.icon}</div>
        <p className="text-white/30 text-xs uppercase tracking-widest text-center">{spec.label}</p>
      </div>

      {/* Car B value */}
      <div className="text-left">
        {bWins && <WinnerBadge />}
        <span className={`text-sm font-medium ${bWins ? "text-[#c9a84c]" : "text-white/80"}`}>
          {carB ? (valB ? `${valB}${spec.unit ? " " + spec.unit : ""}` : "—") : "—"}
        </span>
      </div>
    </div>
  );
}

export default function Compare() {
  const [carA, setCarA] = useState(null);
  const [carB, setCarB] = useState(null);

  const swap = () => {
    setCarA(carB);
    setCarB(carA);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-2">Head to Head</p>
          <h1 className="text-white text-4xl md:text-5xl font-extralight tracking-tight">
            Comparison Tool
          </h1>
          <p className="text-white/40 mt-3 text-sm">Select two supercars to compare their specs and history side-by-side.</p>
        </div>

        {/* Car Selectors */}
        <div className="flex items-center gap-3 mb-10">
          <CarSelector label="Choose first car…" selected={carA} onSelect={setCarA} exclude={carB} />
          <button
            onClick={swap}
            title="Swap cars"
            className="p-3 border border-white/10 rounded-xl text-white/30 hover:text-[#c9a84c] hover:border-[#c9a84c]/40 transition-all shrink-0"
          >
            <ArrowLeftRight size={16} />
          </button>
          <CarSelector label="Choose second car…" selected={carB} onSelect={setCarB} exclude={carA} />
        </div>

        {/* Hero images */}
        {(carA || carB) && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[carA, carB].map((car, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden h-40 md:h-56 bg-white/3 border border-white/8">
                {car ? (
                  <>
                    <img src={car.imgURL} alt={car.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-[#c9a84c] text-xs uppercase tracking-wider mb-0.5">{car.brand}</p>
                      <p className="text-white font-light text-sm md:text-base leading-tight">{car.name}</p>
                    </div>
                    <button
                      onClick={() => i === 0 ? setCarA(null) : setCarB(null)}
                      className="absolute top-3 right-3 p-1.5 bg-black/50 rounded-lg text-white/40 hover:text-white transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-white/15 text-sm tracking-widest uppercase">No car selected</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Specs comparison */}
        {(carA || carB) && (
          <div className="bg-white/3 border border-white/8 rounded-2xl p-6 mb-8">
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-6">Specifications</p>
            {SPECS.map((spec) => (
              <SpecRow key={spec.key} spec={spec} carA={carA} carB={carB} />
            ))}
          </div>
        )}

        {/* History highlights */}
        {(carA || carB) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[carA, carB].map((car, i) => (
              <div key={i} className="bg-white/3 border border-white/8 rounded-2xl p-6">
                <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-4">
                  {car ? `${car.name} · History` : "History"}
                </p>
                {car ? (
                  <div className="space-y-3">
                    {car.history.map((item, j) => (
                      <div key={j} className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-1.5 shrink-0" />
                        <p className="text-white/60 text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/20 text-sm">Select a car to see history</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Awards */}
        {(carA || carB) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[carA, carB].map((car, i) => (
              <div key={i} className="bg-white/3 border border-white/8 rounded-2xl p-6">
                <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-4">
                  {car ? `${car.name} · Awards` : "Awards"}
                </p>
                {car ? (
                  <div className="space-y-2">
                    {(car.awards || []).map((award, j) => (
                      <div key={j} className="flex gap-2 items-start">
                        <span className="text-[#c9a84c] text-xs mt-0.5">✦</span>
                        <p className="text-white/60 text-sm">{award}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/20 text-sm">Select a car to see awards</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!carA && !carB && (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl">
            <ArrowLeftRight size={32} className="text-white/10 mx-auto mb-4" />
            <p className="text-white/20 text-sm tracking-widest uppercase">Select two cars above to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}