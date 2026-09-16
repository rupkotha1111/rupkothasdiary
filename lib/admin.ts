export const ADMIN_EMAIL = "drobobd5@gmail.com";

export function isAdminEmail(email: string | undefined) {
  return email?.trim().toLowerCase() === ADMIN_EMAIL;
}