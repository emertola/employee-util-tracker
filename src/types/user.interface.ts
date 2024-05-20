export interface UserInterface {
  id: string | number;
  name: string;
  displayName: string;
  comparePassword(password: string): Promise<boolean>;
}
