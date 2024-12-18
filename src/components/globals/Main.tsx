"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";
import { BsSendFill } from "react-icons/bs";

function Main() {
  return (
    <div className="border w-full flex justify-center bg-red-400 relative p-6">
      <div className="border w-3/4 h-5/6 mt-6">xgf</div>
      <div className="w-1/2 bottom-5 absolute">
        <div className="flex justify-center gap-5">
          <Input
            type="file"
            placeholder="Hello User..!"
            className="w-full"
            accept=".txt"
          />
          <Button onClick={() => alert("uploaded")} className="aspect-square">
            <BsSendFill />
          </Button>
        </div>
        <div className="text-sm text-center border">
          Only txt file uploads are supported. And, files are not stored once
          uploaded to Ai.
        </div>
      </div>
    </div>
  );
}

export default Main;
