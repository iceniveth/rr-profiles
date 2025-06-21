import { useSearchParams } from "react-router";
import { QUALITIES } from "~/lib/profiles";
import QualityFilterItem from "./QualityFilterItem";

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
        {QUALITIES.slice(0, 4).map((quality) => (
          <QualityFilterItem
            key={quality}
            quality={quality}
            checkedQualities={checkedQualities}
            checked={isQualityChcked(quality)}
          />
        ))}
      </div>
    </>
  );
}
