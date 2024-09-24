import { AnalyticsProvider } from "./analytics-providers/analytics-provider";

export class AnalyticsService {
  constructor(private readonly analyticsProvider: AnalyticsProvider) {}
}
