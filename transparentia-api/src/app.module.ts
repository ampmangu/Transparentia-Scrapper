import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TransparentiaService } from './transparentia.service';

@Module({
  imports: [HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 5000,
      maxRedirects: 5,
      headers: {"x-api-key": "2KNiUvxdVG1xbbeCRdK4laQhJQeSx5B72d4CRqpH",
      "x-xsrf-token": "eyJpdiI6IjdmdHdFZmQ4ZGZpWVV2U0xoQU9SN0E9PSIsInZhbHVlIjoibGYweU0yT0pPWldQL1E1WWovNm82ditEV2REVlpneitseFlLUnI2S1htdHNycnZkdW5PWmwwcXh3TlNvYmRMSVliRDZXYW5ydDlrMm54REtGRCtBbkk1TFBkcW9TcjRmeE1JeVNjcUJscEZjSDRxSGdaOHEycEdLdzZsZFVwY04iLCJtYWMiOiI1NmZjNzRiM2M2YTE4ZjE2MmVhOTJmMDkyZTg3ZGEyZmRhMjZjZmFjM2YwZGY3ZDBkYjk0YzBiODUxMzRjMTg2In0="}
      
    }),
  })],
  controllers: [AppController],
  providers: [TransparentiaService],
})
export class AppModule {}
