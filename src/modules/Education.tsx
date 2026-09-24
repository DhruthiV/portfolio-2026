export function Education() {
  return (
    <section className="flex flex-col items-center gap-5">
      <h2 className="text-2xl font-semibold text-foreground/90">Education</h2>

      <div className="grid grid-cols-[1fr_auto_1fr] items-start text-center">
        {/* Degrees */}
        <h3 className="text-4xl font-semibold tracking-tight text-foreground">
          BSc
        </h3>

        <span className="px-5 pt-1 text-2xl font-normal text-foreground/60">
          +
        </span>

        <h3 className="text-4xl font-semibold tracking-tight text-foreground">
          MCA
        </h3>

        {/* Full degree names */}
        <p className="mt-1 text-md font-semibold text-chart-5 font-heading">
          Bachelor of Science
        </p>

        <div />

        <p className="mt-1 text-md font-semibold text-chart-5 font-heading">
          Master of Computer Applications
        </p>

        {/* Institutions */}
        <p className="mt-3 text-sm text-foreground/70">
          B.M.S. College for Women
        </p>

        <div />

        <p className="mt-3 text-sm text-foreground/70">PES University</p>

        {/* Years */}
        <p className="mt-1 text-sm text-foreground/70">2020–2023</p>

        <div />

        <p className="mt-1 text-sm text-foreground/70">2023–2025</p>
      </div>
    </section>
  );
}
