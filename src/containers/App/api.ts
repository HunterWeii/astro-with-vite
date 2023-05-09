import { QueryFunctionContext } from "@tanstack/react-query";
const dfAPI = 'https://digital-fortress-dev.eco.astro.com.my/dev/config/YG1B7zny4m/config.json';

export async function getConfig({ signal }:QueryFunctionContext) {
  try {
    const response = await fetch(dfAPI, { signal });
    const responseData = await response.json();
    
    return responseData;
  } catch(error) {
    return error;
  }
}