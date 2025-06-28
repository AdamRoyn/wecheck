import ToolTip from "./ToolTip";

interface CardProps {
  value: string;
  tooltip: string;
  svg: React.ReactNode;
}

interface LoadProps {
  value: string;
  active: boolean;
}

export function Card({ value, tooltip = "n/a", svg }: CardProps) {
  return (
    <div className="flex flex-1 items-center bg-[#898AC4] rounded-xl text-[#FFF2E0] p-2 max-w-1/2 min-w-full">
      <ToolTip text={tooltip}>
        <div className="bg-[#A2AADB] text-[#898AC4] rounded-md">{svg}</div>
      </ToolTip>
      <p className="pl-2 text-md font-semibold">{value}</p>
    </div>
  );
}

export function Load({ value = "Error When Catch Data..", active }: LoadProps) {
  if(!active) return null;
   return (
    <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#A2AADB] text-[#FFF2E0] rounded-2xl ${!active ? "hidden" : ""}`}>
      <span className="animate-spin"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M8.124 5a8 8 0 1 0 7.752 0"></path></svg></span>
      <p className="font-bold mt-2">
        {value}
        </p>
    </div>
  );
}
