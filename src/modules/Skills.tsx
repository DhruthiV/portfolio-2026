import { SKILL_SECTIONS } from "../data/skills";

export function Skills() {
  return (
    <section className="flex flex-col gap-16">
      <h2 className="text-center text-2xl font-semibold text-foreground/90 font-heading">
        Skills
      </h2>

      {SKILL_SECTIONS.map((section, index) => {
        const isMiddle = index === 1;

        return (
          <div
            key={section.title}
            className={`w-full flex justify-center ${
              isMiddle ? "md:justify-end" : "md:justify-start"
            }`}
          >
            <div
              className={`w-full max-w-3xl text-center ${
                isMiddle ? "md:text-right" : "md:text-left"
              }`}
            >
              {/* Heading */}
              <h2 className="text-3xl font-semibold text-foreground font-heading">
                {section.title}
              </h2>

              {/* Description */}
              <p
                className={`mt-2 max-w-xl mx-auto leading-relaxed text-chart-5 ${
                  isMiddle
                    ? "md:ml-auto md:mr-0 md:text-left"
                    : "md:ml-0 md:mr-auto md:text-left"
                }`}
              >
                {section.description}
              </p>

              {/* Content */}
              <div
                className={`mt-6 flex flex-wrap justify-center gap-3 ${
                  isMiddle ? "md:justify-end" : "md:justify-start"
                }`}
              >
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="inline-flex items-center gap-2 rounded-md border border-border/90 px-3 py-2 text-md text-foreground/90 transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
                  >
                    {item.icon && (
                      <span className="text-foreground/90">{item.icon}</span>
                    )}

                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
