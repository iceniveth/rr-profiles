import { deleteProfile } from "~/lib/profiles";
import type { Route } from "./+types";
import delay from "~/lib/delay";
import { redirect } from "react-router";

export async function action(request: Route.ActionArgs) {
  const { profileId } = request.params;

  await delay(1_000); // A fake delay to display deleting phase in frontend

  deleteProfile(Number(profileId));

  return redirect("/profiles");
}
