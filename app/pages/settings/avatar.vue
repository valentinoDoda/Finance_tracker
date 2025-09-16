<template>
  <div>
    <div class="mb-4">
      <UFormField label="Current avatar" class="w-full" help="This would be blank by default">
        <UAvatar :src="url"  size="3xl" />
      </UFormField>
    </div>

    <div class="mb-4">
      <UFormField label="New avatar" class="w-full" name="avatar"
        help="After choosing an image click Save to actually upload the new avatar">
        <UInput type="file" ref="fileInput" />
      </UFormField>
    </div>

    <UButton type="submit" color="neutral" variant="solid" label="Save" :loading="uploading" :disabled="uploading"
      @click="saveAvatar" />
  </div>
</template>

<script setup>

const supabase = useSupabaseClient()
const user = useSupabaseUser()

// We need to get the actual avatar URL
const toast = useToast()
const { url } = useAvatarUrl()
const uploading = ref(false)
const fileInput = ref() // Reference to an input with ref="fileInput" attribute

const saveAvatar = async () => {
  // 1. Get the uploaded file
  //    a) If no file uploaded, show toast error
  // 2. Generate the new filename
  const file = fileInput.value.inputRef.files[0]

  if(!file){
    toast.add({
      title: "Select a file to upload first",
      color: "error"
    })
    return 0
  }
  console.log(file)

  const fileType = file.type.split("/").pop();
  const fileName = `${Math.random()}.${fileType}`
  console.log(fileName)
  try {
    uploading.value = true
    // 1. Grab the current avatar URL
    const curAvatar = user.value.user_metadata?.avatar_url
    // 2. Upload the image to avatars bucket
    const {error} = await supabase.storage.from("avatars").upload(fileName, file);
    
    if(error) throw error
    // 3. Update the user metadata with the avatar URL
    await supabase.auth.updateUser({
      data:{
        avatar_url: fileName
      }
    })

    console.log(curAvatar)
    // 4. (OPTIONALLY) remove the old avatar file
    if(curAvatar){
      const {error} = await supabase.storage.from("avatars").remove([curAvatar])
      if(error) throw error
    }
    // 5. Reset the file input

    fileInput.value.inputRef.value = null
    toast.add({
      title: 'Avatar uploaded',
      color: 'success'
      
    })
  } catch (error) {
    toast.add({
      title: 'Error uploading avatar',
      description: error.message,
      color: "error"
    })
  } finally {
    uploading.value = false
  }
}
</script>