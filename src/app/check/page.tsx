import { Suspense } from "react";
import SearchPage from "./checkContent";

export default function Check() {
    return (
        <Suspense fallback={ <div className="flex items-center min-h-screen justify-center bg-[#898AC4] text-[#FFF2E0] p-12 text-center text-2xl font-bold">Please Wait..</div> }>
            <SearchPage />
        </Suspense>
    );
}