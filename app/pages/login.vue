<template>
  <UCard v-if="!success">
    <template #header>
      Sign-in to Finance Tracker
    </template>
    <template #default>
    <form>
      <UFormField label="Email" name="email" class="mb-4" :required="true"
        help="You will receive an email with the confirmation link">
        <UInput type="email" placeholder="Email" required class="w-full"/>
      </UFormField>

      <UButton type="submit" variant="solid" color="neutral" @click="success = true">Sign-in</UButton>
    </form>
    </template>
  </UCard>
  <UCard v-else>
    <template #header>
      Email has been sent
    </template>
    <template #default>
    <div class="text-center">
      <p class="mb-4">We have sent an email to <strong>valododa@email.com</strong> with a link to sign-in.</p>
      <p>
        <strong>Important:</strong> The link will expire in 5 minutes.
      </p>
    </div>
    </template>
  </UCard>
</template>

<script setup>
const success = ref(false)
</script>