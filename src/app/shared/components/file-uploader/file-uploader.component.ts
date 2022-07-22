import { FormControl } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';

type IFileError = 'invalidFile' | 'invalidSize';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {
  error!: IFileError | null;
  @Input() accept!: string;
  @Input() label!: string;
  @Input() title!: string;
  // The object must contain the following props: uploaded: boolean, file: any, base64: any
  @Input() file!: FormControl | any;
  @Output() onSelect = new EventEmitter();

  onUpload($event: any): void {
    const file = $event.target.files[0];

    if (!this.accept.includes(file.type)) {
      this.error = 'invalidFile';
    } else if (file.size / (1024 * 1024) > 3) {
      this.error = 'invalidSize';
    } else {
      this.error = null;
      this.onSelect.emit(file);
    }
  }
}
