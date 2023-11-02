describe('Segundo teste end-to-end', () => {
    it('Cadastra uma resposta e verifica se ela é listada', () => {
      cy.visit('localhost:3000');

      cy.get('#btn-resposta').click();
      cy.get('#textarea-resposta').type('10');
      cy.get('#btn-salvar-resposta').click();
      cy.get('#tabela-respostas').contains('10');

    });
  });