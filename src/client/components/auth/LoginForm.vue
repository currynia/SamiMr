<script setup lang="ts">
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms';
import { ref } from 'vue';
import Message from 'primevue/message';
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
const visible = ref(false);

const text = ref("");

const initialValues = ref()

function onFormSubmit(e: FormSubmitEvent<Record<string,any>>): undefined {
    const lol = fetch('/api/auth/login', {method:"POST"}).then(_e=>console.log("LOL"))
}

const resolver = ref(zodResolver(
    z.object({
        username: z.string().min(1, { message: 'Username is required via Zod.' })
    })
));
</script>

<template>

   <Form v-slot="$form" :initialValues :resolver="resolver" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>

</template>
