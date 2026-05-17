<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  privacyPolicyIntro,
  privacyPolicyLastUpdated,
  privacyPolicySections,
} from '@/config/privacyPolicyContent'
import {
  termsOfServiceIntro,
  termsOfServiceLastUpdated,
  termsOfServiceSections,
} from '@/config/termsOfServiceContent'

const route = useRoute()

const doc = computed(() => {
  if (route.name === 'privacy') {
    return {
      heading: '隐私政策',
      intro: privacyPolicyIntro,
      sections: privacyPolicySections,
      updated: privacyPolicyLastUpdated,
      otherLabel: '服务条款',
      otherTo: '/terms' as const,
    }
  }
  return {
    heading: '服务条款',
    intro: termsOfServiceIntro,
    sections: termsOfServiceSections,
    updated: termsOfServiceLastUpdated,
    otherLabel: '隐私政策',
    otherTo: '/privacy' as const,
  }
})
</script>

<template>
  <div class="page">
    <article class="article" aria-labelledby="legal-heading">
      <header class="head">
        <h1 id="legal-heading" class="title">{{ doc.heading }}</h1>
        <p class="updated">最近更新：{{ doc.updated }}</p>
      </header>

      <div class="intro">
        <p v-for="(p, i) in doc.intro" :key="i" class="intro-p">{{ p }}</p>
      </div>

      <section v-for="(sec, si) in doc.sections" :key="si" class="block">
        <h2 class="block-title">{{ sec.title }}</h2>
        <p v-for="(para, pi) in sec.paragraphs" :key="pi" class="block-p">{{ para }}</p>
      </section>

      <nav class="cross" aria-label="相关法律页面">
        <RouterLink :to="doc.otherTo">{{ doc.otherLabel }}</RouterLink>
      </nav>
    </article>
  </div>
</template>

<style scoped>
.page {
  padding: 2.25rem 1.25rem 4rem;
}

.article {
  max-width: 42rem;
  margin: 0 auto;
}

.head {
  margin-bottom: 1.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--color-border);
}

.title {
  margin: 0 0 0.5rem;
  font-size: clamp(1.5rem, 4vw, 1.85rem);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.updated {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-muted);
}

.intro {
  margin-bottom: 2rem;
}

.intro-p {
  margin: 0 0 1rem;
  font-size: 0.98rem;
  line-height: 1.75;
  color: var(--color-muted);
}

.intro-p:last-child {
  margin-bottom: 0;
}

.block {
  margin-bottom: 1.75rem;
}

.block-title {
  margin: 0 0 0.65rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: 0.01em;
}

.block-p {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--color-muted);
}

.block-p:last-child {
  margin-bottom: 0;
}

.cross {
  margin-top: 2.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.95rem;
}
</style>
