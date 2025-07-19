import { Car } from "./car.interface"

export interface Request {
    id_request: number,
    initialDate: string,
    finalDate: string,

}
export interface Requests {
    initialDate: string,
    finalDate: string,
}

export interface RequestSend {
    amount?: number,
    initialDate?: Date,
    finalDate?: Date,
    user_id: string,
    car_id: string,
    state: string,
}

export interface RequestReceived {
    amount: number,
    brand: string,
    finalDate: string,
    car_id: Car,
    id: string,
    initialDate: string,
    model: string,
    price: number,
    state: string
}
