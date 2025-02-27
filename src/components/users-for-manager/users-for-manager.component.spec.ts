import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersForManagerComponent } from './users-for-manager.component';

describe('UsersForManagerComponent', () => {
  let component: UsersForManagerComponent;
  let fixture: ComponentFixture<UsersForManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersForManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersForManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
