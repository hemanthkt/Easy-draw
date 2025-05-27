interface InputProps {
  placeholder: string;
}

export default function Input({ placeholder }: InputProps) {
  return (
    <div className="p-3">
      <div className="w-full max-w-sm min-w-[200px]">
        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
