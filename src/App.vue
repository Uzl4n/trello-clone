<script setup>
import { ref, onMounted } from 'vue'
import Board from './components/Board.vue'

// Estado para armazenar as listas e cards
const board = ref([])

// Carregar os dados do localStorage ao montar o componente
onMounted(() => {
  const saved = localStorage.getItem('trello-clone')
  if (saved) {
    board.value = JSON.parse(saved)
  }
})

// Função para editar o título de um card
function editCard(listIndex, cardIndex, newTitle) {
  board.value[listIndex].cards[cardIndex].title = newTitle
  saveBoard() // Salva no localStorage
}

// Função para excluir um card
function deleteCard(listIndex, cardIndex) {
  board.value[listIndex].cards.splice(cardIndex, 1) // Remove o card da lista
  saveBoard() // Salva no localStorage
}

// Função para salvar no localStorage e forçar a atualização do Vue
function saveBoard() {
  localStorage.setItem('trello-clone', JSON.stringify(board.value))
  // Disparar uma atualização para o Vue
  // Isso força o Vue a reagir quando o localStorage é alterado
  board.value = [...board.value]  // Criando uma nova referência para forçar a reatividade
}
</script>

<template>
  <div>
    <nav class="navbar navbar-dark bg-primary px-3">
      <span class="navbar-brand mb-0 h1">📝 Trello Clone</span>
    </nav>

    <div class="container mt-5">
      <h1 class="mb-4 text-center">Visualização de Tarefas</h1>
      
      <!-- Exibe as listas e seus cards -->
      <div class="row">
        <div v-for="(list, listIndex) in board" :key="listIndex" class="col-md-4 mb-4">
          <!-- Card para cada lista -->
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h5>{{ list.title }}</h5>
            </div>
            
            <div class="card-body">
              <!-- Cards dentro de cada lista -->
              <ul class="list-group">
                <li v-for="(card, cardIndex) in list.cards" :key="card.id" class="list-group-item">
                  <!-- Título do card -->
                  <input
                    v-model="card.title"
                    @blur="editCard(listIndex, cardIndex, card.title)"
                    class="form-control mb-2"
                    placeholder="Título do Card"
                  />
                  <!-- Descrição do card -->
                  <p>{{ card.description }}</p>
                  <!-- Botão de excluir card -->
                  <button
                    class="btn btn-danger btn-sm w-100"
                    @click="deleteCard(listIndex, cardIndex)"
                  >
                    Excluir
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Board @update-board="saveBoard" />
  </div>
</template>

