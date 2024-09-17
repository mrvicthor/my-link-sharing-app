export const OK = 200;
export const CREATED = 201;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const INTERNAL_SERVER_ERROR = 500;
export const CONFLICT = 409;
export const UNPROCESSABLE_ENTITY = 422;
export const TOO_MANY_REQUESTS = 429;

export type HttpStatusCode =
  | typeof OK
  | typeof CREATED
  | typeof BAD_REQUEST
  | typeof UNAUTHORIZED
  | typeof FORBIDDEN
  | typeof NOT_FOUND
  | typeof INTERNAL_SERVER_ERROR
  | typeof CONFLICT
  | typeof UNPROCESSABLE_ENTITY
  | typeof TOO_MANY_REQUESTS;
