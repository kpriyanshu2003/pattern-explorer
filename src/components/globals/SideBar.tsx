"use client";

import classNames from "classnames";
import React, { useState } from "react";
import { GoSidebarCollapse } from "react-icons/go";
import { GoPencil } from "react-icons/go";
import { FaTrash } from "react-icons/fa6";

function SideBar() {
  const [open, setOpen] = useState(true);
  const toggleSideBar = () => setOpen(!open);
  const handleDelete = () => {
    console.log("Item Deleted");
  };
  return (
    <div
      className={classNames(
        "sticky h-screen bg-green-300 transition-all duration-300",
        { "w-0": !open, "w-80": open }
      )}
    >
      <GoSidebarCollapse
        className={classNames("w-6 h-6 absolute top-2 cursor-pointer", {
          "right-2": open,
          "left-2": !open,
        })}
        onClick={() => toggleSideBar()}
      />
      <div className={classNames("relative", { hidden: !open })}>
        <GoPencil
          className={classNames(
            "w-6 h-6 absolute -top-8 cursor-pointer right-10"
          )}
        />
        <div className="flex flex-col items-start mt-12 px-5">
          <div className="border w-full flex items-center justify-between">
            <span className="overflow-hidden w-48 whitespace-nowrap">
              item 1
            </span>
            <FaTrash className="w-3 h-3" onClick={() => handleDelete()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
