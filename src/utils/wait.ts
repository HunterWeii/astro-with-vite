export default function wait<T>(ms = 1000, data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), ms) 
  });
}