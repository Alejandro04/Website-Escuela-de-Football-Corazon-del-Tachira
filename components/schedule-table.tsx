import type { ScheduleEntry } from "@/lib/data/schedule";

type ScheduleTableProps = {
  entries: ScheduleEntry[];
};

export function ScheduleTable({ entries }: ScheduleTableProps) {
  return (
    <div>
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-brand-black/10 md:block">
        <table className="w-full text-left">
          <thead className="bg-brand-black text-brand-white">
            <tr>
              <th className="px-6 py-4 font-mono text-xs uppercase tracking-widest">
                Categoría
              </th>
              <th className="px-6 py-4 font-mono text-xs uppercase tracking-widest">
                Días
              </th>
              <th className="px-6 py-4 font-mono text-xs uppercase tracking-widest">
                Horario
              </th>
              <th className="px-6 py-4 font-mono text-xs uppercase tracking-widest">
                Cancha
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr
                key={entry.category}
                className={idx % 2 === 0 ? "bg-brand-white" : "bg-brand-black/[.02]"}
              >
                <td className="px-6 py-4 font-display text-2xl text-brand-black">
                  {entry.category}
                </td>
                <td className="px-6 py-4 text-brand-black/80">
                  {entry.days.join(" · ")}
                </td>
                <td className="px-6 py-4 text-brand-black/80">{entry.time}</td>
                <td className="px-6 py-4 text-brand-black/80">{entry.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="grid gap-4 md:hidden">
        {entries.map((entry) => (
          <article
            key={entry.category}
            className="rounded-2xl border border-brand-black/10 bg-brand-white p-6"
          >
            <h3 className="font-display text-3xl text-brand-black">
              {entry.category}
            </h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="font-mono text-xs uppercase tracking-widest text-brand-red">
                  Días
                </dt>
                <dd className="text-brand-black/80">{entry.days.join(" · ")}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-mono text-xs uppercase tracking-widest text-brand-red">
                  Horario
                </dt>
                <dd className="text-brand-black/80">{entry.time}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-mono text-xs uppercase tracking-widest text-brand-red">
                  Cancha
                </dt>
                <dd className="text-brand-black/80">{entry.location}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}