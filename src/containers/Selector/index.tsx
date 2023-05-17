import { useQuery, } from "@tanstack/react-query";
import getMySelector from "./api";
import {
  selectHeadCount,
  selectDoubleHeadCount,
  selectStructuredBody,
} from './selector';
import { useState } from "react";

export default function MySelector() {
  useQuery({
    queryKey: ['mySelector'],
    queryFn: getMySelector,
    staleTime: 0,
    refetchOnWindowFocus: false
  });

  const [ count, setCount ] = useState(0);

  const body = selectStructuredBody();

  return (
    <div>
      <div>
        <button onClick={ () => setCount(c => c + 1) }>add this : {count}</button>
      </div>
      <div>
        Header:
        <p>count: { selectHeadCount() }</p>
        <p>double: { selectDoubleHeadCount() }</p>
      </div>
      <div>
        Body:
        <p>count: { body.count }</p>
        <p>double: { body.double }</p>
      </div>
    </div>
  )
}