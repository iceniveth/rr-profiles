import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import type { Route } from "./+types";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Form, redirect, useNavigation } from "react-router";
import { profiles, profileSchema } from "~/lib/profiles";
import { flashCookie } from "~/lib/cookies/flashCookies";
import ErrorMessage from "~/components/ErrorMessage";
import { parseFormData, type FileUpload } from "@mjackson/form-data-parser";
import { fileStorage } from "~/lib/fileStorage";

async function uploadHandler(fileUpload: FileUpload) {
  if (
    fileUpload.fieldName === "image" &&
    fileUpload.type.startsWith("image/")
  ) {
    let storageKey = fileUpload.name;

    // FileUpload objects are not meant to stick around for very long (they are
    // streaming data from the request.body); store them as soon as possible.
    await fileStorage.set(storageKey, fileUpload);

    // Return a File for the FormData object. This is a LazyFile that knows how
    // to access the file's content if needed (using e.g. file.stream()) but
    // waits until it is requested to actually read anything.
    return fileStorage.get(storageKey);
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await parseFormData(request, uploadHandler);
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
        <Form
          method="post"
          encType="multipart/form-data"
          {...getFormProps(form)}
        >
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
