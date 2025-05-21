<script setup lang="ts">
import { Form, type FormResolverOptions, type FormSubmitEvent } from '@primevue/forms';
import { ref } from 'vue';
import Message from 'primevue/message';
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
const visible = ref(false);

const text = ref("");

const initialValues = ref()


function resolver(e: FormResolverOptions): Record<string, any> | Promise<Record<string, any>> | undefined {
    throw new Error('Function not implemented.');
}

function onFormSubmit(e: FormSubmitEvent<Record<string,any>>): undefined {
    throw new Error('Function not implemented.');
}
</script>

<template>

   <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>

</template>
