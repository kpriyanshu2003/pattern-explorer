/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { LocalStorageQueries } from "@/@types/LocalStorage";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import Typewriter from "typewriter-effect";

function Main({ id }: { id?: string }) {
  const [fileContent, setFileContent] = useState<string>("");
  const [fileName, setFileName] = useState({
    showFile: false,
    fileName: "",
  });

  useEffect(() => {
    if (!id) return;
    const query = JSON.parse(localStorage.getItem("queries") || "[]").find(
      (query: LocalStorageQueries) => query.id === id
    );
    if (!query) return;
    setFileContent(query.content);
    setFileName({ ...fileName, showFile: true, fileName: query.title });
  }, [id]);

  const callGPT = async () => {
    setFileName({ ...fileName, showFile: true });
    const searches = localStorage.getItem("searches");
    if (!searches)
      localStorage.setItem("searches", JSON.stringify([fileContent]));
    else {
      const nextState = JSON.parse(searches);
      nextState.push(fileContent);
      localStorage.setItem("searches", JSON.stringify(nextState));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (!file) return;
    const reader = new FileReader();

    setFileName({ ...fileName, fileName: file.name });
    reader.onload = (e) => setFileContent((e.target?.result as string) || "");
    reader.onerror = () => console.error("Error reading file");
    reader.readAsText(file);
  };

  return (
    <div className="w-full relative p-6 ml-20">
      <div className="w-full text-center text-2xl font-bold mb-5">
        {fileName.showFile && fileName.fileName}
      </div>
      <div className="flex justify-center">
        <div className="w-9/12 h-5/6 overflow-auto">
          {fileName.showFile && fileName.fileName && (
            <div className="flex items-center justify-end mb-10">
              <div className="rounded-md border bg-white text-black px-4 py-2 text-sm font-light">
                {fileName.fileName}
              </div>
            </div>
          )}
          {id && (
            <div className="leading-loose tracking-widest w-4/6">
              <Typewriter
                onInit={(typewriter) => {
                  const content =
                    JSON.parse(localStorage.getItem("queries") || "[]").find(
                      (query: LocalStorageQueries) => query.id === id
                    )?.content || "";

                  typewriter.typeString(content).start(); // Start the typewriter effect
                }}
                options={{ cursor: "", delay: 50 }}
              />
            </div>
          )}
        </div>
        <div className="w-1/2 bottom-5 absolute">
          <div className="flex justify-center gap-5">
            <Input
              type="file"
              placeholder="Hello User..!"
              className="w-full"
              accept=".txt"
              onChange={handleFileUpload}
            />
            <Button onPress={() => callGPT()} className="aspect-square">
              <BsSendFill />
            </Button>
          </div>
          <div className="text-sm text-center mt-2">
            Only txt file uploads are supported. And, files are not stored once
            uploaded to Ai.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
