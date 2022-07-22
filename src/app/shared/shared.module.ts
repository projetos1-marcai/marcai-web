import { MatIconModule } from '@angular/material/icon';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [SpinnerComponent, FileUploaderComponent],
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule],
  exports: [SpinnerComponent, FileUploaderComponent]
})
export class SharedModule {}
