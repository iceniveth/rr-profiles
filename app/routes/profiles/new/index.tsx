import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import type { Route } from "./+types";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Form, redirect, useNavigation } from "react-router";
import { profiles, profileSchema, QUALITIES } from "~/lib/profiles";
import { flashCookie } from "~/lib/cookies/flashCookies";
import ErrorMessage from "~/components/ErrorMessage";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: profileSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  profiles.push({ id: Date.now(), ...submission.value });

  const session = await flashCookie.getSession(request.headers.get("Cookie"));

  session.flash("message", "Profile created");

  return redirect("/profiles", {
    headers: {
      "Set-Cookie": await flashCookie.commitSession(session),
    },
  });
}

export default function ProfilesNew({ actionData }: Route.ComponentProps) {
  const [form, fields] = useForm({
    constraint: getZodConstraint(profileSchema),
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: profileSchema });
    },
    shouldValidate: "onInput",
  });
  const navigation = useNavigation();
  const isSubmitting = navigation.formData?.has("creatingProfile") || false;

  return (
    <>
      <div className="container mx-auto">
        <Form method="post" {...getFormProps(form)}>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg">Create New Profile</h2>

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

                <div className="flex flex-wrap gap-2">
                  {QUALITIES.map((quality) => (
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
                name="creatingProfile"
                disabled={isSubmitting}
                className="rounded-sm bg-orange-500 px-2 py-1 text-white hover:cursor-pointer"
              >
                {isSubmitting ? "Creating" : "Create"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
