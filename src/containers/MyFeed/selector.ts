import { queryClient } from "@src/main";
import { createSelector } from "reselect";

const selectMyFeed = () => queryClient.getQueryData(['myfeed']);

export const selectMyFeedMessage = () => {
  return createSelector(selectMyFeed, data => {
    console.log('selector running:', data);
    return data?.msg
  })
}