import type { Job } from "bullmq";

import axios from "axios";

import type { GetAnalyzeData } from "./types/analyze.types";
import { DI } from "../main";
import config from "../config";
import { v4 } from "uuid";

export const getAnalyze = async (job: Job<GetAnalyzeData, any>) => {
  console.log(job.data);
  return;
  const chatId = v4();
  const message = job.data;
  const payload = {
    chatId,
    message,
    stream: false,
  };

  const response = await axios.post(config.external.chat.url, payload, {
    headers: {
      Authorization: `${config.external.chat.token}`,
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });

  const result = response.data;
  DI.mlQueue.addJob("done_analyse", result);
};
