import { Component,Type, OnInit, Input, ViewChild, Output, EventEmitter  } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css'],
})

export class ModalMessageComponent implements OnInit {
  @Input() message
  
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {

  }

}
