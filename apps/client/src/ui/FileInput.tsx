import { ChangeEvent, useState } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  displayName?: string | null;
  placeholder?: string;
  inputRef?: React.MutableRefObject<HTMLInputElement>;
}

export default function FileInput({
  displayName,
  placeholder = "No file chosen",
  inputRef,
  onChange,
  ...rest
}: Props) {
  const [file, setFile] = useState<File>();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (onChange) onChange(e);

    const file = e.target.files?.[0];
    if (file) setFile(file);
  }
  const fileName = displayName === undefined ? file?.name : displayName;

  return (
    <label>
      <div className="flex cursor-pointer items-center rounded-lg bg-neutral-100 py-2.5 px-4 transition hover:bg-neutral-200 active:opacity-80">
        <div className="select-none border-r border-neutral-400 pr-4">Choose File</div>
        <div className={`select-none break-all pl-4 ${fileName ? "" : "text-neutral-500"}`}>
          {fileName ?? placeholder}
        </div>
      </div>

      <input ref={inputRef} type="file" className="hidden" onChange={handleChange} {...rest} />
    </label>
  );
}
