import { Controller, Get } from '@nestjs/common';
import { graphql } from 'graphql';

@Controller('/page')
export class PageController {

  @Get("/page1")
  getPage1(): Object {
    return {"test": "page1"};
  }
}