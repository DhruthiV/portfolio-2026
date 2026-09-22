import { SKILL_SECTIONS } from "../data/skills";

export function Skills() {
  return (
    <section className="flex flex-col gap-16">
      {SKILL_SECTIONS.map((section, index) => {
        const isMiddle = index === 1;

        return (
          <div
            key={section.title}
            className={`w-full ${
              isMiddle ? "flex justify-end" : "flex justify-start"
            }`}
          >
            <div
              className={`w-full max-w-3xl ${
                isMiddle ? "text-right" : "text-left"
              }`}
            >
              {/* Heading */}
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>

              {/* Description */}
              <p
                className={`mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground ${
                  isMiddle ? "ml-auto text-left" : "text-left"
                }`}
              >
                {section.description}
              </p>

              {/* Content */}
              <div
                className={`mt-6 flex flex-wrap gap-3 ${
                  isMiddle ? "justify-end" : "justify-start"
                }`}
              >
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="inline-flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
                  >
                    {item.icon && (
                      <span className="text-muted-foreground">{item.icon}</span>
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
