export interface request {
    id_request: number,
    initial_date: string,
    final_date: string,

}
export interface requests {
    initial_date: string,
    final_date: string,
}

export interface requestSend {
    initial_date: string,
    final_date: string,
    created_by?: number,
    rented_car?: number,
    stateReq: boolean
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
