<template>
  <header class="flex justify-between items-center mt-10">
    <NuxtLink to="/" class="text-xl font-bold">
      Finance Tracker
    </NuxtLink>
    <div>
      <UDropdownMenu :items="items" :content="{align: 'end', side: 'bottom'}" :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-64' }" v-if="user">
        <UAvatar :src="url" alt="Avatar" />
      <template #account="{ item }">
          <div class="text-left">
            <p>
              Signed in as
            </p>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
          </div>
        </template>
      </UDropdownMenu> 
    </div>
  </header>
</template>
<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { url } = useAvatarUrl()
const items = [
  [{
    label: user.value?.email,
    slot: 'account',
    disabled: true
  }], [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    onSelect(){navigateTo('/settings/profile')}
  }, {
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    async onSelect(){
      await supabase.auth.signOut()
      return navigateTo('/login')
    }
  }]
]

</script>