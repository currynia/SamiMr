<script setup lang="ts">
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms';
import { ref } from 'vue';
import Message from 'primevue/message';
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

const initialValues = ref({
    username: '',
    password:'',
    confirmPassword:''
});

function onFormSubmit(e: FormSubmitEvent<Record<string,never>>): undefined {
  if (e.valid) {
    const username = e.states.username.value;
    const password = e.states.password.value;
    fetch('/api/auth/register', {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({username:username, password:password})})
  }
    console.log(e)
}

const resolver = ref(zodResolver(
    z.object({
        username: z.string().min(1, { message: 'Username is required.' }),
        password: z.string().min(6, {message: "Password is too short"}),
        confirmPassword:z.string()
    }).refine((data) => data.password === data.confirmPassword, {
      message:"Passwords do not match",
      path:["confirmPassword"]
    })
));
</script>

<template>

   <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="register-form">
    <div class="register-input">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error.message }}</Message>
        <InputText name="password" type="text" placeholder="Password" fluid />
         <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error.message }}</Message>
        <InputText name="confirmPassword" type="text" placeholder="Confirm password" fluid />
        <Message v-if="$form.confirmPassword?.invalid" severity="error" size="small" variant="simple">{{ $form.confirmPassword.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>

</template>

<style scoped>
.register-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
