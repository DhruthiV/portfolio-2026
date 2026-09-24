export interface EventImage {
  src: string;
  caption: string;
}

export interface Event {
  id: string;
  name: string;
  images: EventImage[];
}
import f1 from "@/events/figma1.png";
import f2 from "@/events/figma2.png";
import f3 from "@/events/figma3.png";
import f4 from "@/events/figma4.png";
import f5 from "@/events/figma5.jpg";
export const EVENTS: Event[] = [
  {
    id: "figmathon",
    name: "Figmathon",
    images: [
      {
        src: f1,
        caption: "Figmathon: Design Hackathon to build products",
      },
      {
        src: f2,
        caption: "Getting ready for the event",
      },
      {
        src: f3,
        caption: "A guest walking through the design lifecycle framework",
      },
      {
        src: f4,
        caption: "A team walking through their product",
      },
      {
        src: f5,
        caption: "Team was placed in top 6 and earned a certificate",
      },
    ],
  },
];
