import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { TransparentiaService } from './transparentia.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [TransparentiaService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getPerson("")).toBe('Hello World!');
    });
  });
});
