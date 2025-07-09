import { ref } from "vue";

export const darkModeIcon = ref("pi pi-moon");

export const postJsonFetch = (path: string, data: object) => {
  const body = JSON.stringify(data);
  return fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body });
};

export function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  if (darkModeIcon.value === "pi pi-moon") {
    darkModeIcon.value = "pi pi-sun";
  } else if (darkModeIcon.value === "pi pi-sun") {
    darkModeIcon.value = "pi pi-moon";
  }
}
