import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const concerts = [
  {
    day: "Day 1",
    artist: "Gustavo Santaolalla",
    stage: "Lago Stage",
    start: "16:30",
    end: "17:30",
  },
  {
    day: "Day 1",
    artist: "The Legendary Tigerman",
    stage: "Echo Stage",
    start: "18:00",
    end: "19:00",
  },
  {
    day: "Day 2",
    artist: "Moon Duo",
    stage: "Lago Stage",
    start: "17:00",
    end: "18:00",
  },
  {
    day: "Day 2",
    artist: "Scúru Fitchádu",
    stage: "Echo Stage",
    start: "18:30",
    end: "19:30",
  },
  {
    day: "Day 3",
    artist: "Bo Ningen",
    stage: "Lago Stage",
    start: "16:00",
    end: "17:00",
  },
  {
    day: "Day 3",
    artist: "Mueran Humanos",
    stage: "Echo Stage",
    start: "17:30",
    end: "18:30",
  },
  {
    day: "Day 4",
    artist: "Al Lover",
    stage: "Lago Stage",
    start: "16:00",
    end: "17:00",
  },
  {
    day: "Day 4",
    artist: "Ploho",
    stage: "Echo Stage",
    start: "17:30",
    end: "18:30",
  },
];

const parseTime = (timeStr) => {
  const [h, m] = timeStr.split(":".toString()).map(Number);
  return h * 60 + m;
};

const adjustTime = (minutes) => {
  return minutes < 240 ? minutes + 1440 : minutes;
};

const FestivalSchedule = () => {
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const startTime = 14 * 60;
  const endTime = 28 * 60;
  const totalMinutes = endTime - startTime;

  const stages = [...new Set(concerts.filter(c => c.day === selectedDay).map((c) => c.stage))];
  const days = [...new Set(concerts.map((c) => c.day))];

  return (
    <div className="p-4 font-sans min-h-screen bg-black text-yellow-100">
      <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide uppercase font-mono">Sonic Blast 2025 – Portugal</h1>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 overflow-x-auto">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide border transition ${
              selectedDay === day
                ? 'bg-yellow-500 text-black'
                : 'bg-transparent text-yellow-300 border-yellow-500 hover:bg-yellow-600 hover:text-black'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stages.map((stage, idx) => (
          <div key={idx} className="">
            <h2 className="text-2xl font-bold mb-2 text-center uppercase text-yellow-400">{stage}</h2>
            <div className="relative h-[1200px] border border-yellow-800 rounded-lg bg-zinc-900 overflow-hidden">
              {concerts
                .filter((c) => c.stage === stage && c.day === selectedDay)
                .map((c, i) => {
                  const adjustedStart = adjustTime(parseTime(c.start));
                  const adjustedEnd = adjustTime(parseTime(c.end));
                  const top = ((adjustedStart - startTime) / totalMinutes) * 100;
                  const height = ((adjustedEnd - adjustedStart) / totalMinutes) * 100;
                  return (
                    <div
                      key={i}
                      className="absolute left-2 right-2 rounded bg-yellow-500 text-black p-2 text-sm shadow-lg border border-yellow-700"
                      style={{ top: `${top}%`, height: `${height}%` }}
                    >
                      <strong className="block text-base font-bold">{c.artist}</strong>
                      <div className="text-xs">{c.start} - {c.end}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<FestivalSchedule />);
