import { Component, OnInit, Input } from '@angular/core';
import { Cast } from '../structure.type';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BioModalComponent } from '../bio-modal/bio-modal.component';

@Component({
  selector: 'app-hscrollcast',
  templateUrl: './hscrollcast.component.html',
  styleUrls: ['./hscrollcast.component.css'],
})
export class HscrollcastComponent implements OnInit {
  @Input() casts: Cast[] = [];

  ngOnInit(): void {}

  constructor(private modalService: NgbModal) {}

  open(id: number) {
    const modalRef = this.modalService.open(BioModalComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.id = id;
  }
}
