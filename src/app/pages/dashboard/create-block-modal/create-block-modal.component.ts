import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-create-block-modal',
  templateUrl: './create-block-modal.component.html',
  styleUrls: ['./create-block-modal.component.scss'],
})
export class CreateBlockModalComponent implements OnInit {
  @Input() close;
  @Output() blockselected: EventEmitter<any> = new EventEmitter();
  createFormGroup: FormGroup;
  dataTypes = [
    {
      name: 'Продажи',
      guid: 'sales',
    },
  ];
  dataFormats = [
    {
      name: 'График',
      guid: 'chart',
    },
    {
      name: 'Таблица',
      guid: 'table',
    }
  ];

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createFormGroup = this.fb.group({
      type: ['', Validators.required],
      format: ['', Validators.required],
      range: ['', Validators.required],
    });
  }

  closeModal() {
    this.close();
  }

  createBlock() {
    const values = this.createFormGroup.value;
    this.blockselected.emit(values);
    this.closeModal();
  }

  findName(controlName: string, value: string) {
    if (!value) {
      return;
    }
    let option;
    switch (controlName) {
      case 'type':
        option = this.dataTypes.find(type => type.guid === value);
        break;
      case 'format':
        option = this.dataFormats.find(type => type.guid === value);
        break;
    }
    return option.name;
  }
}
