import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnsubscribeRxjsRoutingModule } from './unsubscribe-rxjs-routing.module';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';
import { PocBaseComponent } from './poc-base/poc-base.component';
import { PocComponent } from './componentes/poc/poc.component';
import { PocUnsubComponent } from './componentes/poc-unsub/poc-unsub.component';
import { PocTakeComponent } from './componentes/poc-take/poc-take.component';
import { PocTakeUntilComponent } from './componentes/poc-take-until/poc-take-until.component';
import { PocAsyncComponent } from './componentes/poc-async/poc-async.component';


@NgModule({
  declarations: [
    UnsubscribePocComponent,
    PocBaseComponent,
    PocComponent,
    PocUnsubComponent,
    PocTakeComponent,
    PocTakeUntilComponent,
    PocAsyncComponent
  ],
  imports: [
    CommonModule,
    UnsubscribeRxjsRoutingModule
  ]
})
export class UnsubscribeRxjsModule { }
