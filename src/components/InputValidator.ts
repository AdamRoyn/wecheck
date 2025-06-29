import React from "react";
// import { redirect, RedirectType } from 'next/navigation';
import { useRouter } from "next/navigation";
let fully = false;
type AppRouterInstance = ReturnType<typeof useRouter>;

export function checkInput(event: React.ChangeEvent<HTMLInputElement>): void {
  const input = event.target;
  
  const value = input.value.trim();
  const wordCount = value === "" ? 0 : value.split(/\s+/).length;
  
  const isTooShort = value.length < 3 || wordCount >= 3;
  const isTooLong = value.length >= 39;
  
  if (isTooShort || isTooLong) {
    input.classList.remove("outline-[#898AC4]");
    input.classList.add("outline-red-500", "outline-2");
    fully = false;
  } else {
    input.classList.remove("outline-red-500");
    input.classList.add("outline-[#898AC4]");
    fully = true;
  }
}

export function sendQuery(router : AppRouterInstance, id = "lokasion", btn = "search-button"): void {
  const input = document.getElementById(id) as HTMLInputElement | null;
  const go = document.getElementById(btn) as HTMLInputElement | null;

  if(!input) return;
  if(!go) return;

  if(!input.value) {
    input.classList.remove("outline-[#898AC4]");
    input.classList.add("outline-red-500", "outline-2");
    return;
  }
  
  if(fully) {
    // alert(`Input: ${input.value}`);
    go.classList.add("cursor-progress");
    router.push(`/check?location=${encodeURIComponent(input.value)}`);
  } else {
    input.classList.remove("outline-[#898AC4]");
    go.classList.remove("cursor-progress");
    input.classList.add("outline-red-500", "outline-2");
  }
}