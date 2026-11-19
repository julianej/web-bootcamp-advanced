var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let ThreadsService = class ThreadsService {
    // Class property
    threads = [
        {
            id: "4f5362f7-ee63-495a-8903-8240d95f6625",
            title: "Tabs or spaces, final answer?",
            author: "pixelpirate",
            body: "My team argues about this in every code review. What does your formatter do?",
            createdAt: new Date("2026-11-12T08:15:00Z"),
        },
        {
            id: "733f77d2-f899-4580-8d60-8bac152930c7",
            title: "Why does my useEffect run twice?",
            author: "neonbyte",
            body: "In development, every effect in my React app runs twice. In production, it runs once.",
            createdAt: new Date("2026-11-13T19:42:00Z"),
        },
        {
            id: "43f04043-20cf-4e7a-a430-4cbdf13a5f36",
            title: "Best keyboard for long coding sessions",
            author: "nullpointer",
            body: "My wrists hurt after a full day. Split keyboard, low profile, or something else?",
            createdAt: new Date("2026-11-14T10:05:00Z"),
        },
        {
            id: "ec5074f4-aacf-4f5b-b96b-beb7763d6073",
            title: "Is SQLite enough for a side project?",
            author: "neonbyte",
            body: "I expect maybe a hundred users. Do I really need a database server?",
            createdAt: new Date("2026-11-16T21:30:00Z"),
        },
        {
            id: "1ee0c21f-27cd-4eb3-9bb6-ab1975a77f56",
            title: "Show your terminal setup",
            author: "pixelpirate",
            body: "Prompt, font, color scheme: post a screenshot and tell us what you can't live without.",
            createdAt: new Date("2026-11-17T07:55:00Z"),
        },
    ];
    // Method 1
    //  findAll(): Thread[] {
    //     return this.threads;
    //   }
    findAll(author) {
        if (author === undefined) {
            return this.threads;
        }
        return this.threads.filter((thread) => thread.author === author);
    }
    // Method 2
    findAllAuthors() {
        // Count the threads per author in a Map<string, number>: 
        const authorCounts = new Map();
        // for each thread, read the current count of its author (or 0) and store it increased by one.
        for (const thread of this.threads) {
            const count = authorCounts.get(thread.author) ?? 0;
            authorCounts.set(thread.author, count + 1);
        }
        // Turn the map into an array of objects { author, threads }.
        return Array.from(authorCounts, ([author, threads]) => ({
            author,
            threads,
        })).sort((a, b) => {
            return b.threads - a.threads || a.author.localeCompare(b.author);
        });
    }
};
ThreadsService = __decorate([
    Injectable()
    // TypeScript creates the threadsService property
], ThreadsService);
export { ThreadsService };
//# sourceMappingURL=thread.service.js.map