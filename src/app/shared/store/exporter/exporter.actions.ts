import { Action } from '@ngrx/store';
import { ExporterModel } from './exporter.model';

export const START = '[Exporter] Start';
export const CREATE_PDF = '[Exporter] Create PDF';
export const GOT_MISSING = '[Exporter] Got missing conversations';
export const EXPORT_IDS = '[Exporter] Ready IDs to export';
export const COMPLETE = '[Exporter] Complete';

export class Start implements Action {
  readonly type = START;
}
export class CreatePdf implements Action {
  readonly type = CREATE_PDF;
  constructor(public element: HTMLElement) {}
}
export class GotMissing implements Action {
  readonly type = GOT_MISSING;
}
export class ExportIds implements Action {
  readonly type = EXPORT_IDS;
  constructor(public ids: string[]) {}
}
export class Complete implements Action {
  readonly type = COMPLETE;
}

export type All =
  | Start
  | CreatePdf
  | GotMissing
  | ExportIds
  | Complete;
