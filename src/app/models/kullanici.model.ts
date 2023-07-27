import { Base } from "./base";
import { KullaniciTipi } from "./enum/kullaniciTipi.enum";

export class Kullanici implements Base {
  constructor(
    public email?: String,
    public sifre?: String,
    public isim?: String,
    public soyisim?: String,
    public telefon?: String,
    public aktif?: boolean,
    public kullaniciTipi?: KullaniciTipi
  ) {}
  id: string;
}
