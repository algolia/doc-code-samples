import {Component, Inject, forwardRef, Input} from '@angular/core';
import {BaseWidget, NgAisInstantSearch} from 'angular-instantsearch';
import {connectAutocomplete} from 'instantsearch.js/es/connectors';

@Component({
    selector: 'app-autocomplete',
    template: `
        <div>
            <input matInput [matAutocomplete]="auto" (keyup)="handleChange($event)" style="width: 100%; padding: 10px"/>
            <mat-autocomplete #auto="matAutocomplete" style="margin-top: 30px; max-height: 600px">
                <mat-optgroup *ngFor="let index of (state.indices || [])" [label]="index.index">
                    <mat-option *ngFor="let options of index.hits" [value]="options.name">
                        <div>
                            {{options.name}}
                        </div>
                    </mat-option>
                </mat-optgroup>
            </mat-autocomplete>
        </div>
    `
})
export class AutocompleteComponent extends BaseWidget {
    state: {
        query: string;
        refine: Function;
        indices: object[];
    };

    constructor(
        @Inject(forwardRef(() => NgAisInstantSearch))
        public instantSearchParent,
    ) {
        super('AutocompleteComponent');
    }

    public handleChange($event: KeyboardEvent) {
        this.state.refine(($event.target as HTMLInputElement).value);
    }

    public ngOnInit() {
        this.createWidget(connectAutocomplete, {
            indices: [{
                value: "actors"
            }]
        });
        super.ngOnInit();
    }
}
