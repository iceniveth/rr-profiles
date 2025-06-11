import { z } from "zod";

export const QUALITIES = [
  "Adaptable",
  "Agile",
  "Analytical",
  "Assertive",
  "Brave",
  "Confident",
  "Creative",
  "Focused",
  "Hardworking",
  "Ingenious",
  "Innovative",
  "Intelligent",
  "Kind",
  "Logical",
  "Optimistic",
  "Persistent",
  "Pretty",
  "Reliable",
  "Resourceful",
  "Smart",
  "Strong",
  "Tall",
  "Visionary",
] as const;

export type Quality = (typeof QUALITIES)[number];

export const profiles = [
  {
    id: 1,
    name: "John Doe",
    sex: "Male",
    qualities: ["Tall", "Confident"],
  },
  {
    id: 2,
    name: "Mary Jane",
    sex: "Female",
    qualities: ["Pretty", "Strong"],
  },
  {
    id: 3,
    name: "Peter Parker",
    sex: "Male",
    qualities: ["Smart", "Agile"],
  },
  {
    id: 4,
    name: "Gwen Stacy",
    sex: "Female",
    qualities: ["Intelligent", "Brave"],
  },
  {
    id: 5,
    name: "Miles Morales",
    sex: "Male",
    qualities: ["Resourceful", "Adaptable"],
  },
  {
    id: 6,
    name: "Alice Smith",
    sex: "Female",
    qualities: ["Creative", "Kind"],
  },
  {
    id: 7,
    name: "Bob Johnson",
    sex: "Male",
    qualities: ["Reliable", "Hardworking"],
  },
  {
    id: 8,
    name: "Charlie Brown",
    sex: "Male",
    qualities: ["Persistent", "Optimistic"],
  },
  {
    id: 9,
    name: "Lucy Van Pelt",
    sex: "Female",
    qualities: ["Assertive", "Intelligent"],
  },
  {
    id: 10,
    name: "Linus Torvalds",
    sex: "Male",
    qualities: ["Innovative", "Focused"],
  },
  {
    id: 11,
    name: "Ada Lovelace",
    sex: "Female",
    qualities: ["Analytical", "Visionary"],
  },
  {
    id: 12,
    name: "Alan Turing",
    sex: "Male",
    qualities: ["Ingenious", "Logical"],
  },
];

export const profileSchema = z.object({
  name: z.string().min(1),
  sex: z.string().min(1),
  qualities: z.array(z.enum(QUALITIES)),
});
