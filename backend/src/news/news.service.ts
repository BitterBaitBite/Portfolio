import { Injectable } from "@nestjs/common";
import { extract } from "@extractus/feed-extractor";

@Injectable()
export class NewsService {
  async getBleepingComputerRss() {
    return await extract("https://www.bleepingcomputer.com/feed/", {
      normalization: true,
      getExtraEntryFields: (feedEntry) => ({
        author: feedEntry.author,
        thumbnail: feedEntry.thumbnail,
        "dc:creator": feedEntry["dc:creator"],
        content: feedEntry.content,
      }),
    });
  }
}
