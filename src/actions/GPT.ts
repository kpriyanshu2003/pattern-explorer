"use server";
import axios from "axios";

export async function pingGPT() {
  try {
    const response = await axios.request({
      method: "GET",
      url: "https://chatgpt-42.p.rapidapi.com",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
      },
    });
    return { status: response.status, data: response.data };
  } catch (e) {
    console.log(e);
    return { status: 500 };
  }
}

export async function getGPTResponse(message: string) {
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
        system_prompt: "Start each sentence with 'Suii'",
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false,
      },
    });
    return { status: response.status, data: response.data };
  } catch (e) {
    console.log(e);
    return { status: 500 };
  }
}
