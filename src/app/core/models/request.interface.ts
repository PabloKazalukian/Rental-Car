export interface request {
    id_request: number,
    initialDate: string,
    finalDate: string,

}
export interface requests {
    initialDate: string,
    finalDate: string,
}

export interface requestSend {
    amount: number,
    initialDate: string,
    finalDate: string,
    user_id: string,
    car_id: string,
    state: string,
}

export interface requestReceived {
    amount: number,
    brand: string,
    finalDate: string,
    id: string,
    initialDate: string,
    model: string,
    price: number,
    state: string
}
