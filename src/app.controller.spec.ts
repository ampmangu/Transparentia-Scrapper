import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { MyLogger } from './MyLogger';
import { TransparentiaService } from './transparentia.service';
const mockData = { results: [{
  '@type': null,
  name: 'Guillermo Antonio Meijón Couselo',
  identifier: '228ca73b54e562ac570003c27f746cd0',
  slug: 'guillermo-antonio-meijon-couselo',
  status: true,
  currentAnnualSalary: 86024.96,
  currentMonthlySalary: 6144.64,
  image: 'politicians/guillermo-antonio-meijon-couselo.jpg',
  sameAs: 'https://es.wikipedia.org/wiki/Guillermo_Meij%C3%B3n',
  spatial: {
    '@type': null,
    name: 'Nacional',
    identifier: '254c3ac587477dd84a87bf61f027a95d',
    slug: 'nacional',
  },
  role: {
    '@type': null,
    name: 'Diputado',
    identifier: 'c1349de1945ed4a86d1a2f6b2b780f12',
    slug: 'diputado',
  },
  jobTitle: 'Diputado',
  gender: 'Hombre',
  affiliation: {
    '@type': null,
    name: 'PSOE',
    identifier: 'd481c88f1177767c8c20700b35a7574e',
    slug: 'psoe',
    logo: 'parties/psoe-615aa684d22be0f93dcff6f9e3c671ae.png',
  },
  workLocation: {
    '@type': null,
    name: 'Ámbito Nacional',
    identifier: '254c3ac587477dd84a87bf61f027a95d',
  },
  currentMemberOf: {
    '@type': null,
    name: 'Congreso De Los Diputados',
    identifier: '9a82b281d4a887da9ebbe895970a76ad',
    slug: 'congreso-de-los-diputados',
  }}], pages: 1,
};
describe('AppController', () => {
  let appController: AppController;
  let transparentiaService: TransparentiaService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [TransparentiaService],
    }).compile();
    transparentiaService = app.get<TransparentiaService>(TransparentiaService);
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return data from person', async () => {
      const rtn: any = mockData;
      jest
        .spyOn(transparentiaService, 'getPeople')
        .mockImplementation(() => new Promise((resolve) => { resolve(rtn) }));
      expect(appController.getPerson('Meijón Couselo, Guillermo Antonio'))
        .resolves.toStrictEqual(
          rtn.results[0]
        );
    });
    it('should fail returning data', async () => {
      const rtn: any = {"pages": 0};
      jest.spyOn(transparentiaService, 'getPeople')
      .mockImplementation(() => new Promise((resolve) => {resolve(rtn)}));
      expect(appController.getPerson('Meijón Couselo, Guillermo Antonio'))
      .resolves.toBe(
        {"errorMessage": "Can't find any results"}
      );
    })
  });
  
});
