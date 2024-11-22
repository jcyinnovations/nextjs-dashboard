'use client';

import React, { useEffect, useState, Suspense } from "react";

let cacheMap: any = {
    'https://jsonplaceholder.typicode.com/todos/1?_delay=2000': {'title': 'Hello World!'},
    'https://jsonplaceholder.typicode.com/todos/2?_delay=2000': {'title': 'Bonjour!'},
    'https://jsonplaceholder.typicode.com/todos/3?_delay=2000': {'title': 'Buenos Dias!'},
};
function fetchWithSuspense(url: string) {
  if (cacheMap[url]) 
    return cacheMap[url];

  const promise = fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      cacheMap = { ...cacheMap, [url]: data };
      return data;
    });

  throw promise;
}

const Todo = ({ id }: any) => {
  const data = fetchWithSuspense(
    `https://jsonplaceholder.typicode.com/todos/${id}?_delay=2000`
  );

  return <p>{data.title}</p>;
};

export default function Temp() {
  return (
    <div>
      <Suspense fallback={<p>...loading</p>}>
        <Todo id={1} />
        <Todo id={2} />
        <Todo id={3} />
      </Suspense>
    </div>
  );
};