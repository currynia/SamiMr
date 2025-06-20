<script setup lang="ts">
import { Form, type FormSubmitEvent } from "@primevue/forms";
import { ref } from "vue";
import Message from "primevue/message";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { onBeforeRouteLeave } from "vue-router";

const formSubmitError = ref<{ isRegisterSuccessful: boolean; msg?: string }>({
  isRegisterSuccessful: false,
});
const initialValues = ref({
  username: "",
  password: "",
  confirmPassword: "",
});
const isSubmitting = ref(false);

async function onFormSubmit(e: FormSubmitEvent<Record<string, unknown>>): Promise<void> {
  if (e.valid) {
    const username = e.states.username.value;
    const password = e.states.password.value;
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });
    console.log(res.status);
    if (res.status == 409) {
      formSubmitError.value = { isRegisterSuccessful: false, msg: "Username already in use" };
    } else if (res.status == 500) {
      formSubmitError.value = { isRegisterSuccessful: false, msg: "Internal server error occured" };
    } else if (res.status == 200) {
      formSubmitError.value = { isRegisterSuccessful: true };
    } else {
      formSubmitError.value = { isRegisterSuccessful: false, msg: "Unknown error occured" };
    }
  }
}

const resolver = ref(
  zodResolver(
    z
      .object({
        username: z.string().min(1, { message: "Username is required." }),
        password: z.string().min(6, { message: "Password is too short" }),
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      })
  )
);

onBeforeRouteLeave((to, from, next) => {
  formSubmitError.value = { isRegisterSuccessful: false };
  next();
});
</script>

<template>
  <div v-if="formSubmitError.isRegisterSuccessful">
    <div class="flex flex-col items-center gap-2 w-full mt-10">
      <div
        class="text-surface-900 dark:text-surface-0 text-2xl font-semibold leading-tight text-center w-full"
      >
        Registration successful!
      </div>
      <div class="text-center w-full">
        <span class="text-surface-700 dark:text-surface-200 leading-normal"
          >Click
          <a
            @click="$router.push('/auth/login')"
            class="text-primary font-medium cursor-pointer hover:text-primary-emphasis"
            >here</a
          >
          to sign in!</span
        >
      </div>
    </div>
  </div>

  <div v-if="!formSubmitError.isRegisterSuccessful" class="mt-10">
    <div
      class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-xl mx-auto flex flex-col gap-8"
    >
      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-2 w-full">
          <div
            class="text-surface-900 dark:text-surface-0 text-2xl font-semibold leading-tight text-center w-full"
          >
            Start your journey with SamiMr today...
          </div>
          <div class="text-center w-full">
            <span class="text-surface-700 dark:text-surface-200 leading-normal"
              >Already have an account?</span
            >
            <a
              @click="$router.push('/auth/login')"
              class="text-primary font-medium ml-1 cursor-pointer hover:text-primary-emphasis"
              >Sign in!</a
            >
          </div>
        </div>
      </div>
      <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="register-form">
        <div class="flex flex-col gap-6 w-full">
          <div class="flex flex-col gap-2 w-full">
            <label
              for="username"
              class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
              >Username</label
            >
            <InputText
              name="username"
              type="text"
              placeholder="Username"
              fluid
              class="w-full px-3 py-2 shadow-sm rounded-lg"
            />
            <Message
              v-if="$form.username?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.username.error.message }}</Message
            >
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label
              for="password"
              class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
              >Password</label
            >
            <InputText
              name="password"
              type="text"
              placeholder="Password"
              fluid
              class="w-full px-3 py-2 shadow-sm rounded-lg"
            />
            <Message
              v-if="$form.password?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.password.error.message }}</Message
            >
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label
              for="confirmPassword"
              class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
              >Confirm password</label
            >
            <InputText
              name="confirmPassword"
              type="text"
              placeholder="Confirm password"
              fluid
              class="w-full px-3 py-2 shadow-sm rounded-lg"
            />
            <Message
              v-if="$form.confirmPassword?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.confirmPassword.error?.message }}</Message
            >
          </div>
        </div>

        <Button
          class="w-full py-2 rounded-lg flex gap-2 mt-7"
          type="submit"
          label="Register"
          :loading="isSubmitting"
          :pt="{
            label: {
              class: 'ml-auto mr-auto',
            },
          }"
        />
        <Message
          v-if="!formSubmitError.isRegisterSuccessful"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ formSubmitError.msg }}
        </Message>
      </Form>
    </div>
  </div>
</template>
