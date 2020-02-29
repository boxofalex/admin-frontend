import { FieldConstructor } from '@shared/field-constructor';

export class Uri {
  public authority: string; // [userInfo@](ipv4|ipv6|hostName)[:port]
  public fragment: string; // after #
  public host: string; // host only from authority
  public path: string; // after first "/"
  public pathSplitted: string[]; // path splitted to array
  public port: string; // port from authority
  public query: string; // after ?
  public scheme: string; // before first :
  public uri: string; // all uri
  public userInfo: string; // userInfo from authority

  constructor(parameters?: { [index: string]: any }) {
    this.authority = FieldConstructor.from(parameters, 'authority').string();
    this.fragment = FieldConstructor.from(parameters, 'fragment').string();
    this.host = FieldConstructor.from(parameters, 'host').string();
    this.path = FieldConstructor.from(parameters, 'path').string();
    this.pathSplitted = this.path.slice(1).split('/');
    this.port = FieldConstructor.from(parameters, 'port').string();
    this.query = FieldConstructor.from(parameters, 'query').string();
    this.scheme = FieldConstructor.from(parameters, 'scheme').string();
    this.uri = FieldConstructor.from(parameters, 'uri').string();
    this.userInfo = FieldConstructor.from(parameters, 'userInfo').string();
  }
}
