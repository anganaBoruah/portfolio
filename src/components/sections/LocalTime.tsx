"use client";

import { useSyncExternalStore } from "react";

type LocalTimeProps = {
  timeZone: string;
  zoneLabel: string;
};

const TICK_MS = 1000;
const SERVER_PLACEHOLDER = "--:--";

function subscribe(onTick: () => void) {
  const intervalId = window.setInterval(onTick, TICK_MS);
  return () => window.clearInterval(intervalId);
}

export function LocalTime({ timeZone, zoneLabel }: LocalTimeProps) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(Date.now()),
    () => SERVER_PLACEHOLDER,
  );

  return (
    <span className="tabular-nums">
      {time} {zoneLabel}
    </span>
  );
}
