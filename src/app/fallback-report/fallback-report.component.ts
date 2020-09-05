import { TokenStorageServiceService } from './../token-storage-service.service';
import { FallbackServiceService } from './../fallback-service.service';
import { FallbackModel } from './../fallback-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { tokenKey } from '@angular/core/src/view';

declare var require: any;

@Component({
  selector: 'app-fallback-report',
  templateUrl: './fallback-report.component.html',
  styleUrls: ['./fallback-report.component.css']
})
export class FallbackReportComponent implements OnInit {

  fileName: string = 'File';
  fallbackReport: FallbackModel;
  fileBlob: File;
  resBlob: Blob;
  loading: boolean = false;
  isFormValid: boolean = true;
  formMessage: string;
  isSuccessGenerateReport: boolean = false;

  @ViewChild('fallbackReportForm') fallbackReportForm: NgForm;

  constructor(
    private fallbackService: FallbackServiceService
  ) {
    this.fallbackReport = new FallbackModel(null, "", "", "", "", null, "");
  }

  ngOnInit() {
  }

  handleFile(files: FileList) {
    if (files.length > 0) {
      this.fileName = files.item(0).name;
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileBlob = e.target.result;
      }
      reader.readAsArrayBuffer(files.item(0));

      this.fileName = files.item(0).name;
    }
  }

  onSubmit() {
    this.isSuccessGenerateReport = false;
    if (this.fallbackReportForm.invalid) {
      this.isFormValid = false;
      this.formMessage = "Form not valid!";
      return;
    } else {
      this.isFormValid = true;
    }

    this.loading = true;
    this.fallbackReport.fileName = this.fileName;
    this.fallbackReport.myFile = this.fileBlob;
    let outputName = this.fallbackReport.outputFileName + ".xlsx";
    this.fallbackService.generateFallbackReport(this.fallbackReport)
      .subscribe((res) => {
        this.isFormValid = true;
        this.loading = false;
        this.isSuccessGenerateReport = true;
        this.resBlob = new Blob([res], { type: 'text/plain' });

        let FileSaver = require('file-saver');
        FileSaver.saveAs(this.resBlob, outputName);
        
      }, (err) => {
        this.isFormValid = false;
        this.loading = false;
        this.formMessage = err.message;
        console.log(err);
        
      });
  }
}
