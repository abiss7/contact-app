import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  formGroup: FormGroup;
  showForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      name: [ '', [ Validators.required, Validators.maxLength(20) ] ],
      lastname: [ '', [ Validators.required, Validators.maxLength(20) ] ],
      address: [ '', [ Validators.maxLength(50) ] ],
      locality: [ '', [ Validators.maxLength(50) ] ],
      phone: [ '', [ Validators.maxLength(20), Validators.pattern('[0-9]*') ] ],
      email: [ '', [ Validators.maxLength(50), Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$') ] ],
      age: [ '',[ Validators.maxLength(3), Validators.pattern('[0-9]*') ] ],
      dateVisit: [ '' ],
      comment1: [ '', [ Validators.maxLength(500) ] ],
      comment2: [ '', [ Validators.maxLength(500) ] ],
      visitMe: [ false ],
      goOtherChurh: [ false ],
      niceMeet: [ false ],
      wantToKnowMore: [ false ],
      wantToKnowMoreCristiano: [ false ]
    });
  }

  habilitarForm() {

    this.showForm = !this.showForm;
  }

  async guardarForm( event: any ) {

    event.preventDefault();
    if ( this.formGroup?.valid ) {

      const data = {

        "name": this.formGroup.value.name,
        "lastname": this.formGroup.value.lastname,
        "address": this.formGroup.value.address,
        "locality": this.formGroup.value.locality,
        "phone": this.formGroup.value.phone,
        "email": this.formGroup.value.email,
        "age": this.formGroup.value.age,
        "dateVisit": this.formGroup.value.dateVisit ? moment(this.formGroup.value.dateVisit).toISOString() : new Date().toISOString(),
        "comment1": this.formGroup.value.comment1,
        "comment2": this.formGroup.value.comment2,
        "options": {
            "visitMe": this.formGroup.value.visitMe,
            "goOtherChurh": this.formGroup.value.goOtherChurh,
            "niceMeet": this.formGroup.value.niceMeet,
            "wantToKnowMore": this.formGroup.value.wantToKnowMore,
            "wantToKnowMoreCristiano": this.formGroup.value.wantToKnowMoreCristiano
        }
      };

      try {
        
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor espere...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            }
        });
        
        const resp = await this.contactService.save(data);
        
        Swal.fire({
          title: 'Datos guardados con éxito!',
          text: 'Muchas gracias!!!',
          allowOutsideClick: false,
          showConfirmButton: false,
          icon: 'success'
        });

      } catch (err) {

        Swal.fire('Problemas', err.error, 'error');
        this.formGroup?.reset();
      }
    }
  }

}
