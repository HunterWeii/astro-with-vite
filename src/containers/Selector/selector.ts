import { queryClient } from "@src/main";
import { createSelector, createStructuredSelector } from "reselect";

const compose = sourceSelector => selector => () => selector(sourceSelector());

const initState = {
  head: { count: 0 },
  body: { count: 0 },
  footer: { count: 0 },
};

const mySelectorState = () => queryClient.getQueryData(['mySelector']) ?? initState;

const composeSelector = compose(mySelectorState);

const selectHead = (data: typeof initState) => data?.head;
const selectBody = (data: typeof initState) => data?.body;

export const selectHeadCount = composeSelector(createSelector([selectHead], head => head?.count ?? 0))
export const selectDoubleHeadCount = composeSelector(createSelector([selectHeadCount], headCount => headCount *2));

export const selectBodyCount = () => {
  return createSelector(
    selectBody,
    body => body.count
  )
};

export const selectBodyDoubleCount = () => {
  return createSelector(
    selectBodyCount(),
    bodyCount => bodyCount * 2
  )
};

export const selectStructuredBody = () => {
  console.log('xx');
  return createStructuredSelector({
    count: selectBodyCount(),
    double: selectBodyDoubleCount(),
  })(mySelectorState())
};