import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { EVENTS, type EventImage } from "@/data/events";

interface FlatImage {
  eventIndex: number;
  imageIndex: number;
  image: EventImage;
}

export function Events() {
  const tabsRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);

  const flatImages = useMemo<FlatImage[]>(
    () =>
      EVENTS.flatMap((event, eventIndex) =>
        event.images.map((image, imageIndex) => ({
          eventIndex,
          imageIndex,
          image,
        })),
      ),
    [],
  );

  const current = flatImages[position];

  /*
   * Keep the active event tab visible when the tab row
   * becomes wider than the available screen.
   */
  useEffect(() => {
    const container = tabsRef.current;

    if (!container) return;

    const activeTab = container.children[current.eventIndex] as
      | HTMLElement
      | undefined;

    activeTab?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [current.eventIndex]);

  const next = () => {
    setDirection(1);
    setPosition((value) => (value + 1) % flatImages.length);
  };

  const previous = () => {
    setDirection(-1);
    setPosition((value) => (value - 1 + flatImages.length) % flatImages.length);
  };

  const selectEvent = (eventIndex: number) => {
    const firstImage = flatImages.findIndex(
      (item) => item.eventIndex === eventIndex,
    );

    if (firstImage !== -1) {
      setDirection(firstImage > position ? 1 : -1);
      setPosition(firstImage);
    }
  };

  if (!current) return null;

  return (
    <section className="w-full">
      {/* Section heading */}
      <p className="mb-5 text-center font-heading text-2xl font-bold text-foreground">
        Beyond Work
      </p>

      {/* Event tabs */}
      <div
        ref={tabsRef}
        className="
          flex
          w-full
          justify-start
          gap-5
          overflow-x-auto
          overflow-y-hidden
          border-b
          border-border/60
          px-1
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
          sm:justify-center
          sm:gap-6
        "
      >
        {EVENTS.map((event, index) => {
          const active = index === current.eventIndex;

          return (
            <button
              key={event.id}
              type="button"
              onClick={() => selectEvent(index)}
              className={`
                relative
                shrink-0
                pb-2.5
                text-md
                leading-none
                transition-colors
                duration-200
                focus:outline-none
                ${
                  active
                    ? "font-medium text-primary"
                    : "font-normal text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {event.name}

              {active && (
                <span
                  className="
                    absolute
                    inset-x-0
                    -bottom-px
                    h-px
                    bg-primary
                  "
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Image */}
      <div className="mt-5">
        <div className="group relative mx-auto aspect-4/3 w-[80%] overflow-hidden rounded-md bg-muted/20">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={current.image.src}
              src={current.image.src}
              alt={current.image.caption}
              draggable={false}
              custom={direction}
              initial={{
                x: direction > 0 ? "100%" : "-100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: direction > 0 ? "-100%" : "100%",
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                select-none
              "
            />
          </AnimatePresence>

          {/* Previous */}
          <button
            type="button"
            onClick={previous}
            aria-label="Previous image"
            className="
              absolute
              left-2.5
              top-1/2
              z-10
              flex
              h-8
              w-8
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-border/60
              bg-background/75
              text-foreground
              backdrop-blur-sm
              transition-colors
              hover:bg-background
              focus:outline-none
              focus:ring-1
              focus:ring-primary/30
              sm:left-3
            "
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="
              absolute
              right-2.5
              top-1/2
              z-10
              flex
              h-8
              w-8
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-border/60
              bg-background/75
              text-foreground
              backdrop-blur-sm
              transition-colors
              hover:bg-background
              focus:outline-none
              focus:ring-1
              focus:ring-primary/30
              sm:right-3
            "
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Editorial caption */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`${current.eventIndex}-${current.imageIndex}`}
            initial={{
              opacity: 0,
              x: direction > 0 ? 10 : -10,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -10 : 10,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="
              mx-auto
              mt-3
              max-w-xl
              px-4
              text-center
              font-serif
              text-md
              leading-relaxed
              text-muted-foreground
            "
          >
            {current.image.caption}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
