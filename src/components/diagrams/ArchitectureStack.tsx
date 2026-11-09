"use client";

import { useState } from "react";

import { stackLabels, stackLayers } from "@/content/stack";

const TOP_LAYER = stackLayers.length - 1;

export function ArchitectureStack() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
      <div
        aria-hidden="true"
        className="stack-scene mx-auto hidden w-full max-w-[30rem] lg:block"
      >
        <div className="stack-rig">
          {stackLayers.map((layer, i) => (
            <div
              key={layer.id}
              className="stack-plate"
              data-active={i === activeIndex}
              style={{ "--layer": TOP_LAYER - i }}
            >
              <span className="heading absolute bottom-[7%] left-[8%] text-[4.6cqi] text-paper/75">
                {layer.index} {layer.name}
              </span>
            </div>
          ))}
          <div className="stack-packet" />
        </div>
      </div>
      <ol aria-label={stackLabels.layersLabel} className="border-t border-line">
        {stackLayers.map((layer, i) => (
          <li
            key={layer.id}
            onMouseEnter={() => setActiveIndex(i)}
            className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 gap-y-2 border-b border-line py-4 sm:grid-cols-[2rem_9rem_minmax(0,1fr)] sm:items-baseline"
          >
            <span
              className={`heading transition-colors ${i === activeIndex ? "text-signal" : "text-paper-dim"}`}
            >
              {layer.index}
            </span>
            <h3 className="font-semibold">{layer.name}</h3>
            <ul className="col-start-2 flex flex-wrap gap-1.5 sm:col-start-auto">
              {layer.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full bg-night-3 px-3 py-1 text-xs"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
