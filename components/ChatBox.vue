<script setup lang="ts">
import {useAlertsStore} from '~/stores/AlertsStore'

import { nanoid } from "nanoid";
import { Message, User } from "~~/types";
const props = withDefaults(
  defineProps<{
    messages: Message[];
    users: User[];
    me: User;
    usersTyping?: User[];
  }>(),
  {
    usersTyping: () => [],
  }
);

const emit = defineEmits<{
  (e: "newMessage", payload: Message): void;
}>();
const alerts = useAlertsStore();

const open = ref(false);

function getUser(id: string) {
  return props.users.find((user) => user.id === id);
}

// focus input whenever chatbox is opened
const input = ref();
watch(open, () => {
  if (!open.value) {
    return alerts.success('The was chat closed successfully');
  };
  nextTick(() => {
    (input.value as HTMLInputElement).focus();
  });
});

// keep messages anchored to bottom
const messageBox = ref();
watch(
  () => props.messages,
  () => {
    nextTick(
      () => (messageBox.value.scrollTop = messageBox.value.scrollHeight)
    );
  },
  { deep: true }
);
const sendMsg =  (userId: string) => {
  
  if(input.value.value === '') return alerts.error('Please enter a message')
  emit('newMessage', {
              id: nanoid(),
              userId,
              createdAt: new Date(),
              text: (input.value as HTMLInputElement).value,
              type: 'text'
            })
  input.value.value = ''
}
</script>
<template>
  <div class="fixed bottom-[10px] right-[10px]">
    <button v-show="!open" @click="open = true" class="bg-blue-500 p-3 rounded">
      <IconChat class="h-8 w-8 text-white" />
    </button>
    <div
      v-if="open"
      class="box bg-gray-300 dark:bg-gray-800 rounded min-w-[350px] w-full overflow-hidden"
    >
      <!-- Header -->
      <header
        class="dark:bg-gray-900 bg-gray-200 px-4 flex justify-between items-center"
      >
        <span class="flex-1 text-center">Comentarios</span>
        <button class="p-4 pr-0" @click="open = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </header>
      <!-- Messages -->
      <div class="messages p-4 overflow-y-scroll max-h-[80vh]" ref="messageBox">
        <ChatBubble
          v-for="message in messages"
          :key="message.id"
          :message="message"
          :user="getUser(message.userId)"
          :my-message="message.userId === me.id"
        />

        <ChatBubble v-for="user in usersTyping" :key="user.id" :user="user">
          <AppLoading />
        </ChatBubble>
      </div>
      <!-- Footer -->
      <footer class="p-2">
        <div class="flex items-center">
        <input
          ref="input"
          class="input w-full px-2 block"
          type="text"
          placeholder="Type your message"
          @keypress.enter="sendMsg(me.id)"
        />
        <svg @click="sendMsg(me.id)" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-500 m-2" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m22 2l-7 20l-4-9l-9-4Zm0 0L11 13"/></svg>
        </div>
        <div class="h-6 py-1 px-2 text-sm italic">
          <span v-if="usersTyping.length">
            {{ usersTyping.map((user) => user.name).join(" and ") }}
            {{ usersTyping.length === 1 ? "is" : "are" }} typing
          </span>
        </div>
      </footer>
    </div>
  </div>
</template>
