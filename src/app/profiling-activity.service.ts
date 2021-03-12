import { Observable } from 'rxjs';
import { ProfilingActivityModel } from './profiling-activity-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { TokenStorageServiceService } from './token-storage-service.service';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfilingActivityService {

  private url: string = environment.apiHost + environment.apiGenerateProfilingActivity;
  private fileBlob: Blob;

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageServiceService
  ) { }

  public generateProfilingActivity(model: ProfilingActivityModel): Observable<any> {

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
