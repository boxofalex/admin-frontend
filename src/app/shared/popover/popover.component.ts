import {
  Component,
  OnInit,
  TemplateRef,
  ReflectiveInjector,
  Injector,
  InjectionToken,
} from '@angular/core';
import {
  PopoverRef,
  PopoverContent
} from './popover-ref';
import { ObjectHelper } from '@app/shared/helpers';

export const DATA = new InjectionToken<any>('data', { providedIn: 'root', factory: () => 'data' });

@Component({
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  renderMethod: 'template' | 'component' | 'text' = 'component';
  content: PopoverContent;
  context;
  componentDataInjector: Injector;

  set dataInjector(data) {
    if (data) {
      this.componentDataInjector = ReflectiveInjector.resolveAndCreate([{ provide: DATA, useValue: data }], this.parentInjector);
    }
  }

  constructor(
    private popoverRef: PopoverRef,
    private parentInjector: Injector
  ) { }

  ngOnInit() {
    this.content = this.popoverRef.content;
    this.dataInjector = ObjectHelper.mergeObjects(this.popoverRef.data, {
      close: this.popoverRef.close.bind(this.popoverRef)
    });

    if (typeof this.content === 'string') {
      this.renderMethod = 'text';
    }

    if (this.content instanceof TemplateRef) {
      this.renderMethod = 'template';
      this.context = {
        close: this.popoverRef.close.bind(this.popoverRef),
        positionStrategy$: this.popoverRef.positionStrategy.positionChanges,
        data: this.popoverRef.data
      };
    }
  }
}
