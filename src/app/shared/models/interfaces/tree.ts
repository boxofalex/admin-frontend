import { ITreeElement } from './tree-element';

export interface ITree<T> {
  readonly roots: ITreeElement<T>[];

  filter(callback?: (item: T) => boolean): ITree<T>;

  addElement(element: ITreeElement<T>);

  find(callback: (item: T) => boolean): ITreeElement<T>;

  flatten(): T[];

  flattenElements(): ITreeElement<T>[];

  walk(callback: (item: T) => boolean): void;

  hasData(): boolean;
}
