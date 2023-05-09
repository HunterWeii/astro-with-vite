export default function findItem<I>(key: string) {
  return (data:I[]) => {
    const item = data.find(d => d?.key === key);
		return item?.value ?? null   
  }
}