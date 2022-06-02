import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { first, lastValueFrom, Observable, take, tap } from 'rxjs';

@Injectable()
export class TransparentiaService {
  constructor(private httpService: HttpService) {}

  private baseUrl =
    'https://transparentia.newtral.es/api/advanced-search?name=RNAME&page=1&salaryRange[]=0&salaryRange[]=-1&salaryType=annualSalary&inactive=true';
  private re = /RNAME/gi;

  async getPeople(text: string): Promise<any> {
    const parameter = encodeURIComponent(text.trim());
    const searchUrl = this.baseUrl.replace(this.re, parameter);
    return lastValueFrom(await this.httpService.get(searchUrl)).then(
      (res) => res.data.data,
    );
  }
}
