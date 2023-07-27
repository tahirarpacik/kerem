import { Base } from "./base";

export class Eventlog implements Base {
  constructor(
    public ip?: String,
    public tarih?: String,
    public aciklama?: String,
    public kullaniciAdi?: String
  ) {}
  id: string;
}
