import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";
import { NewsService } from "./news.service";

@Controller("news")
@UseInterceptors(CacheInterceptor)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get("bleeping-computer")
  @CacheTTL(86400 * 1000) // Cache for 24 hours
  async getBleepingNews() {
    return this.newsService.getBleepingComputerRss();
  }
}
