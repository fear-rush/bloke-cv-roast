"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <>
      <header className="w-full p-4 bg-white border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">CV Roast</h1>
          <Button
            variant="outline"
            onClick={() => console.log("Google login clicked")}
            className="sm:hidden text-gray-800 border-gray-300 hover:bg-gray-100"
            size="icon"
          ></Button>
        </div>
      </header>
    </>
  );
}
