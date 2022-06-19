import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CORE_INTERCEPTORS } from './interceptors';

@NgModule({
  providers: [...CORE_INTERCEPTORS],
  imports: [HttpClientModule],
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
