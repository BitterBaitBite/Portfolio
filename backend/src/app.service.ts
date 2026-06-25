import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getWelcomeMessage() {
    return {
      message:
        "Portfolio backend is running. Continue building modules under /src.",
    };
  }
}
