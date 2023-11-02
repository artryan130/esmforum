const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
  const pergunta = modelo.get_pergunta(perguntas[0].id_pergunta);
  expect(pergunta.texto).toBe('1 + 1 = ?');
});

test('Testando cadastro de quatro respostas', () => {
  modelo.cadastrar_resposta(0, '2');
  modelo.cadastrar_resposta(1, '4');
  modelo.cadastrar_resposta(1, '5');
  modelo.cadastrar_resposta(2, '6');
  const num_respostaId0 = modelo.get_num_respostas(0); 
  expect(num_respostaId0).toBe(1);
  const num_respostaId1 = modelo.get_num_respostas(1); 
  expect(num_respostaId1).toBe(2);
  const respostaId0 = modelo.get_respostas(0);
  expect(respostaId0[0].texto).toBe('2');
  const respostaId1 = modelo.get_respostas(1);
  expect(respostaId1[0].texto).toBe('4');
  expect(respostaId1[1].texto).toBe('5');
  expect(respostaId1[0].id_pergunta).toBe(respostaId1[1].id_pergunta);
  expect(respostaId1[0].id_resposta).toBe(respostaId1[1].id_resposta-1);
});