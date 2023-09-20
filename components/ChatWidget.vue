<script setup lang="ts">
import { nanoid } from "nanoid";
import { Message, User } from "~~/types";

const me = ref<User>({
  id: "user",
  avatar: "https://picsum.photos/id/237/200/300",
  name: "You",
});
const bot = ref<User>({
  id: "assistant",
  avatar: "https://picsum.photos/id/64/200/300",
  name: "Botman",
});

const users = computed(() => [me.value, bot.value]);

const messages = ref<Message[]>([
  {
    info: {
      version: '1',
      size: '3.8',
      name: 'Archivo a subir 1',
    },
    id: nanoid(),
    userId: "user",
    createdAt: new Date(new Date().getTime() - 5 * 60000),
    type: "file",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi, explicabo?",
    id: nanoid(),
    userId: "user",
    createdAt: new Date(new Date().getTime() - 5 * 60000),
    type: "text",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi, explicabo?",
    id: nanoid(),
    userId: "assistant",
    createdAt: new Date(new Date().getTime() - 4 * 60000),
    type: "text",

  },
  {
    info: {
      version: '2',
      size: '2.8',
      name: 'Archivo a subir 2',
    },
    id: nanoid(),
    userId: "user",
    createdAt: new Date(new Date().getTime() - 5 * 60000),
    type: "file",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi, explicabo?",
    id: nanoid(),
    userId: "user",
    createdAt: new Date(new Date().getTime() - 2 * 60000),
    type: "text",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi, explicabo?",
    id: nanoid(),
    userId: "assistant",
    createdAt: new Date(),
    type: "text",
  },
]);

const usersTyping = ref<User[]>([]);

// send messages to Chat API here
// and in the empty function below

async function handleNewMessage(message: Message) {
  messages.value.push(message);
  usersTyping.value.push(bot.value);
  setTimeout(() => {
    usersTyping.value = [];
    messages.value.push({
      id: nanoid(),
      createdAt: new Date(),
      text: "Placeholder response until we implement the bot",
      userId: "assistant",
      type: "text",
    });
  }, 3000);
}
</script>
<template>
  <ChatBox
    :me="me"
    :users="users"
    :messages="messages"
    @new-message="handleNewMessage"
    :usersTyping="usersTyping"
  />
</template>
