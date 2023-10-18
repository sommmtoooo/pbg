import { ChangeEvent } from "react";
import { BsFilter, BsX } from "react-icons/bs";
export type ProcessSearchBarInterface = {
  name: string;
  setName: (name: string) => void;
};

export default function ProcessSearchBar({
  name,
  setName,
}: ProcessSearchBarInterface) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target?.value);
  };

  const handleReset = () => {
    setName("");
  };

  return (
    <>
      <section className="bg-secondary bg-opacity-20">
        <div className="flex">
          <button
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 "
            type="button"
          >
            <BsFilter className="text-primary" />
          </button>
          <div className="relative w-full">
            <input
              type="search"
              className="bg-secondary bg-opacity-25 p-2.5 w-full text-sm text-head text-primary focus:outline-none"
              value={name}
              onChange={handleChange}
              placeholder="Filter by name..."
              required
            />
          </div>
          {name !== "" ? (
            <button
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-s-full hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
              type="button"
              onClick={handleReset}
            >
              <BsX className="text-primary" />
            </button>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
}
