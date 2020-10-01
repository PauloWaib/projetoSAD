import {Jogador} from '../../jogadores/interfaces/jogador.interface';

export class CriarCategoriaDto{

    readonly categoria: string;
    readonly descricao: string;
    readonly jogadores: Array<Jogador>;

}