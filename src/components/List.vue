<script setup>
import { ref } from 'vue'

const props = defineProps({
  list: Object,
  listIndex: Number
})

const emit = defineEmits()

const newCard = ref("")

// Função para adicionar um card
function addCard() {
  if (newCard.value.trim()) {
    const card = {
      id: Date.now(), // ID único
      title: newCard.value,
      description: ""
    }
    props.list.cards.push(card) // Adiciona o card à lista
    newCard.value = "" // Limpa o campo de input
    emitUpdate() // Emite a atualização para o Board
  }
}

// Função para deletar a lista
function deleteList() {
  const confirmDelete = window.confirm("Você tem certeza que deseja excluir esta lista?")
  if (confirmDelete) {
    emit('delete-list', props.listIndex)
  }
}

// Função para emitir a atualização para o Board
function emitUpdate() {
  emit('update') // Emite o evento de atualização
}
</script>

<template>
  <div class="card" style="width: 250px;">
    <div class="card-header d-flex justify-content-between">
      <input v-model="props.list.title" class="form-control form-control-sm" />
      <button class="btn-close btn-sm" @click="deleteList"></button> <!-- Excluir lista -->
    </div>
    <draggable v-model="props.list.cards" group="cards" @end="emitUpdate">
      <transition-group name="list" tag="div" class="card-body">
        <Card v-for="(card, index) in props.list.cards" :key="index" :card="card" />
      </transition-group>
    </draggable>
    <div class="p-2">
      <input v-model="newCard" class="form-control form-control-sm mb-2" placeholder="Nova tarefa" />
      <button class="btn btn-success btn-sm w-100" @click="addCard">Adicionar</button> <!-- Adicionar card -->
    </div>
  </div>
</template>
