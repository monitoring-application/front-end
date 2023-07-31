import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpRequestService } from './http-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { requestRoutes } from '../util/request_routes';
import { SignUpFormGroup } from '../shared/model/formgroup/sign-up-form-group';
import { ISignUpModel } from '../shared/model/interface/i-sign-up-model';

var routes = new requestRoutes();
@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private baseUrl = '/v1/sign-up';
  _isExist = true;
  form = this.fb.group({
    id: '',
    member_code: '',
    full_name: ['', Validators.required],
    email: ['', Validators.required],
    password: '',
    mobile_number: '',
    upline: '',
    ttlDownline: 0,
    status: 1,
  }) as SignUpFormGroup;
  resetform = this.fb.group({
    id: '',
    member_code: '',
    full_name: ['', Validators.required],
    email: ['', Validators.required],
    password: '',
    mobile_number: '',
    upline: '',
    ttlDownline: 0,
    status: 1,
  }) as SignUpFormGroup;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  create(): Observable<any> {
    const payload = this.form.value;
    var url: string = routes.baseBackendUrl + routes.signUp;
    let header = new HttpHeaders();
    header = header.set('api-key', routes.apiKey);

    const data =  this.httpClient.post(url, payload, {
      headers: header,
    });

    return data;
  }

  fetchData(value: string, pageNumber: number, pageSize: number) {
    var url: string =
      routes.baseBackendUrl +
      routes.signUp +
      `/pagination?search_value=${value}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

    let header = new HttpHeaders();
    header = header.set('api-key', routes.apiKey);

    const data = this.httpClient.get(url, {
      headers: header,
    });
    return data;
  }

  approve(id: string, status: number) {
    var param: string = '/approve/' + id + '/' + status;
    var url: string = routes.baseBackendUrl + routes.signUp + param;

    let header = new HttpHeaders();
    header = header.set('api-key', routes.apiKey);

    const data = this.httpClient.patch(
      url,
      {},
      {
        headers: header,
      }
    );
    return data;
  }
  remove(id: string) {
    var url: string = routes.baseBackendUrl + routes.signUp + '/' + id;
    let header = new HttpHeaders();
    header = header.set('api-key', routes.apiKey);

    const data = this.httpClient.delete(url, {
      headers: header,
    });
    return data;
  }

  findByEmail(email: string) {
    var url: string =
      routes.baseBackendUrl + routes.signUp + '/findByEmail/' + email;

    let header = new HttpHeaders();
    header = header.set('api-key', routes.apiKey);

    this.httpClient
      .get(url, {
        headers: header,
      })
      .subscribe({
        next: async (resp: any) => {
          const { data } = resp;
          this._isExist = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
