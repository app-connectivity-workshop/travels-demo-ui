
export class CityDetails {

    flights: Flight[];
    cars: Car[];
    hotels: Hotel[];
    insurances: Insurance[];
    constructor() {
        this.flights = new Array();
        this.cars = new Array();
        this.hotels = new Array();
        this.insurances = new Array();
    }
}


export class Flight {
    airline: string;
    price: number;
    constructor() {
        this.airline = ""
        this.price = 0.0

    }
}

export class Hotel {
    hotel: string;
    price: number;
    constructor() {
        this.hotel = ""
        this.price = 0.0

    }
}



export class Car {
    carModel: string;
    price: number;
    constructor() {
        this.carModel = ""
        this.price = 0.0
    }

}


export class Insurance {
    company: string;
    price: number;
    constructor() {
        this.price = 0.0
        this.company = ""
    }

}


