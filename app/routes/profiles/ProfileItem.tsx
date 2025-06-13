import { LoaderCircle, Trash } from "lucide-react";
import { Link, useFetcher } from "react-router";
import type { Profile } from "~/lib/profiles";

export default function ProfileItem({ profile }: { profile: Profile }) {
  const fetcher = useFetcher();
  const isDeleting = fetcher.formData?.get("action") === "delete";

  return (
    <li key={profile.id} className="flex items-center gap-2 border-b p-2">
      <fetcher.Form method="post" action={`/profiles/${profile.id}/delete`}>
        <noscript>
          <input type="hidden" name="redirect" value="true" />
        </noscript>
        <input type="hidden" name="profileId" value={profile.id} />
        <button
          className="inline-flex items-center rounded-full border border-amber-700 p-2.5 text-center text-sm font-medium text-amber-700 hover:cursor-pointer hover:bg-amber-700 hover:text-white focus:ring-4 focus:ring-amber-300 focus:outline-none disabled:cursor-not-allowed dark:border-amber-500 dark:text-amber-500 dark:hover:bg-amber-500 dark:hover:text-white dark:focus:ring-amber-800"
          name="action"
          value="delete"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <LoaderCircle size={20} className="animate-spin" />
          ) : (
            <Trash size={20} />
          )}
          <span className="sr-only">Delete Profile</span>
        </button>
      </fetcher.Form>
      {isDeleting ? (
        <p>
          <del>
            {profile.name} <span className="text-gray-500">{profile.sex}</span>
          </del>
        </p>
      ) : (
        <Link to={`/profiles/${profile.id}/edit`}>
          {profile.name} <span className="text-gray-500">{profile.sex}</span>
        </Link>
      )}
    </li>
  );
}
