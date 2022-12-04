import { Controller, Get, Post, Req, Redirect, Query, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interface/cat.interface';
import { CatsService } from './cats.service';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post()
    create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto)
    }

    @Get('ab*cd')
    testWildCards() {
        return 'This route uses a wildcard' 
    }

    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        return { url: `https://docs.nestjs.com/v${version}/` };
    }

    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} cat`;
    }

    // @Get()
    // async findAll(@Req() request: Request): Promise<Cat[]>  {
    //     return this.catsService.findAll()
    // }

    @Get()
    async findAll() {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
}