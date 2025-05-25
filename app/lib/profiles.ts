import { z } from "zod";

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
    sex: "Male",
    qualities: ["Pretty", "Strong"],
  },
];

export const profileSchema = z.object({
  name: z.string().min(1),
  sex: z.string().min(1),
  qualities: z.array(z.string()),
});
