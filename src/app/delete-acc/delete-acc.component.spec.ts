import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccComponent } from './delete-acc.component';

describe('DeleteAccComponent', () => {
  let component: DeleteAccComponent;
  let fixture: ComponentFixture<DeleteAccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAccComponent]
    });
    fixture = TestBed.createComponent(DeleteAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
