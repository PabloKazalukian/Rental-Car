export interface Car {
    id: number,
    image: string,
    brand: string,
    model: string,
    year: number,
    price: number,
    specificationsCar: SpecificationsCar,
    created_at: string
}

export interface SpecificationsCar {
    acceleration: string,
    consumption: string,
    max_speed: string,
    engine: string,
    power: string,
    torque: string,
    weight: string,
}
