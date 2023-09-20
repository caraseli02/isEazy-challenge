<script setup lang="ts">
// @ts-expect-error I couldn't find any types for vue 3 markdownit
import Markdown from "vue3-markdown-it";
import type { Message, User } from "@/types";
defineProps<{
  message?: Message;
  user?: User;
  myMessage?: boolean;
}>();
</script>
<template>
  <div v-if="message?.type === 'text'"
    class="chat my-4"
    :class="{
      'chat-end': myMessage,
      'chat-start': !myMessage,
    }"
  >
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="user?.avatar" />
      </div>
    </div>
    <div class="chat-header mb-2">
      {{ user?.name }}
      <time v-if="message" class="text-xs opacity-50">{{
        useTimeAgo(message?.createdAt).value
      }}</time>
    </div>
    <div
      class="chat-bubble py-0 prose prose-sm bg-white dark:bg-gray-900 max-w-max w-full"
      :class="{
        'dark:bg-gray-700 bg-gray-600 dark:text-inherit text-white': myMessage,
      }"
    >
      <slot>
        <Markdown :source="message?.text" class="w-full" />
      </slot>
    </div>
    <!-- <div class="chat-footer opacity-50">Delivered</div> -->
  </div>
  <div v-if="message?.type === 'file'" class="px-3 border-y-2 py-3 border-slate-900 flex items-center justify-between">
    <ul>
      <li class="uppercase font-bold">Versión {{ message.info?.version }}</li>
      <li class="text-blue-500 py-2 font-semibold">
        <a href="/pruba.pdf" target="_blank" download="pruba.pdf">
         {{ message.info?.name }}.pdf
        </a>
      </li>
      <li class="text-xs">
        Documento / PDF ({{ message.info?.size }} MB)
        <time v-if="message" class="text-xs opacity-50 ml-4">{{
        useTimeAgo(message?.createdAt).value
      }}</time>
      </li>
    </ul>
    <a href="/pruba.pdf" target="_blank" download="pruba.pdf">
      <svg class="text-blue-500 w-12 h-12 mr-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.086 12.531a.75.75 0 0 0-1.055-.117L12.75 13.44V10a.75.75 0 1 0-1.5 0v3.44l-1.282-1.026a.75.75 0 0 0-.937 1.172l2.498 1.998a.747.747 0 0 0 .946-.003l2.494-1.995a.75.75 0 0 0 .117-1.055Z"/><path fill="currentColor" fill-rule="evenodd" d="M8.46 7.284a5.296 5.296 0 0 1 9.734 2.543a4.386 4.386 0 1 1 .17 8.77H7A5.75 5.75 0 1 1 8.46 7.284Zm4.45-.922a3.796 3.796 0 0 0-3.422 2.15a.75.75 0 0 1-.947.372A4.25 4.25 0 1 0 7 17.096h11.362a2.887 2.887 0 1 0-.747-5.675a.75.75 0 0 1-.938-.812a3.795 3.795 0 0 0-3.769-4.247Z" clip-rule="evenodd"/></svg>
    </a>
  </div>
</template>
<style scoped>
:deep(code) {
  background: none;
  @apply overflow-x-auto w-full;
}
:deep(pre) {
  @apply dark:bg-[rgba(0,0,0,.3)] overflow-x-auto w-full;
}
</style>
