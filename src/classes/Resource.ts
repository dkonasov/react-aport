export class Resource<T> {
  private value: T;
  private status: "pending" | "resolved" | "error" = "pending";
  private promise: Promise<void>;
  private error: unknown;

  constructor(promise: Promise<T>) {
    this.promise = promise
      .then((value) => {
        this.status = "resolved";
        this.value = value;
      })
      .catch((err) => {
        this.error = err;
        this.status = "error";
      });
  }

  read(): T {
    if (this.status === "resolved") {
      return this.value;
    }

    if (this.status === "error") {
      throw this.error;
    }

    throw this.promise;
  }
}
