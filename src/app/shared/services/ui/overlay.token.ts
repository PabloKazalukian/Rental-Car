import { InjectionToken } from '@angular/core';
import { OverlayRef } from './overlay-ref';

export const OVERLAY_REF = new InjectionToken<OverlayRef>('OVERLAY_REF');
export const OVERLAY_DATA = new InjectionToken<unknown>('OVERLAY_DATA');
