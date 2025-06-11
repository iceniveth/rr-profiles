import { Form, useSearchParams } from "react-router";
import { QUALITIES } from "~/lib/profiles";

export default function QualitiesFilter() {
  const [searchParams] = useSearchParams();
  const checkedQualities = searchParams.getAll("qualities");

  function isQualityChcked(quality: string) {
    return checkedQualities.includes(quality);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {/* {checkedQualities.map((quality) => (
          <input key={quality} type="hidden" name="qualities" value={quality} />
          ))} */}

      {QUALITIES.map((quality) => (
        <Form key={quality} action="/profiles">
          {checkedQualities.map((q, idx) =>
            isQualityChcked(quality) ? null : (
              <input key={q + idx} type="hidden" name="qualities" value={q} />
            ),
          )}
          <button
            type="submit"
            className="rounded border-1 p-1 px-2 hover:cursor-pointer aria-checked:border-orange-500 aria-checked:text-orange-500"
            role="checkbox"
            aria-checked={isQualityChcked(quality)}
            {...(isQualityChcked(quality)
              ? {}
              : { name: "qualities", value: quality })}
          >
            {quality}
          </button>
        </Form>
      ))}
    </div>
  );
}
