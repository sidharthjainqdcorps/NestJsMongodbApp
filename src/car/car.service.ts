import { Injectable, HttpException } from '@nestjs/common';
import { CARS } from './car.mock'; // displaying mock data
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICar } from './interfaces/car.interface';
import { CarDto } from './dto/car.dto';


//create projections -- fields we dont want to reflect from db in output in postman or anywhere our result is rendered

const carProjection = { //filter out fields
  __v: false,
  _id: false,
};

@Injectable()  // inject it into car controller -- have to create Injectable() decorator
export class CarService {
  // private cars = CARS;

  constructor(@InjectModel('Car') private readonly carModel: Model<ICar>) {} // inject this carModel inside service

  public async getCars(): Promise<CarDto[]> {//get all cars in db/array
    // return {}; will return empty dictionary as we are returning {}
    // return this.cars; // will return mock data from car.mock.ts

    //new code of line after connecting with mongodb
    const cars = await this.carModel.find({}, carProjection).exec();
    //adding error handling
    if (!cars || !cars[0]) { // either anything not found or at 0th index - first place there's nothing no data.
      throw new HttpException('Not Found', 404);
    }
    return cars;
  }

  //Create car --post req(POST)
  public async postCar(nawCar: CarDto) {
    // return this.cars.push(car);

    //new code of line after connecting with mongodb
    const car = await this.carModel(nawCar);
    return car.save();
  }

  //Get car by id --get req --read(GET/:id)
  public async getCarById(id: number): Promise<CarDto> {
    const car = await this.carModel.findOne({ id }, carProjection).exec();
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }

  public async deleteCarById(id: number): Promise<CarDto> {//id annoted by number explicitly
    // const carId = Number(id);
    // return new Promise((resolve)=>{
    // const car = this.cars.find((car) => car.id=== id); // find the id of the car
    // if(!car){
    //     throw new HttpException('Not found!' , 404); // text and status code
    // }
    // return resolve(car);
    //  });

    //new code of line after connecting with mongodb
    const car = await this.carModel.deleteOne({ id }).exec();
    if (car.deleteCount === 0) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }


  //modify details of car by id -- Update req(PUT) -- from one to as many details present in db/model created
  public async putCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<CarDto> { // const carId = Number(id);
    // return new Promise((resolve)=>{
    // const index = this.cars.findIndex((car) => car.id=== carId);
    // if(index === -1){
    //     throw new HttpException('Not found!' , 404);
    // }
    // this.cars[index][propertyName] = propertyValue;
    // // return resolve(this.cars); // will return every value from db whether changed or not changed.

    // // for only changed property data to be shown in output 
    // return resolve(this.cars[index]);
    // });

    //new code of line after connecting with mongodb
    const car = await this.carModel
      .findOneAndUpdate(
        { id },
        {
          [propertyName]: propertyValue,
        },
      )
      .exec();
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }
}


// to create new service - nest g service car --> g is for 'generate'
// car.service.ts & car.service.spec.ts unit test file created in car folder