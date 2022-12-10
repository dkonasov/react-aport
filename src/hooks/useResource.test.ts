import { Resource } from "../classes/Resource";
import { useResource } from "./useResource";

describe("useResource hook", () => {
  it("should call resource read method", () => {
    const spy = jest.spyOn(Resource.prototype, "read");
    spy.mockImplementation(() => {});
    const resource = new Resource(Promise.resolve());
    useResource(resource);
    expect(spy).toHaveBeenCalled();
  });

  it("should return value from resource", () => {
    const spy = jest.spyOn(Resource.prototype, "read");
    spy.mockReturnValue(42);
    const resource = new Resource(Promise.resolve());
    expect(useResource(resource)).toBe(42);
  });

  it("should throw exception from resource", () => {
    const spy = jest.spyOn(Resource.prototype, "read");
    const err = new Error("dummy error");
    spy.mockImplementation(() => {
      throw err;
    });
    const resource = new Resource(Promise.resolve());
    expect(() => useResource(resource)).toThrowError(err);
  });
});
