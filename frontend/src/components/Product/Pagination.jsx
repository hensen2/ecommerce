import { useMemo } from "react";

export default function Pagination({
  currentPage,
  totalPageCount,
  onPageChange,
}) {
  let paginationRange = useMemo(() => {
    if (totalPageCount === 1) {
      onPageChange(1);
      return [1];
    }
    let indexArr = [];
    for (let i = 1; i <= totalPageCount; i++) {
      indexArr.push(i);
    }
    return indexArr;
  }, [onPageChange, totalPageCount]);

  let lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    if (currentPage !== lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <>
      <ul className="flex justify-center gap-1 text-xs font-medium">
        <li
          className="mr-1 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:border hover:border-gray-500"
          onClick={onPrevious}
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </li>
        {paginationRange.map((pageNumber) => (
          <li
            key={pageNumber}
            className={
              pageNumber === currentPage
                ? "block h-8 w-8 cursor-default rounded border border-slate bg-brandPink text-center font-semibold leading-8 text-slate"
                : "block h-8 w-8 cursor-pointer rounded border border-slate text-center font-semibold leading-8"
            }
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
        <li
          className="ml-1 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:border hover:border-gray-500"
          onClick={onNext}
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </li>
      </ul>
    </>
  );
}
