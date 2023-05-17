import wait from "@src/utils/wait";

export default async function getMySelector() {
  const mySelector = {
    head: { count: 1 },
    body: { count: 2 },
    footer: { count: 3 },
  };

  return wait(5000, mySelector);
}