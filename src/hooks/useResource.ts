import { Resource } from "../classes/Resource";

export function useResource<T>(resource: Resource<T>): T {
  return resource.read();
}
