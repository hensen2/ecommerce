export default function Checkbox({
  id,
  name,
  checked,
  handleOnChange,
  htmlFor,
  value,
}) {
  return (
    <>
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleOnChange(name)}
          className="h-5 w-5 rounded border-gray-300"
        />

        <label htmlFor={htmlFor} className="ml-3 text-sm font-medium">
          {value}
        </label>
      </div>
    </>
  );
}
