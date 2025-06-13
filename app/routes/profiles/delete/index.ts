import { deleteProfile } from "~/lib/profiles";
import type { Route } from "./+types";
import delay from "~/lib/delay";
import { redirect } from "react-router";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";

const deleteProfileSchema = z.object({
  redirect: z.string().optional(),
});

export async function action({ request, params }: Route.ActionArgs) {
  const { profileId } = params;

  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: deleteProfileSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await delay(1_000); // A fake delay to display deleting phase in frontend

  deleteProfile(Number(profileId));

  if (submission.value.redirect) {
    return redirect("/profiles");
  }
}
