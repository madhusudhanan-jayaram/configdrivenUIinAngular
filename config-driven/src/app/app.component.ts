import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

type FieldType = 'text' | 'select' | 'checkbox';
interface Option { label: string; value: string | boolean; }
interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  styles?: Record<string, string>;
  labelStyles?: Record<string, string>;
  options?: Option[];
}
interface FormSchema {
  title: string;
  buttonText?: string;
  buttonStyles?: Record<string, string>;
  fields: FieldConfig[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="wrap">
    <h2 *ngIf="schema">{{ schema.title }}</h2>
    <p *ngIf="loading">Loading…</p>
    <p *ngIf="error" class="error">{{ error }}</p>

    <form *ngIf="schema" (ngSubmit)="submit()" #f="ngForm" novalidate>
      <div *ngFor="let field of schema.fields" class="row">
        <!-- Text -->
        <ng-container *ngIf="field.type === 'text'">
          <label [ngStyle]="field.labelStyles">{{ field.label }} <span *ngIf="field.required" class="req">*</span></label>
          <input class="ctrl"
            [name]="field.key"
            [placeholder]="field.placeholder || ''"

            [(ngModel)]="model[field.key]"
            [ngStyle]="field.styles"/>
        </ng-container>

        <!-- Select -->
        <ng-container *ngIf="field.type === 'select'">
          <label [ngStyle]="field.labelStyles">{{ field.label }} <span *ngIf="field.required" class="req">*</span></label>
          <select class="ctrl"
            [name]="field.key"
            [(ngModel)]="model[field.key]"
            [ngStyle]="field.styles">
            <option value="">-- Select --</option>
            <option *ngFor="let opt of field.options" [ngValue]="opt.value">{{ opt.label }}</option>
          </select>
        </ng-container>

        <!-- Checkbox -->
        <ng-container *ngIf="field.type === 'checkbox'">
          <label class="check">
            <input type="checkbox"
              [name]="field.key"
              [(ngModel)]="model[field.key]"
              [ngStyle]="field.styles"/>
            {{ field.label }}
          </label>
        </ng-container>
      </div>

      <button type="submit" [ngStyle]="schema.buttonStyles">{{ schema.buttonText || 'Submit' }}</button>
    </form>

    <pre *ngIf="result" class="result">{{ result | json }}</pre>
  </div>
  `,
  styles: [`
    .wrap { max-width: 560px; margin: 24px auto; padding: 12px; font-family: system-ui, Arial; }
    form { display: grid; gap: 12px; }
    .row { display: grid; gap: 6px; }
    .ctrl { padding: 6px; border: 1px solid #d1d5db; border-radius: 6px; box-sizing: border-box; }
    .check { display: flex; gap: 8px; align-items: center; }
    .req { color: #ef4444; }
    .error { color: #dc2626; }
    .result { background: #f3f4f6; padding: 10px; border-radius: 6px; margin-top: 12px; }
  `]
})
export class AppComponent implements OnInit {
  private readonly API = 'http://localhost:3002'; // Mockoon base

  schema?: FormSchema;
  loading = true;
  error?: string;
  model: Record<string, any> = {};
  result: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<FormSchema>(`${this.API}/form-config`).subscribe({
      next: (s) => {
        this.schema = s;
        // initialize model
        s.fields.forEach(f => this.model[f.key] = f.type === 'checkbox' ? false : '');
        this.loading = false;
      },
      error: () => { this.error = 'Failed to load config'; this.loading = false; }
    });
  }

  submit(): void {
    this.result = undefined; this.error = undefined;
    this.http.post(`${this.API}/submit`, this.model).subscribe({
      next: (r) => this.result = r,
      error: () => this.error = 'Submit failed'
    });
  }
}
