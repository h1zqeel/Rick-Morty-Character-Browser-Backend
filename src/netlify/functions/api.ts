import serverless from "serverless-http";
import { createApp } from "../../server.js";

const api = await createApp();

export const handler = serverless(api);