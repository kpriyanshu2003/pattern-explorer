"use client";

import { LocalStorageQueries } from "@/@types/LocalStorage";
import classNames from "classnames";
import Link from "next/link";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { GoSidebarCollapse } from "react-icons/go";
import { GoPencil } from "react-icons/go";

function SideBar({ id }: { id?: string }) {
  const [open, setOpen] = useState(true);
  const toggleSideBar = () => setOpen(!open);

  /**
   * Function: handleDelete
   * Description: Removes a specific query object from the local storage by its unique `id`.
   * Parameters: 
   *  - `id` (string): The unique identifier of the query to be deleted.
   * Functionality:
   *  1. Retrieves the "queries" array from local storage, or initializes an empty array if it doesn't exist.
   *  2. Filters out the query object that matches the provided `id`.
   *  3. Updates the local storage with the filtered array.
   *  4. Redirects the user to the root ("/") of the application.
   */
  const handleDelete = (id: string) => {
    const queries = JSON.parse(localStorage.getItem("queries") || "[]");
    const newQueries = queries.filter(
      (query: LocalStorageQueries) => query.id !== id
    );
    localStorage.setItem("queries", JSON.stringify(newQueries));
    window.location.href = "/"; 
  };

  return (
    <div
      className={classNames(
        "hidden text-white sticky h-screen bg-zinc-800 transition-all duration-300",
        { "w-0": !open, "w-96": open }
      )}
    >
      <div className="flex items-center gap-4 absolute top-4 left-4">
        <GoSidebarCollapse
          className={classNames("hidden lg:block w-6 h-6 cursor-pointer")}
          onClick={() => toggleSideBar()}
        />
        <GoPencil
          className={classNames("w-6 h-6 cursor-pointer ")}
          onClick={() => (window.location.href = "/")}
        />
      </div>

      <div
        className={classNames("flex flex-col items-start mt-16 px-1", {
          hidden: !open,
        })}
      >
        {localStorage.getItem("queries") &&
          JSON.parse(localStorage.getItem("queries") || "[]")?.map(
            (item: LocalStorageQueries) => (
              <Link
                href={`/q/${item.id}`}
                passHref
                className={classNames(
                  "my-1 w-full flex items-center justify-between hover:bg-zinc-900 transition-all duration-300 px-4 py-2 rounded-md",
                  {
                    "bg-zinc-900": item.id === id,
                  }
                )}
                key={item.id}
              >
                <span className="overflow-hidden w-full whitespace-nowrap cursor-pointer">
                  {item.title}
                </span>
                <FaTrash
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => handleDelete(item.id)}
                />
              </Link>
            )
          )}
      </div>
    </div>
  );
}

export default SideBar;
