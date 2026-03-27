interface HistoryTimelineProps {
  events: { year: string; title: string; description?: string }[];
}

export default function HistoryTimeline({ events }: HistoryTimelineProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
          교회 연혁
        </h2>
        <ol className="relative border-l-2 border-accent/30 space-y-8 ml-4">
          {events.map((event, i) => (
            <li key={i} role="listitem" className="pl-8 relative">
              <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-accent border-2 border-white shadow" />
              <span className="inline-block text-xs font-bold text-accent tracking-widest mb-1">
                {event.year}
              </span>
              <h3 className="text-base md:text-lg font-semibold text-primary">
                {event.title}
              </h3>
              {event.description && (
                <p className="text-sm text-gray-500 mt-1">{event.description}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
