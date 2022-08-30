import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './dto/car.dto';
import { query } from 'express';

//DTO(Data Transfer Object) concept => Data sent over the network by this concept.


@Controller('car') //'car' = route
export class CarController {
  //1. inject car service into controller
  constructor(private carService: CarService) {} // injecting car service instance into controller constructor as per nestjs norms


  // method creation
  //decorator
  @Get() // if get method decorator paranthesis are empty then it will take it from @controller('car') - subroute for this
  public async getCars(): Promise<CarDto[]> {
    return this.carService.getCars();
  }

  @Post()
  public async postCar(@Body() car: CarDto): Promise<any> { // Body decorator-accesss the body of the post
    return this.carService.postCar(car); //DTO method to define objects and sent data over network.
  
  }

  @Get(':id')
  public async getCarById(@Param('id') id: number): Promise<CarDto> {// Param decorator
    //when async used -- await can be used like below 2 lines if we want(not mandatory)
    // const result = await return this.carService.getCarById(id);
    // return result;
    return this.carService.getCarById(id);
  }

  @Delete(':id')
  public async deleteCarById(@Param('id') id: number): Promise<CarDto> { // Param decorator
    return this.carService.deleteCarById(id);
  }

  @Put(':id')
  public async putCarById(@Param('id') id: number, @Query() query): Promise<CarDto> { // Param & Query decorator 
    const propertyName = query.property_name;
    const propertyValue = query.property_value;
    return this.carService.putCarById(id, propertyName, propertyValue);
  }
}


// Notes:-
// controller creation command - nest g controller car
// car.controller.ts file created witjh car.controller.spec.tsunit test file for car controller file) in car folder