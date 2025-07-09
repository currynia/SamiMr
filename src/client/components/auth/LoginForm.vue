<script setup lang="ts">
import { Form, type FormSubmitEvent } from "@primevue/forms";
import { ref } from "vue";
import Message from "primevue/message";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import Checkbox from "primevue/checkbox";
import ToolBar from "../ToolBar.vue";
import { postJsonFetch } from "@/util";
import { Session } from "@/session";
import router from "@/router";
import type { UserDto } from "@dto/userDto";

const checked1 = ref(true);
const isSubmitting = ref(false);
const isLoginSuccessful = ref(true);
async function onFormSubmit(e: FormSubmitEvent<Record<string, unknown>>) {
  if (e.valid) {
    const username: string = e.states.username.value;
    const password: string = e.states.password.value;
    isSubmitting.value = true;
    const res = await postJsonFetch("/api/auth/login", { username, password });
    if (res.status == 200) {
      isLoginSuccessful.value = true;
      const payload: UserDto = await res.json();
      Session.getSessionInstance().user.value = payload;

      Session.getSessionInstance().isAuthenticated.value = true;
      router.push("/");
    } else if (res.status == 401) {
      isLoginSuccessful.value = false;
    }
    isSubmitting.value = false;
  }
}

const resolver = ref(
  zodResolver(
    z.object({
      username: z.string().min(1, { message: "Username is required." }),
      password: z.string().min(1, { message: "Password is required" }),
    })
  )
);
</script>

<template>
  <div class="mt-10">
    <div
      class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-xl mx-auto flex flex-col gap-8"
    >
      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-col items-center gap-2 w-full">
          <div
            class="text-surface-900 dark:text-surface-0 text-2xl font-semibold leading-tight text-center w-full"
          >
            Welcome Back
          </div>
          <div class="text-center w-full">
            <span class="text-surface-700 dark:text-surface-200 leading-normal"
              >Don't have an account?</span
            >
            <a
              href="#"
              @click="$router.push('/auth/register')"
              class="text-primary font-medium ml-1 cursor-pointer hover:text-primary-emphasis"
              >Create today!</a
            >
          </div>
        </div>
      </div>
      <Form :resolver="resolver" @submit="onFormSubmit">
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
              class="w-full px-3 py-2 shadow-sm rounded-lg"
            />
          </div>
          <div class="flex flex-col gap-2 w-full">
            <label
              for="password"
              class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
              >Password</label
            >
            <InputText
              name="password"
              type="password"
              placeholder="Password"
              class="w-full px-3 py-2 shadow-sm rounded-lg"
            />
          </div>
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-0"
          >
            <div class="flex items-center gap-2">
              <input v-model="checked1" type="checkbox" id="rememberme1" />

              <label for="rememberme1" class="text-surface-900 dark:text-surface-0 leading-normal"
                >Remember me</label
              >
            </div>
            <a class="text-primary font-medium cursor-pointer hover:text-primary-emphasis"
              >Forgot your password?</a
            >
          </div>
        </div>
        <Button
          :loading="isSubmitting"
          label="Sign In"
          class="w-full py-2 rounded-lg flex gap-2 mt-7"
          type="submit"
          :pt="{
            label: {
              class: 'ml-auto mr-auto',
            },
          }"
        >
        </Button>
        <Message v-if="!isLoginSuccessful" severity="error" size="small" variant="simple">
          Username or password is incorrect.
        </Message>
      </Form>
    </div>
  </div>
</template>
