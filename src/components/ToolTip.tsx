interface TipProps {
  text: string;
  children: React.ReactNode;
}

export default function ToolTip({ text, children }: TipProps) {
  return (
    <div className="relative group inline-block z-0">
      <div className="absolute text-sm bottom-full left-1/2 -translate-x-1/2 -translate-y-2 z-40 opacity-0 group-hover:opacity-100 transition ease-in duration-100 px-2 py-1 bg-[#A2AADB] text-[#FFF2E0] rounded-md text-center whitespace-nowrap outline-2 outline-[#898AC4] after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-[#A2AADB]">
        {text}
      </div>
      {children}
    </div>
  );
}
