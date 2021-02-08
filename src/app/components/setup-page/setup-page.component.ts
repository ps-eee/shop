import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'shop-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent {

  public experimentFormGroup: FormGroup = this.formBuilder.group({
    id: [1, [Validators.required]],
    name: ['Conversion Experiment', [Validators.required]]
  });

  public choicesFormGroup: FormGroup = this.formBuilder.group({
    ctaColors: ['accent | primary | warn', [Validators.required]],
    fomoTexts: ['Almost Gone! | Only 3 left, more on the way.', [Validators.required]],
    thumbnailImages: ['left | bottom | right', [Validators.required]]
  });

  public metricsFormGroup: FormGroup = this.formBuilder.group({
    addToCartRate: [false, [Validators.required]],
    averageOrderValue: [false, [Validators.required]],
    cartAbandonmentRate: [false, [Validators.required]],
    conversionRate: [false, [Validators.required]],
    customerLifetimeValue: [false, [Validators.required]],
    leads: [false, [Validators.required]],
    productAffinityRate: [false, [Validators.required]],
    purchases: [true, [Validators.required]],
    revenuePerVisit: [false, [Validators.required]],
    signUps: [false, [Validators.required]]
  });

  public usersFormGroup: FormGroup = this.formBuilder.group({
    groupBy: ['', [Validators.required]]
  });

  public constructor(
    private formBuilder: FormBuilder
  ) { }

  public publishExperiment() {

    alert('Experiment is now live.');

  }

}
