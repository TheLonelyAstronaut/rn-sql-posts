import { useContainerInstance } from "../di";
import { AnalyticsService } from "./analytics-service";

export const useAnalytics = () => useContainerInstance(AnalyticsService);
