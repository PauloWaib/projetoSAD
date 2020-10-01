import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//Usaremos a service para fazer a persistência
@Injectable()
export class CategoriaService {
  constructor(
    @InjectModel('Categoria')
    private readonly categoriaModel: Model<Categoria>,
  ) {}

  private readonly logger = new Logger(CategoriaService.name);

  async criarAtualizarCategoria(criaCategoriaDto: CriarCategoriaDto): Promise<void> {
    const { categoria } = criaCategoriaDto;

    const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

    if (categoriaEncontrada) {
      await this.atualizar(criaCategoriaDto);
    } else {
      await this.criar(criaCategoriaDto);
    }
  }

  async consultarTodasCategoria(): Promise<Categoria[]> {
    return await this.categoriaModel.find().exec();
  }

  async consultarCategoriaPeloID(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
    if (!categoriaEncontrada) {
      throw new NotFoundException(`Item com categoria ${categoria} não encontrado`);
    }
    return categoriaEncontrada;
  }


  async deletarCategoria(categoria): Promise<any> {
    return await this.categoriaModel.remove({ categoria }).exec();
  }

  private async criar(criaCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    const categoriaCriada = new this.categoriaModel(criaCategoriaDto);
    return await categoriaCriada.save();
  }

  private async atualizar(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    return await this.categoriaModel
      .findOneAndUpdate(
        { categoria: criarCategoriaDto.categoria },
        { $set: criarCategoriaDto },
      ).exec();
  }
}
