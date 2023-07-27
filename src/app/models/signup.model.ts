import { Base } from "./base";
import { KullaniciTipi } from "./enum/kullaniciTipi.enum";

export class Signup {
  constructor(
    public username?: string,
    public email?: string,
    public password?: String,
    public name?: String,
    public surName?: String,
    public phoneNumber?: String,
    public address?: String
  ) {}
}
