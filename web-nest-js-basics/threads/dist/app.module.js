var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ThreadsModule } from './threads/thread.module.js';
// You need to decide which controller owns that endpoint.
// Option A — Keep the authors endpoint inside ThreadsController
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [ThreadsModule],
    })
], AppModule);
export { AppModule };
// Option B — Separate the authors endpoint
// @Module({
//   imports: [],
//   controllers: [ThreadsController, AuthorController],
//   providers: [ThreadsService, AuthorService],
// })
// export class AppModule {}
//# sourceMappingURL=app.module.js.map