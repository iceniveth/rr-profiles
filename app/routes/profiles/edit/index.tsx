import { profiles, profileSchema } from "~/lib/profiles";
import type { Route } from "./+types";
import { data, Form, redirect, useNavigation } from "react-router";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import ErrorMessage from "~/components/ErrorMessage";
import { flashCookie } from "~/lib/cookies/flashCookies";

export async function loader({ params }: Route.LoaderArgs) {
  const profile = profiles.find((p) => p.id.toString() === params.profileId);

  if (profile == null) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return data({
    profile,
  });
}

export async function action({ request, params }: Route.ActionArgs) {
  const profileIndex = profiles.findIndex(
    (p) => p.id.toString() === params.profileId,
  );

  if (profileIndex === -1) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: profileSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const profile = profiles[profileIndex];
  profiles[profileIndex] = { ...profile, ...submission.value };

  const session = await flashCookie.getSession(request.headers.get("Cookie"));

  session.flash("message", "Profile updated");

  return redirect("/profiles", {
    headers: {
      "Set-Cookie": await flashCookie.commitSession(session),
    },
  });
}

export default function ProfilesEdit({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [form, fields] = useForm({
    constraint: getZodConstraint(profileSchema),
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: profileSchema });
    },
    shouldValidate: "onInput",
    defaultValue: {
      name: loaderData.profile.name,
      qualities: loaderData.profile.qualities,
      sex: loaderData.profile.sex,
    },
  });
  const navigation = useNavigation();
  const isSubmitting = navigation.formData?.has("editingProfile") || false;

  return (
    <>
      <div className="container mx-auto">
        <Form method="post" {...getFormProps(form)}>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg">Edit Profile</h2>

            <div>
              <label>
                Name
                <br />
                <input
                  {...getInputProps(fields.name, { type: "text" })}
                  className="rounded border-1"
                />
              </label>
              <ErrorMessage message={fields.name.errors} />
            </div>

            <div>
              <fieldset>
                <label>Sex</label>

                <div className="flex flex-col gap-2">
                  {["Female", "Male"].map((sex) => (
                    <div key={sex}>
                      <label className="rounded border-1 p-1 px-2 hover:cursor-pointer has-checked:border-orange-500 has-checked:text-orange-500">
                        {sex}
                        <input
                          type="radio"
                          name={fields.sex.name}
                          value={sex}
                          defaultChecked={fields.sex.initialValue === sex}
                          className={`sr-only`} // hide an element visually without hiding it from screen readers
                        />
                      </label>
                    </div>
                  ))}
                </div>
                <ErrorMessage message={fields.sex.errors} />
              </fieldset>
            </div>
            <div>
              <fieldset>
                <label>Qualities</label>

                <div className="flex flex-col gap-2">
                  {["Confident", "Pretty", "Strong", "Tall"].map((quality) => (
                    <label
                      key={quality}
                      className="rounded border-1 p-1 px-2 hover:cursor-pointer has-checked:border-orange-500 has-checked:text-orange-500"
                    >
                      <input
                        type="checkbox"
                        name={fields.qualities.name}
                        value={quality}
                        defaultChecked={
                          fields.qualities.initialValue &&
                          Array.isArray(fields.qualities.initialValue)
                            ? fields.qualities.initialValue.includes(quality)
                            : fields.qualities.initialValue === quality
                        }
                        className={`sr-only`} // hide an element visually without hiding it from screen readers
                      />
                      {quality}
                    </label>
                  ))}
                </div>

                <ErrorMessage message={fields.qualities.errors} />
              </fieldset>
            </div>

            <div>
              <button
                type="submit"
                name="editingProfile"
                disabled={isSubmitting}
                className="rounded-sm bg-orange-500 px-2 py-1 text-white hover:cursor-pointer"
              >
                {isSubmitting ? "Updating" : "Update"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
