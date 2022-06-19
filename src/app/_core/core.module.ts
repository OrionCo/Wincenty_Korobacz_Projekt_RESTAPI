import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CORE_COMPONENTS } from './components';
import { CORE_GUARDS } from './guards';
import { CORE_INTERCEPTORS } from './interceptors';
import { CORE_SERVICES } from './services';

@NgModule({
  providers: [
    ...CORE_INTERCEPTORS,
    ...CORE_SERVICES,
    ...CORE_GUARDS,
    FormBuilder,
  ],
  imports: [HttpClientModule],
  declarations: [...CORE_COMPONENTS],
  exports: [...CORE_COMPONENTS],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    core: CoreModule
  ) {
    if (core) {
      throw new Error('CoreModule should only be imported in AppModule');
    }
  }
}
