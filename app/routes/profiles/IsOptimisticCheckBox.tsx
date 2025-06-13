import { Form, useSearchParams, useSubmit } from "react-router";

export default function IsOptimisticCheckBox() {
  const [searchParams] = useSearchParams();
  const submit = useSubmit();

  return (
    <Form>
      <label className="group inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          name="isOptimistic"
          defaultChecked={!!searchParams.get("isOptimistic")}
          value="true"
          className="peer sr-only"
          onChange={(e) => {
            submit(e.target);
            console.log(e.target.checked);
          }}
        />
        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 group-has-checked:bg-amber-600 peer-focus:ring-4 peer-focus:ring-amber-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] group-has-checked:after:translate-x-full group-has-checked:after:border-white rtl:group-has-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:group-has-checked:bg-amber-600 dark:peer-focus:ring-amber-800"></div>
        <span className="ms-3 text-sm font-medium group-has-checked:inline">
          <span className="group-has-checked:hidden">Pessimistic UI</span>
          <span className="hidden group-has-checked:inline">Optimistic UI</span>
        </span>
      </label>
    </Form>
  );
}
