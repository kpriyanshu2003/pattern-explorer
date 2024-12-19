// This file contains functions to interact with the GPT-4 API via RapidAPI.
// The functions handle GET and POST requests to communicate with the API and process responses.

"use server";

import axios from "axios";
import { GPT4Response } from "@/@types/GPTResponse";

/**
 * Function to check if the GPT API is reachable by sending a GET request.
 *
 * @returns {Promise<GPT4Response>} - A promise resolving to a GPT4Response object or an object with the status code.
 */
export async function pingGPT(): Promise<GPT4Response>  {
  try {
    const response = await axios.request({
      method: "GET",
      url: "https://chatgpt-42.p.rapidapi.com",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
      },
    });
    return { status: 200, data: response.data };
  } catch (e) {
    console.log(e);
    return { status: 500 };
  }
}

/**
 * Function to send a user message to the GPT API and receive a structured response.
 *
 * @param {string} message - The user message to send to GPT.
 * @returns {Promise<GPT4Response>} - A promise resolving to a GPT4Response object containing the structured response.
 *
 * The response is expected to follow a specific structure defined in the system prompt:
 * 1. Content category
 * 2. Theme
 * 3. Pattern
 * 4. Mapped Content relationship
 */
export async function getGPTResponse(message: string): Promise<GPT4Response> {
  try {
    const response = await axios.request({
      method: "POST",
      url: "https://chatgpt-42.p.rapidapi.com/conversationgpt4-2",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        messages: [
          { role: "user", content: message },
        ],
        system_prompt: `analyze this text, and provide me response in structured manner. in the following way
1.  Content category
2. Theme
3. Pattern 
4. Mapped Content relationship`,
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false,
      },
    });
    return { status: 200, data: response.data };
  } catch (e) {
    console.log(e);
    return { status: 500 };
  }
}
