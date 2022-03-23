import { AbstractControl } from '@angular/forms';

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password :any = control.get('password');
  const confirmPassword: any = control.get('confirmPassword');
  if (password.pristine || confirmPassword.pristine) {
    return null;
  }
  return password && confirmPassword && password.value !== confirmPassword.value ? { 'misMatch': true } : null;
}