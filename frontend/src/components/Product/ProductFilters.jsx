import { useState, useEffect } from "react";

const categoryTypes = [
  "Accessories",
  "Body Bar",
  "Buffing Bar",
  "Soap Fluff",
  "Sugar Glow",
];

const categoryScents = [
  "Bakery",
  "Citrus",
  "Clean",
  "Floral",
  "Fruity",
  "Herbal",
  "Masculine",
  "Sweet",
  "Unscented",
];

export default function ProductFilters({ types, scents, setTypes, setScents }) {
  // useState Hooks
  const [open, setOpen] = useState(window.innerWidth < 768 ? false : true);

  // useEffect Hooks
  useEffect(() => {
    const handleWindowResize = () => {
      window.innerWidth < 768 ? setOpen(false) : setOpen(true);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  // Event Handlers
  const handleTypeChange = (type) => {
    if (types.includes(type)) {
      setTypes(types.filter((t) => t !== type));
    } else {
      setTypes([...types, type]);
    }
  };

  const handleScentChange = (scent) => {
    if (scents.includes(scent)) {
      setScents(scents.filter((s) => s !== scent));
    } else {
      setScents([...scents, scent]);
    }
  };

  const handleToggle = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <>
      <aside
        id="product-filters"
        className="w-full overflow-hidden rounded-lg border border-gray-300 bg-white-50 shadow-sm sm:w-56"
      >
        <details id="filters-details" open={open}>
          <summary
            role="switch"
            className="flex items-center justify-between bg-gray-100 px-5 py-3 sm:hidden"
            onClick={handleToggle}
          >
            <span className="text-sm font-medium"> Toggle Filters </span>

            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </summary>

          <form id="filters-form" className="">
            <fieldset>
              <legend className="block w-full border-b border-gray-300 bg-gray-50 px-5 py-3 text-base font-medium leading-6">
                Type
              </legend>

              <div className="space-y-2 px-5 py-6">
                {categoryTypes.map((type, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={index}
                      type="checkbox"
                      name={type}
                      checked={types.includes(type)}
                      onChange={() => handleTypeChange(type)}
                      className="h-4 w-4 rounded border-gray-300 text-pink-300 focus:ring-pink-300"
                    />

                    <label htmlFor={type} className="ml-3 text-sm leading-6">
                      {type}
                    </label>
                  </div>
                ))}

                <div className="pt-2">
                  <button
                    name="resetType"
                    type="button"
                    onClick={() => setTypes([])}
                    className="text-xs text-gray-500 underline underline-offset-1"
                  >
                    Reset Type
                  </button>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="block w-full border-y border-gray-300 bg-gray-50 px-5 py-3 text-base font-medium leading-6">
                Scent
              </legend>

              <div className="space-y-2 px-5 py-6">
                {categoryScents.map((scent, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={index}
                      type="checkbox"
                      name={scent}
                      checked={scents.includes(scent)}
                      onChange={() => handleScentChange(scent)}
                      className="h-4 w-4 rounded border-gray-300 text-pink-300 focus:ring-pink-300"
                    />

                    <label htmlFor={scent} className="ml-3 text-sm leading-6">
                      {scent}
                    </label>
                  </div>
                ))}

                <div className="pt-2">
                  <button
                    name="resetScent"
                    type="button"
                    onClick={() => setScents([])}
                    className="text-xs text-gray-500 underline underline-offset-1"
                  >
                    Reset Scent
                  </button>
                </div>
              </div>
            </fieldset>

            <div className="flex justify-between border-t border-gray-300 px-5 py-4">
              <button
                name="resetAll"
                type="button"
                onClick={() => {
                  setTypes([]);
                  setScents([]);
                }}
                className="text-xs font-medium text-gray-500 underline underline-offset-1"
              >
                Reset All
              </button>
            </div>
          </form>
        </details>
      </aside>
    </>
  );
}
