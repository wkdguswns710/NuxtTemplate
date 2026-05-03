<script setup lang="ts">
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // 코드블럭 테마

const props = defineProps<{
  rawMarkdown: string;
}>();

// ✅ 타입 추론을 위해 Renderer 클래스를 사용
const renderer = new marked.Renderer();
renderer.code = ({ text, lang }) => {
  const validLang = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language: validLang }).value;
  return `<pre><code class="hljs ${validLang}">${highlighted}</code></pre>`;
};
// 옵션 적용 시 Renderer 사용
const compiledMarkdown = computed(() =>
  marked.parse(props.rawMarkdown, {
    renderer
  })
);
</script>

<template>
  <div>
    <div v-html="compiledMarkdown" class="markdown-content" />
  </div>
</template>

<style lang="scss" scope>
.markdown-content {
  padding: 8px;
  background-color: #eeeeee;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    border-bottom: 1px solid #cacaca;
    margin-bottom: 10px;
  }
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 20px;
  }

  pre {
    background-color: #f6f8fa;
  }
}
</style>
