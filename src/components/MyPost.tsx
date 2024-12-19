"use client";

import React from "react";

function MyPost({ slug }: { slug: string }) {
  if (typeof window === "undefined") {
    // This block will only run during SSR (shouldn't normally be needed)
    return <div>Loading...</div>;
  }

  return <div>My Post: {slug}</div>;
}

export default MyPost;
