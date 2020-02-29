import { TreeElement } from './tree-element';
import { ITree } from './interfaces/tree';
import { ITreeElement } from './interfaces/tree-element';
import { ArrayHelper } from '@shared/helpers';

export class Tree<T> implements ITree<T> {
  readonly roots: ITreeElement<T>[] = [];

  constructor(roots: T[] = [], childrenField: string | string[] = 'children', pathBase?: string) {
    this.roots = Tree._getTreeElementsArray(roots, childrenField, pathBase);
  }

  public static make<A>(roots: A[], childrenField: string | string[] = 'children', pathBase?: string): Tree<A> {
    return new Tree<A>(roots, childrenField, pathBase);
  }

  private static _getTreeElementsArray<A>(items: A[], childrenField: any = 'children', pathBase?: string): ITreeElement<A>[] {
    const res = [];
    items.forEach(item => {
      const parent = new TreeElement<A>(item);
      parent.localPath = item[pathBase];
      if (ArrayHelper.checkIfArray(childrenField)) {
        for (let field of childrenField) {
          if (item[field] && item[field].length > 0) {
            const children = Tree._getTreeElementsArray<A>(item[field], childrenField, pathBase);
            children.forEach(child => {
              child.localPath = `${field}.${child.data[pathBase]}`;
              parent.addChild(child);
            });
          }
        }
      } else {
        if (item[childrenField] && item[childrenField].length > 0) {
          const children = Tree._getTreeElementsArray<A>(item[childrenField], childrenField);
          children.forEach(child => {
            child.localPath = `${childrenField}.${child.data[pathBase]}`;
            parent.addChild(child);
          });
        }
      }
      res.push(parent);
    });
    return res;
  }

  public static findParents(item) {
    const _findParents = (el) => {
      if (el && !el.parent) {
        return [el];
      } else {
        return [el, ..._findParents(el.parent)];
      }
    };
    const parents = _findParents(item);
    return parents.reverse();
  }

  public static findChildren(element, callback: (item: any) => boolean) {
    const _findChildren = (el) => {
      if (el && el.children.length === 0) {
        if (callback(el)) {
          return [el];
        } else {
          return [];
        }
      } else {
        const allChildren = el.children.map((child, index) => {
          if (callback(child)) {
            return _findChildren(child);
          } else {
            return [];
          }
        });
        if (callback(el)) {
          return ArrayHelper.flattenDeep([el, ...allChildren]);
        } else {
          return [];
        }
      }
    };
    const foundChildren = _findChildren(element);
    return foundChildren;
  }

  public static walk(roots, callback: (item: any) => boolean, data: boolean = true) {
    roots.forEach(item => {
      callback(data ? item.data : item);
      if (item.hasChildren()) {
        this.walk(callback, item.children, data);
      }
    });
  }

  public filter(callback?: (item: T) => boolean, onlyRoots: boolean = false): Tree<T> {
    if (!callback) {
      return this as Tree<T>;
    }
    const res = new Tree<T>();
    this._filter(callback, this.roots, onlyRoots).forEach(root => res.addElement(root));
    return res;
  }

  private _filter(callback: (item: T) => boolean, items: ITreeElement<T>[], rootsFlag: boolean): ITreeElement<T>[] {
    const res = [];
    items.forEach(item => {
      if (rootsFlag) {
        if (callback(item.data)) {
          res.push(item);
        }
      } else {
        const parent = new TreeElement(item.data);
        let hasChildren = false;
        if (item.hasChildren()) {
          const children = this._filter(callback, item.children, rootsFlag);
          if (children.length > 0) {
            hasChildren = true;
            children.forEach(child => {
              parent.addChild(child);
            });
          }
        }
        if (callback(item.data) || hasChildren) {
          res.push(parent);
        }
      }
    });
    return res;
  }

  addElement(element: ITreeElement<T>) {
    this.roots.push(element);
  }

  public find(callback: (item: T) => boolean): ITreeElement<T> {
    return this._find(callback, this.roots);
  }

  private _find(callback: (item: T) => boolean, items: ITreeElement<T>[]): ITreeElement<T> {
    let res = items.find(item => callback(item.data));
    if (!res) {
      items.forEach(item => {
        if (item.hasChildren() && !res) {
          res = this._find(callback, item.children);
        }
      });
    }
    return res;
  }

  public flatten(data: boolean = true): T[] {
    if (data) {
      return this.flattenElements().map(item => item.data);
    } else {
      return this.flattenElements();
    }
  }

  public flattenElements(): any {
    return this._flattenElements(this.roots);
  }

  public _flattenElements(elements: ITreeElement<T>[]): ITreeElement<T>[] {
    const res = [];
    elements.forEach(el => {
      res.push(el);
      if (el.hasChildren()) {
        res.push(...this._flattenElements(el.children));
      }
    });

    return res;
  }

  public walk(callback: (item: any) => boolean, data: boolean = true): void {
    this._walk(callback, this.roots, data);
  }

  private _walk(callback: (item: any) => boolean, items: ITreeElement<T>[], data): void {
    items.forEach(item => {
      callback(data ? item.data : item);
      if (item.hasChildren()) {
        this._walk(callback, item.children, data);
      }
    });
  }

  public hasData(): boolean {
    return this.roots.length > 0;
  }
}
