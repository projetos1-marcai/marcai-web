import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploaderComponent } from './file-uploader.component';

describe('FileUploaderComponent', () => {
    let component: FileUploaderComponent;
    let fixture: ComponentFixture<FileUploaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FileUploaderComponent],
            imports: [MatIconModule, FormsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FileUploaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
