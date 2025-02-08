/* eslint-disable max-classes-per-file */
export class RetrieveKnownError extends Error {
  constructor(
    public code: string,
    public message: string,
  ) {
    super(message)
    this.name = "RetrieveKnownError"
  }
}

export class RetrieveNotKnownError extends Error {
  constructor(
    public code: string,
    public message: string,
  ) {
    super(message)
    this.name = "RetrieveNotKnownError"
  }
}
