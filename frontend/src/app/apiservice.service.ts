import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  getapiUrl = 'http://localhost:3000/users';
  postapiUrl = 'http://localhost:3000/user';

  constructor(private http:HttpClient) { }

  // Get all data
  getAllData():Observable<any> {
    return this.http.get(this.getapiUrl);
  }

  // Create data
  createData(data:any){
    //console.log(data, 'Data created')
    return this.http.post(this.postapiUrl, data)
  }

  // Delete data
  deleteData(id:any): Observable<any> {
    const url = `${this.postapiUrl}/${id}`;
    return this.http.delete(url)
  }

  // Get single data
  getSingleData(id:any):Observable<any> {
    const url = `${this.postapiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Update data
  updateData(id:any, data:any) {
    const url = `${this.postapiUrl}/${id}`;
    return this.http.put(url, data)
  }


}
