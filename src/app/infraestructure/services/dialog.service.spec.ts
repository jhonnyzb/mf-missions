import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { MatDialog } from "@angular/material/dialog";
describe('DialogService', () => {
  let dialogService: DialogService;
    
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[MatDialog],
        providers:[
            DialogService,
          
    ]
    });
    dialogService = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(dialogService).toBeTruthy();
  });
  it('should call to openConfirmDialog from dialogService', () => {
    const openConfirmDialogSpy = jasmine.createSpyObj('DialogService',['openConfirmDialog']);
    openConfirmDialogSpy.openConfirmDialog.and.returnValue('Fake Value');
    expect(openConfirmDialogSpy.openConfirmDialog).toHaveBeenCalled();
    expect(openConfirmDialogSpy.openConfirmDialog).toHaveBeenCalledTimes(1);
  });
});
