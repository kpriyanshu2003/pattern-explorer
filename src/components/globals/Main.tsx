/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { GPT4Response } from "@/@types/GPTResponse";
import { LocalStorageQueries } from "@/@types/LocalStorage";
import { getGPTResponse } from "@/actions/GPT";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import Typewriter from "typewriter-effect";
import { v4 as uuid } from "uuid";

function Main({ id }: { id?: string }) {
  const [fileContent, setFileContent] = useState<string>("");
  const [fileName, setFileName] = useState({ showFile: false, fileName: "" });
  const [loading, setLoading] = useState(false);

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
    if (!fileContent || fileContent.length === 0)
      return alert("Please upload a file first");

    setLoading(true);
    setFileName({ ...fileName, showFile: true });

    try {
      const response: GPT4Response = await getGPTResponse(fileContent);
      if (response.status !== 200 || !response.data)
        throw new Error("Error calling GPT");

      const id = uuid();
      const queries = JSON.parse(localStorage.getItem("queries") || "[]");
      queries.push({
        id,
        title: fileName.fileName,
        content: response.data.result,
      });
      localStorage.setItem("queries", JSON.stringify(queries));

      window.location.href = `/q/${id}`;
    } catch (error) {
      console.error(error);
      alert("Error calling GPT");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (!file) return;
    const reader = new FileReader();

    setFileName({ ...fileName, fileName: file.name.split(".")[0] });
    reader.onload = (e) => setFileContent((e.target?.result as string) || "");
    reader.onerror = () => console.error("Error reading file");
    reader.readAsText(file);
  };

  return (
    <div className="w-full relative ml-20 flex justify-center items-center flex-col">
      <div className="w-full text-center text-2xl font-bold -mt-10">
        {fileName.showFile && fileName.fileName}
      </div>

      <div className="w-10/12 h-5/6 pb-10 overflow-auto px-5">
        <div>
          {fileName.showFile && fileName.fileName && (
            <div className="flex items-center justify-end mb-10">
              <div className="rounded-md bg-white text-black px-4 py-2 text-sm font-light">
                {fileName.fileName}.txt
              </div>
            </div>
          )}
        </div>
        {id && (
          <div className="leading-loose tracking-widest w-4/6">
            <Typewriter
              onInit={(typewriter) => {
                const content =
                  JSON.parse(localStorage.getItem("queries") || "[]").find(
                    (query: LocalStorageQueries) => query.id === id
                  )?.content || "";

                typewriter.typeString(content).start();
              }}
              options={{ cursor: "", delay: 50 }}
            />
          </div>
        )}

        {!fileName.showFile && (
          <div className="h-full grid place-items-center text-center">
            <div>
              <span className="text-2xl font-bold">
                Hello There, I am able to analyze Whatsapp Chat exports.
              </span>
              <br />
              <span className="text-lg font-thin">
                Please upload one to try.
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="w-1/2 bottom-5 absolute left-1/2 transform -translate-x-1/2">
        <div className="flex justify-center gap-5">
          <Input
            type="file"
            className="w-full"
            accept=".txt"
            onChange={handleFileUpload}
            disabled={fileName.showFile}
          />
          <Button
            onPress={() => callGPT()}
            className="aspect-square"
            isLoading={loading}
            isDisabled={fileName.showFile}
          >
            <BsSendFill />
          </Button>
        </div>
        <div className="text-sm text-center mt-2">
          Only txt file uploads are supported. And, files are not stored once
          uploaded to Ai.
        </div>
      </div>
    </div>
  );
}

export default Main;
