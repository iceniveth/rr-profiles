import { profiles } from "~/lib/profiles";
import type { Route } from "./+types";
import { data, Link } from "react-router";
import { flashCookie } from "~/lib/cookies/flashCookies";
import QualitiesFilter from "./QualitiesFilter";
import ProfileItem from "./ProfileItem";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await flashCookie.getSession(request.headers.get("Cookie"));

  // how to get the search params from the request
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const qualities = searchParams.getAll("qualities");

  const message = session.get("message");

  const filteredProfiles = profiles.filter((profile) => {
    const hasQualities = qualities.some((q) => q);

    if (!hasQualities) return true;

    return qualities.every((quality) =>
      profile.qualities.some((q) => q === quality),
    );
  });

  return data(
    { profiles: filteredProfiles, message },
    {
      headers: {
        "Set-Cookie": await flashCookie.destroySession(session),
      },
    },
  );
}

export default function Profiles({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl">Profiles</h2>

          <div>
            <Link
              to="/profiles/new"
              className="inline-block rounded-sm bg-orange-500 px-2 py-1 text-white"
            >
              New
            </Link>
          </div>
        </div>

        {loaderData.message && (
          <div className="flex justify-between bg-green-300 p-1">
            <p>{loaderData.message}</p>
            <Link
              to="/profiles"
              replace
              className="inline-block rounded-sm border-2 px-2 hover:bg-green-700"
            >
              Close
            </Link>
          </div>
        )}

        <div className="my-4"></div>

        <QualitiesFilter />

        <div className="my-4"></div>

        <ul>
          {loaderData.profiles.map((profile) => (
            <ProfileItem key={profile.id} profile={profile} />
          ))}
        </ul>
      </div>
    </>
  );
}
