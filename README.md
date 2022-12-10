# React Aport &middot; [![npm](https://img.shields.io/npm/v/react-aport)](https://www.npmjs.com/package/react-aport)

Simple library for data fetching with `<Suspense>` in React.

## Links

 - [Demo](https://codesandbox.io/s/dank-hill-rsn3l1?file=/src/App.tsx)

## Example usage

```jsx
import { Suspense } from "react";
import { Resource, useResource } from "react-aport";

const Article = ({resource}) => {
    const article = useResource(resource);

    return (
        <>
            <h2>{article.title}</h2>
            <div>{article.text}</div>
        </>
    );
};

const resource = new Resource((await fetch("https://my-awesome-api.com/articles/42")).json());

const Page = () => (
    <Suspense fallback="Loading...">
        <Article resource={resource} />
    </Suspense>
)
```

## API

### Resource\<T\>

A common class to handle a resource

#### constructor

|arg|type|description|
|:--|:---|:----------|
|promise|`Promise<T>`|A promise, that resolves a resource|

#### read\<T\>

Tries to read a resource. If promise was resolved, returns resolved value, if it it is loading throws a Promise, if promise rejects, throws rejected value.

### useResource\<T\>

Hook-wrapper for handling resource in components. Actually, it just calls resource `read` method.

|arg|type|description|
|:--|:---|:----------|
|resource|`Resource<T>`|A resource to handle|