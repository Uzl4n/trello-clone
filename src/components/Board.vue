<script setup>
import { ref, reactive, onMounted } from 'vue'
import List from './List.vue'

// Usando reactive para garantir a reatividade do board
const board = reactive([])  // Agora é um objeto reativo

// Carregar os dados do localStorage ao montar o componente
onMounted(() => {
  const saved = localStorage.getItem('trello-clone')
  if (saved) {
    // Usamos o JSON.parse diretamente para manter a estrutura dos dados
    Object.assign(board, JSON.parse(saved))  // Atualizando a reatividade
  }
})

// Função para salvar o board no localStorage
function saveBoard() {
  localStorage.setItem('trello-clone', JSON.stringify(board)) // Salva diretamente no localStorage
}

// Função para adicionar uma nova lista
function addList() {
  const newList = {
    title: 'Nova Lista',
    cards: []
  }
  board.push(newList)  // Adiciona uma nova lista de forma reativa
  saveBoard() // Salva no localStorage
}

// Função para deletar uma lista
function deleteList(listIndex) {
  board.splice(listIndex, 1) // Remove a lista de forma reativa
  saveBoard() // Salva no localStorage
}
</script>

<template>
  <div class="d-flex flex-wrap gap-3 p-3 container mt-5">
    <List
      v-for="(list, index) in board"
      :key="index"
      :list="list"
      :listIndex="index"
      @update="saveBoard"
      @delete-list="deleteList"
    />
    <button class="btn btn-primary" @click="addList">Nova Lista</button>
  </div>
</template>
