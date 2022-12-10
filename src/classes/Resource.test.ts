import { Resource } from "./Resource";

describe("Resource class", () => {
  it("should throw if promise is not resolved", () => {
    const resource = new Resource(new Promise(() => {}));
    expect(() => resource.read()).toThrow();
  });

  it("should throw promise if not resource is not resolved", () => {
    const resource = new Resource(new Promise(() => {}));
    let err: unknown;

    try {
      resource.read();
    } catch (e) {
      err = e;
      expect(err).toBeInstanceOf(Promise);
    }
  });

  it("should not throw promise if value is resolved", async () => {
    const promise = Promise.resolve();
    const resource = new Resource(promise);

    await promise;
    expect(() => resource.read()).not.toThrow();
  });

  it("suspender should notify, that resource is resolved", async () => {
    let suspender: Promise<void>;

    const resource = new Resource(Promise.resolve());

    try {
      resource.read();
    } catch (e) {
      suspender = e;
    }

    expect(suspender).toBeDefined();
    await suspender;

    expect(() => resource.read()).not.toThrow();
  });

  it("read method should return valid value", async () => {
    let suspender: Promise<void>;

    const resource = new Resource(Promise.resolve(42));

    try {
      resource.read();
    } catch (e) {
      suspender = e;
    }

    expect(suspender).toBeDefined();
    await suspender;

    expect(resource.read()).toBe(42);
  });

  it("if promise rejects, read method should throw", async () => {
    let suspender: Promise<void>;
    const dummyError = new Error("dummy error");

    const resource = new Resource(Promise.reject(dummyError));

    try {
      resource.read();
    } catch (e) {
      suspender = e;
    }

    expect(suspender).toBeDefined();
    await suspender;

    expect(() => resource.read()).toThrowError(dummyError);
  });
});
