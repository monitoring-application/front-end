import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  switchMap,
  tap,
} from 'rxjs';
import { SignUpService } from 'src/app/services/sign-up.service';
import { ISignUpModel } from 'src/app/shared/model/interface/i-sign-up-model';
import { requestRoutes } from 'src/app/util/request_routes';
const columns = [
  'membersCode',
  'fullName',
  'email',
  'contactNo',
  'referalCode',
  'status',
  'downline',
];

var routes = new requestRoutes();

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css'],
})
export class MembersListComponent implements OnInit {
  search = '';
  result_length = 0;
  pageNumber = 1;
  pageSize = 10;
  isLoading = false;
  searchControl = new FormControl();

  displayedColumns: string[] = columns;
  dataSource = new MatTableDataSource<ISignUpModel>();

  selectedItem!: ISignUpModel;

  constructor(
    private signUpService: SignUpService,
    private httpClient: HttpClient
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchData();

    this.searchControl.valueChanges
      .pipe(
        filter((res) => {
          return res !== null;
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap((value) => {
          this.search = value;

          var url: string = routes.baseBackendUrl + routes.signUp;
          let header = new HttpHeaders();
          header = header.set('api-key', routes.apiKey);

          return this.httpClient
            .get(url, {
              headers: header,
            })
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            );
        })
      )
      .subscribe({
        next: (res) => {
          const retVal: any = res;
          const { data } = retVal;
          this.dataSource = new MatTableDataSource(data);
        },
        error: (err) => {
          console.log({
            error: err,
          });
        },
        complete: () => {
          setTimeout(async () => {
            this.isLoading = false;
            console.log('completed');
          }, 1000);
        },
      });
  }

  fetchData() {
    this.isLoading = true;
    this.signUpService.fetchData()?.subscribe({
      next: (res) => {
        const retVal: any = res;
        const { data } = retVal;
        this.dataSource = data;
      },
      error: (err) => {
        console.log({
          error: err,
        });
      },
      complete: () => {
        setTimeout(async () => {
          this.isLoading = false;
        }, 1000);
      },
    });
  }
  rowSelected(item: ISignUpModel) {
    this.selectedItem = item;
  }
  create() {}
  remove() {}
  approve() {
    var status = this.selectedItem.status == 0 ? 1 : 0;
    this.signUpService.approve(this.selectedItem.id, status)?.subscribe({
      next: (res) => {},
      error: (err) => {
        console.log({
          error: err,
        });
      },
      complete: () => {
        setTimeout(async () => {}, 1000);
      },
    });
  }
  clear() {
    this.search = '';
    this.searchControl.reset();
    this.paginator.firstPage();
  }
  paginate(item: any) {
    this.pageNumber = item.pageIndex + 1;
    this.pageSize = item.pageSize;

    this.fetchData();
  }
}
