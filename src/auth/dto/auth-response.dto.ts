export class AuthResponseDto {
  access_token!: string;
  user!: {
    id: string | number;
    name: string | null;
    email: string;
  };
}
