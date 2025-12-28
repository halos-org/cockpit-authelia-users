/**
 * User data as returned from the backend API.
 * Password hash is never included.
 */
export interface User {
  user_id: string;
  displayname: string;
  email: string;
  disabled: boolean;
  groups: string[];
}

/**
 * User data for create/update operations.
 * Password is plaintext (hashed by backend).
 */
export interface UserInput {
  displayname: string;
  email: string;
  password?: string;
  disabled?: boolean;
  groups?: string[];
}

/**
 * Error response from the backend.
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
