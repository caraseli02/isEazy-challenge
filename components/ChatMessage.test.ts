// ChatBubble.spec.ts
import { mount } from '@vue/test-utils';
import ChatBubble from './ChatBubble.vue';
import { useTimeAgo } from 'vueuse';
import {expect, describe, it} from 'vitest'
describe('ChatBubble.vue', () => {
  it('renders message text when message type is "text"', () => {
    const message = {
      type: 'text',
      text: 'Hello, World!',
      createdAt: '2023-09-14T12:00:00Z',
    };
    const user = {
      name: 'John Doe',
      avatar: '/path/to/avatar.jpg',
    };

    const wrapper = mount(ChatBubble, {
      props: {
        message,
        user,
        myMessage: false,
      },
    });

    expect(wrapper.text()).toContain('Hello, World!');
    expect(wrapper.text()).toContain('John Doe');
    expect(wrapper.text()).toContain('Sep 14, 2023');
  });

  it('renders file information when message type is "file"', () => {
    const message = {
      type: 'file',
      info: {
        version: '1.0',
        name: 'sample',
        size: '1.5',
      },
      createdAt: '2023-09-14T12:00:00Z',
    };

    const wrapper = mount(ChatBubble, {
      props: {
        message,
      },
    });

    expect(wrapper.text()).toContain('Versión 1.0');
    expect(wrapper.text()).toContain('sample.pdf');
    expect(wrapper.text()).toContain('1.5 MB');
    expect(wrapper.text()).toContain('Sep 14, 2023');
  });
});
