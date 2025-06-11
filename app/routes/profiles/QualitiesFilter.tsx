import { Form, useSearchParams } from "react-router";
import { QUALITIES } from "~/lib/profiles";

export default function QualitiesFilter() {
  const [searchParams] = useSearchParams();
  const checkedQualities = searchParams.getAll("qualities");

  function isQualityChcked(quality: string) {
    return checkedQualities.includes(quality);
  }

  return (
    <>
      <p className="text-md">Filters</p>
      <div className="flex flex-wrap gap-2">
        {QUALITIES.map((quality) => (
          <Form key={quality} action="/profiles">
            {checkedQualities
              .filter((cq) => quality !== cq)
              .map((q, idx) => (
                <input key={q + idx} type="hidden" name="qualities" value={q} />
              ))}

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
    </>
  );
}
