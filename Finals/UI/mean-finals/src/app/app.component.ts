import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'motorcyclesapp';
  readonly APIUrl = "http://localhost:5038/api/motorcycles/";
  yearMax = new Date().getFullYear();

  constructor(private http: HttpClient) {}

  motorcycles: any[] = [];

  // FORM MODEL (Motorcycle themed)
  motorcycleForm: any = {
    id: 0,
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    type: '', // dropdown: Cruiser, Sport, Touring, Adventure, Scooter
    engineCapacity: '', // dropdown: 150cc, 250cc, 400cc, 600cc, 1000cc
    color: '', // dropdown: Black, Red, Blue, Silver, Custom
    hasABS: false, // checkbox
    hasQuickShifter: false, // checkbox
    features: [] // multi-select: LED Lights, Bluetooth, Heated Grips, Luggage Rack
  };

  isEditing: boolean = false;

  ngOnInit() {
    this.refreshMotorcycles();
  }

  refreshMotorcycles() {
    this.http.get<any[]>(this.APIUrl + 'GetMotorcycles')
      .subscribe(data => {
        this.motorcycles = data;
      });
  }

  addMotorcycle() {
    const formData = new FormData();
    formData.append('brand', this.motorcycleForm.brand || '');
    formData.append('model', this.motorcycleForm.model || '');
    formData.append('year', String(this.motorcycleForm.year || new Date().getFullYear()));
    formData.append('type', this.motorcycleForm.type || '');
    formData.append('engineCapacity', this.motorcycleForm.engineCapacity || '');
    formData.append('color', this.motorcycleForm.color || '');
    formData.append('hasABS', this.motorcycleForm.hasABS ? 'true' : 'false');
    formData.append('hasQuickShifter', this.motorcycleForm.hasQuickShifter ? 'true' : 'false');
    formData.append('features', JSON.stringify(this.motorcycleForm.features || []));

    console.log("Sending motorcycle formData:", Array.from(formData.entries()));

    this.http.post(this.APIUrl + 'AddMotorcycle', formData).subscribe(() => {
      alert('Motorcycle added successfully');
      this.clearForm();
      this.refreshMotorcycles();
    });
  }

  editMotorcycle(motorcycle: any) {
    this.isEditing = true;
    this.motorcycleForm = { ...motorcycle };
  }

  updateMotorcycle() {
    const formData = new FormData();
    formData.append('id', String(this.motorcycleForm.id));
    formData.append('brand', this.motorcycleForm.brand || '');
    formData.append('model', this.motorcycleForm.model || '');
    formData.append('year', String(this.motorcycleForm.year || new Date().getFullYear()));
    formData.append('type', this.motorcycleForm.type || '');
    formData.append('engineCapacity', this.motorcycleForm.engineCapacity || '');
    formData.append('color', this.motorcycleForm.color || '');
    formData.append('hasABS', this.motorcycleForm.hasABS ? 'true' : 'false');
    formData.append('hasQuickShifter', this.motorcycleForm.hasQuickShifter ? 'true' : 'false');
    formData.append('features', JSON.stringify(this.motorcycleForm.features || []));

    this.http.put(this.APIUrl + 'UpdateMotorcycle', formData)
      .subscribe(res => {
        alert("Motorcycle updated successfully");
        this.clearForm();
        this.refreshMotorcycles();
      });
  }

  deleteMotorcycle(id: any) {
    this.http.delete(this.APIUrl + 'DeleteMotorcycle?id=' + id)
      .subscribe(res => {
        alert("Motorcycle deleted");
        this.refreshMotorcycles();
      });
  }

  clearForm() {
    this.motorcycleForm = {
      id: 0,
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      type: '',
      engineCapacity: '',
      color: '',
      hasABS: false,
      hasQuickShifter: false,
      features: []
    };
    this.isEditing = false;
  }
}