import { Form, useNavigate, useNavigation } from "react-router";

type Props = {
  checkedQualities: string[];
  quality: string;
  checked?: boolean;
};

export default function QualityFilterItem({
  checkedQualities,
  quality,
  checked = false,
}: Props) {
  const navigation = useNavigation();
  const optimisticQualities = navigation.formData?.getAll("qualities") || [];
  const optimisticChecked =
    navigation.state === "loading"
      ? optimisticQualities.includes(quality)
      : checked;

  const optimisticCheckedQualities =
    navigation.state === "idle"
      ? checkedQualities
      : optimisticChecked
        ? checkedQualities.concat(quality)
        : checkedQualities.filter((q) => q !== quality);

  return (
    <Form action="/optimistic-profiles" fetcherKey={quality}>
      {optimisticCheckedQualities
        .filter((cq) => quality !== cq)
        .map((q, idx) => (
          <input key={q + idx} type="hidden" name="qualities" value={q} />
        ))}

      <button
        type="submit"
        className="rounded border-1 p-1 px-2 hover:cursor-pointer aria-checked:border-orange-500 aria-checked:text-orange-500"
        role="checkbox"
        aria-checked={optimisticChecked}
        {...(optimisticChecked ? {} : { name: "qualities", value: quality })}
      >
        {quality}
      </button>
    </Form>
  );
}
