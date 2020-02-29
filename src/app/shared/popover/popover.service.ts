import {
  Injectable,
  Injector,
} from '@angular/core';
import {
  Overlay,
  ConnectionPositionPair,
  PositionStrategy,
  OverlayConfig,
} from '@angular/cdk/overlay';
import {
  PortalInjector,
  ComponentPortal,
} from '@angular/cdk/portal';
import {
  PopoverRef,
  PopoverContent,
} from './popover-ref';
import { PopoverComponent } from './popover.component';

export interface PopoverParams<T> {
  width?: string | number;
  height?: string | number;
  origin: HTMLElement;
  content: PopoverContent;
  data?: T;
}

export interface PopoverControl {
  popoverRef: PopoverRef;
  positionStrategy: PositionStrategy;
}

export enum PopoverClasses {
  popover_backdrop_white = 'popover-backdrop-white',
  popover_backdrop_black = 'popover-backdrop-black',
}

@Injectable({
  providedIn: 'root'
})
export class Popover {

  constructor(private overlay: Overlay, private injector: Injector) { }

  open<T>(
    {
      origin,
      content,
      data,
      minWidth,
      width,
      height,
      position,
      backdropClass,
      withBackdrop,
      closeOnBackDropClick = true,
    },
  ) {
    const positionStrategy = this.getOverlayPosition(origin, position);
    const overlayRef = this.overlay.create(
      this.getOverlayConfig(
        { minWidth, width, height },
        positionStrategy,
        backdropClass,
        withBackdrop
      )
    );
    const popoverRef = new PopoverRef<T>(
      overlayRef,
      content,
      data,
      positionStrategy,
      closeOnBackDropClick
    );
    const injector = this.createInjector(popoverRef, this.injector);
    overlayRef.attach(new ComponentPortal(PopoverComponent, null, injector));

    return { popoverRef, positionStrategy };
  }

  private getOverlayConfig(
    { minWidth, width, height },
    positionStrategy,
    backdropClass,
    withBackdrop = true
  ): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop: withBackdrop,
      width,
      minWidth,
      height,
      backdropClass: backdropClass ? backdropClass : 'popover-backdrop',
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
  }

  private getOverlayPosition(origin, positions) {
    if (origin) {
      const newOrigin = origin._elementRef ? origin._elementRef.nativeElement : origin.nativeElement;
      const positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(newOrigin)
        .withPositions(this.getPositions(positions))
        .withFlexibleDimensions(false)
        .withPush(false);
      return positionStrategy;
    } else {
      const positionStrategy = this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically();
      return positionStrategy;
    }
  }

  createInjector(popoverRef: PopoverRef, injector: Injector) {
    const tokens = new WeakMap([[PopoverRef, popoverRef]]);
    return new PortalInjector(injector, tokens);
  }

  private getPositions(positions): ConnectionPositionPair[] {
    if (positions) {
      return positions;
    }
    return [
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      },
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top'
      }
    ];
  }
}
