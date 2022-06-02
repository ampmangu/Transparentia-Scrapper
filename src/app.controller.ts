import { Query } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { TransparentiaService } from './transparentia.service';

@Controller()
export class AppController {
  constructor(private readonly transparentiaService: TransparentiaService) {}

  @Get('people')
  getPerson(@Query('person') person: string): any {
    return this.transparentiaService
      .getPeople(person)
      .then((value: any) => {
        if (value.pages > 0) {
          return value.results[0];
        }
        throw new Error("Can't find any results");
      })
      .then((rtn: any) => {
        const splitted = person.split(',');
        if (splitted.length !== 2) {
          throw new Error("Can't find this person");
        }
        const apiName = splitted[1] + splitted[0];
        if (apiName.replace(/\s/g, '') !== rtn.name.replace(/\s/g, '')) {
          throw new Error("Can't find this person");
        }
        return rtn;
      })
      .catch((err: Error) => {
        return { errorMessage: err.message };
      });
  }
}
