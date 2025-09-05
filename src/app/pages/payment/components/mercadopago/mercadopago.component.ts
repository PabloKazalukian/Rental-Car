import { Component, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var MercadoPago: any; // porque el SDK no tiene typings

@Component({
    selector: 'app-payment',
    templateUrl: './mercadopago.component.html',
    styleUrl: './mercadopago.component.scss',
})
export class MercadoPagoComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        const mp = new MercadoPago(environment.public_key, { locale: 'es-AR' });
        const bricksBuilder = mp.bricks();

        const settings = {
            initialization: {
                amount: 100, // TODO: traer el monto dinámicamente
                payer: { email: '' },
            },
            customization: {
                visual: {
                    style: {
                        customVariables: {
                            textPrimaryColor: '#ffffff',
                            textSecondaryColor: '#b0b0b0',
                            inputBackgroundColor: '#2e2e2e',
                            formBackgroundColor: '#121212bb',
                            baseColor: '#d63a3a',
                            baseColorFirstVariant: '#b02c55',
                            baseColorSecondVariant: '#3a6ebf',
                            errorColor: '#cc1e2c',
                            successColor: '#4caf50',
                            outlinePrimaryColor: '#393939',
                            outlineSecondaryColor: '#3a6ebf',
                            buttonTextColor: '#ffffff',
                            fontSizeExtraSmall: '0.75rem',
                            fontSizeSmall: '0.75rem',
                            fontSizeMedium: '1rem',
                            fontSizeLarge: '1rem',
                            fontSizeExtraLarge: '1.5rem',
                            fontWeightNormal: '400',
                            fontWeightSemiBold: '400',
                            formInputsTextTransform: 'none',
                            inputVerticalPadding: '0.5rem',
                            inputHorizontalPadding: '1rem',
                            inputFocusedBoxShadow: '0 0 0 2px rgba(214, 58, 58, 0.5)',
                            inputErrorFocusedBoxShadow: '0 0 0 2px rgba(204, 30, 44, 0.5)',
                            inputBorderWidth: '1px',
                            inputFocusedBorderWidth: '2px',
                            borderRadiusSmall: '0.25rem',
                            borderRadiusMedium: '0.5rem',
                            borderRadiusLarge: '1rem',
                            borderRadiusFull: '9999px',
                            formPadding: '2rem',
                        },
                        theme: 'bootstrap',
                    },
                },
                paymentMethods: { maxInstallments: 1 },
            },
            callbacks: {
                onReady: () => console.log('Brick listo'),
                onSubmit: (cardFormData: any) => {
                    return new Promise((resolve, reject) => {
                        fetch('http://localhost:3001/api/payment', {
                            // tu backend
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(cardFormData),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log('Respuesta pago:', data);
                                resolve(data);
                            })
                            .catch((err) => reject(err));
                    });
                },
                onError: (error: any) => console.error(error),
            },
        };

        bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
    }
}
