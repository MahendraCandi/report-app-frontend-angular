import { ProfilingActivityService } from './../profiling-activity.service';
import { ProfilingActivityModel } from './../profiling-activity-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

declare var require: any;

@Component({
  selector: 'app-profiling-activity',
  templateUrl: './profiling-activity.component.html',
  styleUrls: ['./profiling-activity.component.css']
})
export class ProfilingActivityComponent implements OnInit {

  fileName: string = 'File';
  profilingActivity: ProfilingActivityModel;
  fileBlob: File;
  resBlob: Blob;
  loading: boolean = false;
  isFormValid: boolean = true;
  formMessage: string;
  isSuccessGenerateReport: boolean = false;

  @ViewChild('profilingActivityForm') fallbackReportForm: NgForm;

  constructor(
    private profilingService: ProfilingActivityService
  ) {
    this.profilingActivity = new ProfilingActivityModel(null, "", "", "", "", null, "");
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
    this.profilingActivity.fileName = this.fileName;
    this.profilingActivity.myFile = this.fileBlob;
    let outputName = this.profilingActivity.outputFileName + ".xlsx";
    this.profilingService.generateProfilingActivity(this.profilingActivity)
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
