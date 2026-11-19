var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get } from '@nestjs/common';
import { ThreadsService } from './thread.service.js';
let ThreadsController = class ThreadsController {
    threadsService;
    constructor(threadsService) {
        this.threadsService = threadsService;
    }
    findAll() {
        return this.threadsService.findAll();
    }
    findAllAuthors() {
        return this.threadsService.findAllAuthors();
    }
};
__decorate([
    Get('threads'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ThreadsController.prototype, "findAll", null);
__decorate([
    Get('threads/authors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ThreadsController.prototype, "findAllAuthors", null);
ThreadsController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [ThreadsService])
], ThreadsController);
export { ThreadsController };
//# sourceMappingURL=thread.controller.js.map