export interface GPT4Response {
  status: number;
  data?: {
    result: string;
    status: boolean;
    server_code: number;
  };
}

export interface GPT4oReponse {
  status: number;
  data?: {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: [
      {
        index: number;
        message: {
          role: string;
          content: string;
          refusal: boolean;
        };
        logprobs: null;
        finish_reason: string;
      }
    ];
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
      prompt_tokens_details: {
        cached_tokens: number;
        audio_tokens: number;
      };
      completion_tokens_details: {
        reasoning_tokens: number;
        audio_tokens: number;
        accepted_prediction_tokens: number;
        rejected_prediction_tokens: number;
      };
    };
    system_fingerprint: string;
  };
}
