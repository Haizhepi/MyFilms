import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from '../Services/DetailServices/person.service';
import { Person } from '../structure.type';

@Component({
  selector: 'app-bio-modal',
  templateUrl: './bio-modal.component.html',
  styleUrls: ['./bio-modal.component.css'],
})
export class BioModalComponent implements OnInit {
  @Input() id: number;
  person: Person;
  constructor(
    public activeModal: NgbActiveModal,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.personService.personInfo(this.id).subscribe((res) => {
      this.person = res;
    });
  }
}
