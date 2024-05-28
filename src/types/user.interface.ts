export interface UserInterface {
  id: string | number;
  username: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  comparePassword(password: string): Promise<boolean>;
}
