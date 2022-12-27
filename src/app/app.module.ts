import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavcompComponent } from './navcomp/navcomp.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatOption, MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { LoginGuard } from './guards/login.guard';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavcompComponent,
    DashboardComponent,
    TaskDialogComponent,
    AddTaskComponent,
    InfoDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDividerModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    DragDropModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatIconModule,

  ],
  providers: [DashboardComponent, NavcompComponent,LoginGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
