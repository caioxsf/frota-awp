document.addEventListener('DOMContentLoaded', () => {
    const picker1 = new Pikaday({
      field: document.getElementById('primeiraData'),
      format: 'DD/MM/YYYY', 
      i18n: {
        previousMonth: 'Mês Anterior',
        nextMonth: 'Próximo Mês',
        months: [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ],
        weekdays: [
          'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
          'Quinta-feira', 'Sexta-feira', 'Sábado'
        ],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
      },
      onSelect: function(date) {
        
        const formattedDate = date.toLocaleDateString('pt-BR');
        document.getElementById('primeiraData').value = formattedDate;
      }
    });

    const picker2 = new Pikaday({
        field: document.getElementById('segundaData'),
        format: 'DD/MM/YYYY', 
        i18n: {
          previousMonth: 'Mês Anterior',
          nextMonth: 'Próximo Mês',
          months: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
          ],
          weekdays: [
            'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
            'Quinta-feira', 'Sexta-feira', 'Sábado'
          ],
          weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
        },
        onSelect: function(date) {
          
          const formattedDate = date.toLocaleDateString('pt-BR');
          document.getElementById('segundaData').value = formattedDate;
        }
      });
  });