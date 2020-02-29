export interface ITreeElement<T> {
  parent: ITreeElement<T>;
  localPath: string;
  readonly data: T;
  readonly children: ITreeElement<T>[];
  readonly path: any;

  get(fieldName: string): any;

  set(fieldName: string, value: any);

  hasChildren(): boolean;

  addChild(child: ITreeElement<T>): ITreeElement<T>;
}
