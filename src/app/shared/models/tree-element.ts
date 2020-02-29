import { ITreeElement } from './interfaces/tree-element';

export class TreeElement<T> implements ITreeElement<T> {
  _children: ITreeElement<T>[] = [];
  readonly data: T;
  public parent: ITreeElement<T> = null;
  public localPath;

  constructor(data: T) {
    this.data = data;
  }

  get children(): ITreeElement<T>[] {
    return this._children;
  }

  get path(): any {
    if (this.parent) {
      return `${this.parent.path}.${this.localPath}`;
    } else {
      return this.localPath;
    }
  }

  get(fieldName: string): any {
    return this.data[fieldName];
  }

  set(fieldName: string, value: any) {
    this.data[fieldName] = value;
    return this;
  }

  hasChildren(): boolean {
    return this._children.length > 0;
  }

  clearChildren() {
    this._children = [];
  }

  addChild(child: ITreeElement<T>): ITreeElement<T> {
    child.parent = this as TreeElement<T>;
    this._children.push(child);
    return child;
  }
}
