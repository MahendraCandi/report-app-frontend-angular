import { TokenStorageServiceService } from './token-storage-service.service';
import { FallbackModel } from './fallback-model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FallbackServiceService {

  private url: string = environment.apiHost + environment.apiGenerateFallback;
  private fileBlob: Blob;

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageServiceService
  ) { }

  public generateFallbackReport(model: FallbackModel): Observable<any> {

    let myFile: File = model.myFile;
    let fileType = myFile.type;

    this.fileBlob = new Blob([myFile], {type: fileType});

    let formData: FormData = new FormData();
    formData.append('file', this.fileBlob, model.fileName);
    formData.append('outputFileName', model.outputFileName + ".xlsx");
    formData.append('titleName', model.titleName);
    formData.append('sheetName', model.sheetName);

    formData.forEach((v, k) => console.log(`${k + " " + v}`));

    return this.tokenService.generateToken().pipe(
      switchMap(data => {
        return this.http.post(this.url, formData, {headers: new HttpHeaders({"Authorization": "Bearer " + data.token}), responseType: 'blob'}).pipe(
          tap((formData) => console.log(formData)) 
        );
      })
    );
  }
}
