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
    initialDate: string,
    finalDate: string,
    user_id: string,
    car_id: string,
    state: string,
}

export interface requestReceived {
    amount: number
    brand: string
    final_date: string
    id_request: number
    initial_date: string
    model: string
    price: number
    state: string
}
