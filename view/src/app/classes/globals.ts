import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  endpointUrl: string = 'http://localhost:3000/api';
  maxTaskTries: number = 3;
  passwordToPendingTask: string = "TrabalheNaSaipos";
}