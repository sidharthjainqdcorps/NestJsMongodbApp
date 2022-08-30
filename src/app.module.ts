//module.ts contain the implememtation of app.


import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({ //=> Decorators == Module Decorator
  imports: [
    MongooseModule.forRoot('mongodb://localhost/car_manager'),  // takes mongodb url - forRoot() method --direct url used or else docker method to be used. car_manager = db name
    CarModule,
    // new mapping added implicitly automatically after creation of car folder and files by CLI
  // controllers: [AppController],
  // providers: [AppService], //services -- app.service.ts
  ],
})
export class AppModule {}

// creating new module command => nest g module module-name --or m for module
// g => generate 
// it will take a while car folder with file name- car.module.ts created. So wait a bit.
// for servie - nest g service service-name
// for controller - nest g controller controller-name