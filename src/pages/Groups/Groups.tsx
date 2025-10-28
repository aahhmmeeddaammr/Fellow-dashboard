import SelectField from "../../components/common/SelectField";
import FellowGroupCard from "../../components/Fellow/FellowGroupCard";
import { useFellowGroups } from "../../Hooks/useFellow";
import { memo, Suspense, useMemo } from "react";
import { useForm } from "react-hook-form";

interface FilterFormData {
  search: string;
  package: string;
  ageGroup: string;
  day: string;
}

export default function Groups() {
  const { data } = useFellowGroups();

  const { control, watch, register, formState } = useForm<FilterFormData>({
    defaultValues: {
      search: "",
      package: "",
      ageGroup: "",
      day: "",
    },
  });

  const formValues = watch();

  const selectOptions = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        packageOptions: [],
        ageGroupOptions: [],
        dayOptions: [],
      };
    }

    const uniquePackages = [...new Set(data.map((item) => item.packageName))];
    const packageOptions: SelectType[] = uniquePackages.map((pkg) => ({
      item: pkg,
      value: pkg,
    }));

    const uniqueAgeGroups = [...new Set(data.map((item) => item.ageGroup))];
    const ageGroupOptions: SelectType[] = uniqueAgeGroups.map((age) => ({
      item: `Age Group: ${age}`,
      value: age,
    }));

    // Get unique days from schedule
    const uniqueDays = [...new Set(data.map((item) => item.schedule))];
    const dayOptions: SelectType[] = uniqueDays.map((day) => ({
      item: day,
      value: day,
    }));

    return {
      packageOptions,
      ageGroupOptions,
      dayOptions,
    };
  }, [data]);

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((item) => {
      const matchesSearch =
        !formValues.search ||
        item.groupName.toLowerCase().includes(formValues.search.toLowerCase()) ||
        item.packageName?.toLowerCase().includes(formValues.search.toLowerCase());

      const matchesPackage = !formValues.package || item.packageName === formValues.package;
      const matchesAgeGroup = !formValues.ageGroup || item.ageGroup === formValues.ageGroup;
      const matchesDay = !formValues.day || item.schedule === formValues.day;
      return matchesSearch && matchesPackage && matchesAgeGroup && matchesDay;
    });
  }, [data, formValues]);

  return (
    <>
      <main className="flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <h1 className="text-primary text-4xl font-bold">Groups</h1>
          <div className="flex gap-4">
            <img
              src="https://placehold.co/35"
              width={35}
              height={35}
              className="rounded-full"
              alt="User profile"
              loading="lazy"
            />
          </div>
        </header>

        <section aria-label="Group filters" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="relative">
            {/* Left Icon */}
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 peer-focus:text-primary">
              {/* Example: magnifying glass icon (lucide-react / heroicons / svg) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </div>

            <input
              id="search"
              type="text"
              placeholder="Search..."
              {...register("search")}
              className={`peer w-full p-3 ps-11
      text-primaryDark bg-white border-2 rounded-lg font-medium outline-none 
      placeholder:text-[#979797] focus:border-primary focus:bg-primarySubtle 
      hover:border-primary hover:bg-primarySubtle 
      hover:placeholder:text-primaryDark focus:placeholder:text-primaryDark
      ${formState?.errors?.search?.message ? "border-red-500" : "border-gray-400"}`}
            />
          </div>

          {formState?.errors?.search?.message && (
            <p className="mt-1 text-xs text-red-500">{String(formState.errors.search.message)}</p>
          )}

          {formState?.errors?.search?.message && <p className="text-xs text-red-500">{formState?.errors?.search?.message}</p>}
          <SelectField label="Package" name="package" control={control} fixed options={selectOptions.packageOptions} />
          <SelectField label="Age Group" name="ageGroup" control={control} fixed options={selectOptions.ageGroupOptions} />
          <SelectField label="Day" name="day" control={control} fixed options={selectOptions.dayOptions} />
        </section>

        <section aria-label="Groups list">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense fallback={<h1>Loading...</h1>}>
              {filteredData?.map((item) => (
                <MemoizedGroupCard key={item.groupId} data={item} />
              ))}
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}

const MemoizedGroupCard = memo(FellowGroupCard);
