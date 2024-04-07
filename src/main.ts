import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/Main/MainData/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
