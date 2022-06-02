import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { first, lastValueFrom, Observable, take, tap } from 'rxjs';

@Injectable()
export class TransparentiaService {
  constructor(private httpService: HttpService){}
  private baseUrl: string = "https://transparentia.newtral.es/api/advanced-search?name=RNAME&page=1&salaryRange[]=0&salaryRange[]=-1&salaryType=annualSalary&inactive=true";
  private re: RegExp = /RNAME/gi;
  private data: any = {};
  async getPeople(text: string): Promise<any> {
    var parameter = encodeURIComponent(text.trim());
    var searchUrl = this.baseUrl.replace(this.re, parameter);
    return lastValueFrom(await this.httpService.get(searchUrl)).then(res => res.data.data);
  }

}
