// src/app/core/services/http-error-handler.service.ts
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export interface ParsedHttpError {
    status: number;
    statusMsg: string;
    message: string;
    raw: HttpErrorResponse;
}

@Injectable({
    providedIn: 'root'
})
export class HttpErrorHandlerService {

    parse(error: any): ParsedHttpError {
        let parsed: ParsedHttpError = {
            status: 0,
            statusMsg: 'Unknown',
            message: 'Error desconocido',
            raw: error
        };

        if (error instanceof HttpErrorResponse) {
            parsed.status = error.status;
            parsed.statusMsg = error.error?.statusMsg || error.statusText || 'Error';
            parsed.message = error.error?.message || 'Error inesperado';
        }

        return parsed;
    }
}
