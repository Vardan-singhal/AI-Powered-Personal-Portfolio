import { useState } from "react";

export default function ContributionCalendar({ contributionData }) {
  const years = Object.keys(contributionData || {}).sort(
    (a, b) => Number(b) - Number(a)
  );

  const [selectedYear, setSelectedYear] = useState(years[0]);

  const contributions = contributionData?.[selectedYear];

  if (!contributions) {
    return (
      <div className="card">
        <h3 className="font-semibold mb-3">GitHub Contributions</h3>
        <p className="text-sm text-slate-400">
          Contribution calendar is unavailable.
        </p>
      </div>
    );
  }

  const monthLabels = [];

  contributions.weeks.forEach((week, index) => {
    const firstDay = week.contributionDays[0];

    if (!firstDay) return;

    const month = new Date(firstDay.date).toLocaleString("default", {
      month: "short",
    });

    const previousWeek = contributions.weeks[index - 1];

    const previousMonth = previousWeek
      ? new Date(
          previousWeek.contributionDays[0].date
        ).toLocaleString("default", {
          month: "short",
        })
      : null;

    if (month !== previousMonth) {
      monthLabels.push({
        month,
        index,
      });
    }
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">
            GitHub Contributions
          </h3>
          <p className="text-sm text-slate-400">
            {contributions.totalContributions} contributions in {selectedYear}
          </p>
        </div>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
        >
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Month Labels */}
          <div className="flex ml-8 mb-2 relative h-5">
            {monthLabels.map(({ month, index }) => (
              <span
                key={`${month}-${index}`}
                className="absolute text-xs text-slate-400"
                style={{
                  left: `${index * 16}px`,
                }}
              >
                {month}
              </span>
            ))}
          </div>

          <div className="flex">
            {/* Day Labels */}
            <div className="flex flex-col justify-between mr-2 text-xs text-slate-400 h-[112px]">
              <span></span>
              <span>Mon</span>
              <span></span>
              <span>Wed</span>
              <span></span>
              <span>Fri</span>
              <span></span>
            </div>

            {/* Calendar Grid */}
            <div className="flex gap-[3px]">
              {contributions.weeks.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  className="grid grid-rows-7 gap-[3px]"
                >
                  {week.contributionDays.map((day) => (
                    <div
                      key={day.date}
                      title={`${day.date} • ${day.contributionCount} contribution${
                        day.contributionCount !== 1 ? "s" : ""
                      }`}
                      className="
                        w-3.5
                        h-3.5
                        rounded-[2px]
                        transition-all
                        hover:ring-1
                        hover:ring-white/40
                        cursor-pointer
                      "
                      style={{
                        backgroundColor:
                          day.color || "#161b22",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-end items-center mt-4 gap-2 text-xs text-slate-400">
            <span>Less</span>

            <div className="w-3 h-3 rounded bg-[#161b22]" />
            <div className="w-3 h-3 rounded bg-[#0e4429]" />
            <div className="w-3 h-3 rounded bg-[#006d32]" />
            <div className="w-3 h-3 rounded bg-[#26a641]" />
            <div className="w-3 h-3 rounded bg-[#39d353]" />

            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}