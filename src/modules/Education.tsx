export function Education() {
  return (
    <section className="flex flex-col gap-6 items-center">
      <h2 className="text-xl font-semibold text-muted-foreground text-center">
        My Degree
      </h2>

      <div className="w-full flex justify-center">
        <div className="grid grid-cols-[auto_auto_auto] items-center text-center">
          {/* Degrees */}
          <h3 className="text-4xl font-semibold tracking-tight text-foreground font-heading">
            BSc
          </h3>

          <span className="px-4 text-2xl font-normal text-muted-foreground/60">
            +
          </span>

          <h3 className="text-4xl font-semibold tracking-tight text-foreground font-heading">
            MCA
          </h3>

          {/* Full degree names */}
          <p className="mt-2 text-md text-muted-foreground">
            Bachelor of Science
          </p>

          <div />

          <p className="mt-2 text-md text-muted-foreground">
            Master of Computer Applications
          </p>

          {/* Institutions */}
          <p className="mt-3 text-sm text-muted-foreground/70">
            B.M.S. College for Women
          </p>

          <div />

          <p className="mt-3 text-sm text-muted-foreground/70">
            PES University
          </p>

          {/* Years */}
          <p className="mt-1 text-sm text-muted-foreground/70">2020–2023</p>

          <div />

          <p className="mt-1 text-sm text-muted-foreground/70">2023–2025</p>
        </div>
      </div>
    </section>
  );
}
