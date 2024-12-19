"use server";
import axios from "axios";
import { GPT4Response } from "@/@types/GPTResponse";

export async function pingGPT(): Promise<GPT4Response | { status: number }> {
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

export async function getGPTResponse(message: string): Promise<GPT4Response> {
  try {
    const response = await axios.request({
      method: "POST",
      // url: "https://gpt-4o7.p.rapidapi.com/v1/chat/completions",
      url: "https://chatgpt-42.p.rapidapi.com/conversationgpt4-2",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        // "x-rapidapi-host": "gpt-4o7.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        messages: [
          // { role: "system", content: "Start each sentence with 'Suiii'" },
          { role: "user", content: message },
        ],
        // temperature: 1,
        // max_tokens: 2048,
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
