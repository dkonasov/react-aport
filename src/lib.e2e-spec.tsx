import React from "react";
import { FC, Suspense } from "react";
import client, { Root } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Resource } from "./classes/Resource";
import { useResource } from "./hooks/useResource";

let container: HTMLDivElement | null = null;
let root: Root | null;

interface ResourceComponentProps {
  resource: Resource<unknown>;
}

const ResourceComponent: FC<ResourceComponentProps> = ({ resource }) => {
  const value = useResource(resource);

  return <>{value}</>;
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = client.createRoot(container);
});

afterEach(() => {
  act(() => {
    root?.unmount();
  });
  root = null;
  container?.remove();
  container = null;
});

describe("Library e2e", () => {
  it("should render loader while loading", () => {
    act(() => {
      const resource = new Resource(new Promise(() => {}));
      root?.render(
        <Suspense fallback="Loading...">
          <ResourceComponent resource={resource} />
        </Suspense>
      );
    });

    expect(container.innerHTML).toBe("Loading...");
  });

  it("should render result if it was loaded", async () => {
    let resolver: (value: string) => void;
    const promise = new Promise<string>((resolve) => (resolver = resolve));

    await act(async () => {
      const resource = new Resource(promise);
      root?.render(
        <Suspense fallback="Loading...">
          <ResourceComponent resource={resource} />
        </Suspense>
      );

      resolver("foo");
      await promise;
    });

    expect(container.innerHTML).toBe("foo");
  });

  it("throw error if promise was rejected", () => {
    const error = new Error("Some awfull error");
    let rejector: (error: Error) => void;
    const promise = new Promise<string>((_, reject) => (rejector = reject));

    expect(
      act(async () => {
        const resource = new Resource(promise);
        root?.render(
          <Suspense fallback="Loading...">
            <ResourceComponent resource={resource} />
          </Suspense>
        );

        rejector(error);
        try {
          await promise;
        } catch (e) {}
      })
    ).rejects.toEqual(error);
  });
});
