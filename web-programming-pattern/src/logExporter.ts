export {};

interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
}

// Repository: hides where the logs come from.
interface LogRepository {
  findAll(): Promise<LogEntry[]>;
}

class InMemoryLogRepository implements LogRepository {
  constructor(private readonly entries: LogEntry[]) {}

  async findAll(): Promise<LogEntry[]> {
    return this.entries;
  }
}

// Strategy: one class per format.
interface LogFormatter {
  format(logs: LogEntry[]): string;
}

class JsonFormatter implements LogFormatter {
  format(logs: LogEntry[]): string {
    return JSON.stringify(logs);
  }
}

class CsvFormatter implements LogFormatter {
  format(logs: LogEntry[]): string {
    return logs.map((l) => `${l.timestamp},${l.level},${l.message}`).join("\n");
  }
}

class XmlFormatter implements LogFormatter {
  format(logs: LogEntry[]): string {
    return `<logs>${logs.map((l) => `<log>${l.message}</log>`).join("")}</logs>`;
  }
}

// Factory: picks the formatter for a format string.
class FormatterFactory {
  private readonly formatters = new Map<string, LogFormatter>([
    ["json", new JsonFormatter()],
    ["csv", new CsvFormatter()],
    ["xml", new XmlFormatter()],
  ]);

  register(name: string, formatter: LogFormatter): void {
    this.formatters.set(name, formatter);
  }

  create(name: string): LogFormatter {
    const formatter = this.formatters.get(name);
    if (!formatter) {
      throw new Error("Unknown format");
    }
    return formatter;
  }
}

// No if/else or switch on the format, and no database knowledge.
class LogExporter {
  constructor(
    private readonly repository: LogRepository,
    private readonly formatters: FormatterFactory
  ) {}

  async exportLogs(format: string): Promise<string> {
    const logs = await this.repository.findAll();
    return this.formatters.create(format).format(logs);
  }
}

// Demo
async function main() {
  const repository = new InMemoryLogRepository([
    { timestamp: "2026-03-02T09:00:00Z", level: "info", message: "Server started" },
    { timestamp: "2026-03-02T09:05:12Z", level: "warn", message: "Slow response" },
    { timestamp: "2026-03-02T09:07:40Z", level: "error", message: "Database timeout" },
  ]);

  const factory = new FormatterFactory();
  const exporter = new LogExporter(repository, factory);

  for (const format of ["json", "csv", "xml"]) {
    console.log(`--- ${format} ---`);
    console.log(await exporter.exportLogs(format));
  }

  // Adding a fourth format: LogExporter stays untouched.
  factory.register("yaml", {
    format: (logs) =>
      logs
        .map((l) => `- timestamp: ${l.timestamp}\n  level: ${l.level}\n  message: ${l.message}`)
        .join("\n"),
  });
  console.log("--- yaml ---");
  console.log(await exporter.exportLogs("yaml"));
}

main();