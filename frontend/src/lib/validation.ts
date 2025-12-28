export interface FormState {
  user_id: string;
  displayname: string;
  email: string;
  password: string;
  confirmPassword: string;
  disabled: boolean;
  groups: string[];
}

export interface FormErrors {
  user_id?: string;
  displayname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  submit?: string;
}

export function validateUserForm(form: FormState, mode: "create" | "edit"): FormErrors {
  const errors: FormErrors = {};

  // user_id: required on create, alphanumeric + underscore/hyphen, 1-64 chars
  if (mode === "create") {
    if (!form.user_id) {
      errors.user_id = "Username is required";
    } else if (!/^[a-zA-Z0-9_-]{1,64}$/.test(form.user_id)) {
      errors.user_id = "Username must be 1-64 characters (letters, numbers, underscore, hyphen)";
    }
  }

  // displayname: required, 1-256 chars
  if (!form.displayname?.trim()) {
    errors.displayname = "Display name is required";
  } else if (form.displayname.length > 256) {
    errors.displayname = "Display name must be 256 characters or less";
  }

  // email: required, valid email format
  if (!form.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email format";
  }

  // password: required on create
  if (mode === "create" && !form.password) {
    errors.password = "Password is required";
  }

  // confirmPassword: must match if password provided
  if (form.password && form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
