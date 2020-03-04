import { FieldConstructor } from '@shared/field-constructor';

export class MenuItem {
  title: string;
  description?: string;
  link: string;
  linkRoot: string;
  icon: string;
  baseColor: string;
  activeColor: string;
  children: MenuItem[];

  constructor(data: any) {
    this.title = FieldConstructor.from(data, 'title').string();
    this.description = FieldConstructor.from(data, 'description').string();
    this.link = FieldConstructor.from(data, 'link').string();
    this.linkRoot = FieldConstructor.from(data, 'linkRoot').string();
    this.icon = FieldConstructor.from(data, 'icon').string();
    this.baseColor = FieldConstructor.from(data, 'baseColor').string();
    this.activeColor = FieldConstructor.from(data, 'activeColor').string();
    this.children = FieldConstructor.from(data, 'children').arrayOf(MenuItem);
  }
}
