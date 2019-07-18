import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CategoryModel } from 'src/app/models/CategoryModel';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {
  @Input() category: CategoryModel
  @Input() icon: string
  @Input() color:string
  @Output() clicked: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit() { }

  action() {
    console.log('clicked', this.category)
    this.clicked.emit(this.category.key)
  }

}
