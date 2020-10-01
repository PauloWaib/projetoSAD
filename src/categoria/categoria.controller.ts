import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto'
import { CategoriaService } from './categoria.service'
import { Categoria } from './interfaces/categoria.interface'


@Controller('api/v1/categoria')
export class CategoriaController {

    constructor(private readonly categoriaService: CategoriaService) {}

    @Post()
    async criarAtualizarCategoria(
        @Body() criaCategoriaDto: CriarCategoriaDto) {
        await this.categoriaService.criarAtualizarCategoria(criaCategoriaDto)
    }

    @Get() //localhost:3000/api/v1/categoria?id=42@2.com
    async consultarCategoria(   
        @Query('_id') _id: uuid): Promise<Categoria[] | Categoria> {
            if (_id) {
                return await this.categoriaService.consultarCategoriaPeloID(_id);
            } else {
                return await this.categoriaService.consultarTodosCategoria();
            }
        
    }
    /*
    @Delete()
    async deletarCategoria(
        @Query('_id') _id: uuid): Promise<void> {
            await this.categoriaService.deletarCategoria(_id)
        }
    */
}

